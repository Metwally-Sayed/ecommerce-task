"use client";

import { useParams } from "next/navigation";
import { Fragment, useEffect, useState, useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getProductById, addProductToCart } from "@/lib/apis";

import { ICartObject, IComment } from "@/lib/types";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import CommentCard from "@/components/ui/comment-card";
import { SkeletonComments } from "@/components/ui/custom-skeleton";
import StarRating from "@/components/ui/StarRating";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/counter";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

import { AiOutlineLoading } from "react-icons/ai";
import { ShoppingCart } from "lucide-react";
import { CartContext } from "@/store/cartContext";

const faqs = [
  {
    question: "1. What payment methods do you accept?",
    answer:
      "We accept a variety of payment methods, including credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay.",
  },
  {
    question: "2. How can I track my order?",
    answer:
      "Once your order is shipped, you will receive a confirmation email with a tracking number. You can use this number to track your order on our website.",
  },
  {
    question: "3. Do you ship internationally?",
    answer:
      "Yes, we ship to many countries worldwide. Shipping fees and delivery times vary based on the destination.",
  },
];

//getProductById
const ProductPage = (): JSX.Element => {
  const { productid } = useParams<{ productid: string }>();
  const { addToCartStore, cart } = useContext(CartContext);
  const queryClient = useQueryClient();
  const [quantity, setQuantity] = useState(1);
  const [productToCart, setProductToCart] = useState<ICartObject>(
    {} as ICartObject,
  );
  const [isAdded, setIsAdded] = useState<boolean>(false);

  const {
    data: productData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["productid"],
    queryFn: () => getProductById(+productid),
  });

  const {
    mutateAsync: addToCart,
    isPending,
    error: cartError,
    isSuccess,
  } = useMutation({
    mutationFn: () => addProductToCart(productToCart),
  });

  useEffect(() => {
    (async () => {
      if (isAdded) {
        console.log("Added to cart");
        try {
          await addToCart();
          addToCartStore(productToCart, +productid as number, quantity);
          setQuantity(1);
          setIsAdded(false);
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, [isAdded]);

  const handleAddToCart = () => {
    setProductToCart({
      userId: 1,
      date: new Date(),
      products: [
        {
          productId: +productid,
          quantity,
        },
      ],
    });
    setIsAdded(true);
  };

  console.log(cart, "cart");

  return (
    <div>
      <div className="mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        {/* Product */}
        <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
          {/* Product image */}
          <div className="lg:col-span-4 lg:row-end-1">
            <div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-gray-100">
              {productData?.image && (
                <div className="mx-auto flex w-full flex-col items-center justify-center">
                  <div className="flex h-[550px] w-[400px] items-center justify-center overflow-hidden rounded-xl bg-white shadow-xl lg:h-[600px] lg:w-[600px] xl:h-[600px] xl:w-[600px]">
                    <Image
                      height={330}
                      width={364}
                      alt={productData?.image}
                      src={productData?.image}
                      className="object-cover object-center"
                      loading="lazy"
                      decoding="async"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      quality={100}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="mx-auto mt-14 h-full max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
            <div className="flex flex-col">
              <div className="">
                <h1 className="mb-5 text-2xl font-bold leading-10 text-gray-900 sm:text-[40px] sm:tracking-tight">
                  {productData?.title}
                </h1>
              </div>

              <StarRating rating={productData?.rating?.rate} />
              <p className="text-[24px] font-bold text-gray-900">
                ${productData?.price}
              </p>
            </div>
            <p className="mt-3 text-gray-500">{productData?.description}</p>
            <div>
              <div className="mb-10 mt-6 flex items-center justify-start gap-8">
                <img
                  className="h-8 w-auto dark:flex"
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal-dark.svg"
                  alt=""
                />
                <img
                  className="h-8 w-auto dark:flex"
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa-dark.svg"
                  alt=""
                />

                <img
                  className="h-8 w-auto dark:flex"
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard-dark.svg"
                  alt=""
                />
              </div>
            </div>

            <div className="mt-2 flex items-center">
              <Button
                disabled={isPending}
                onClick={handleAddToCart}
                size={"lg"}
                className="text-md rounded-3xl bg-black px-10 py-2 text-white"
              >
                <AiOutlineLoading
                  className="h-20 w-20 animate-spin"
                  size={30}
                  color="white"
                  style={{ display: isPending ? "block" : "none" }}
                />
                {!isPending && (
                  <span className="flex items-center gap-2">
                    {" "}
                    Add o Cart <ShoppingCart size={30} />
                  </span>
                )}
              </Button>
              <Input value={quantity} min={1} max={99} onChange={setQuantity} />
            </div>
          </div>

          {/* Product TabGroup */}
          <div className="mx-auto mt-16 w-full max-w-2xl lg:col-span-9 lg:mt-0 lg:max-w-none">
            <TabGroup>
              <div className="border-b border-gray-300">
                <TabList className="-mb-px flex space-x-8">
                  <Tab className="whitespace-nowrap border-b-2 border-transparent py-6 text-sm font-medium text-gray-700 hover:border-gray-300 hover:text-gray-800 data-[selected]:border-black data-[selected]:font-bold data-[selected]:text-black">
                    Customer Reviews
                  </Tab>
                  <Tab className="whitespace-nowrap border-b-2 border-transparent py-6 text-sm font-medium text-gray-700 hover:border-gray-300 hover:text-gray-800 data-[selected]:border-black data-[selected]:font-bold data-[selected]:text-black">
                    FAQ
                  </Tab>
                </TabList>
              </div>
              <TabPanels as={Fragment}>
                <TabPanel className="mt-5">
                  {isLoading && <SkeletonComments />}
                  <div className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                    {productData?.comments
                      ?.slice(0, 3)
                      .map((comment: IComment, index: number) => (
                        <CommentCard key={index} comment={comment} />
                      ))}
                  </div>
                </TabPanel>
                <TabPanel className="text-sm text-gray-500">
                  <h3 className="sr-only">Frequently Asked Questions</h3>
                  <dl>
                    {faqs.map((faq) => (
                      <Fragment key={faq.question}>
                        <dt className="mt-10 font-medium text-gray-900">
                          {faq.question}
                        </dt>
                        <dd className="prose prose-sm mt-2 max-w-none text-gray-500">
                          <p>{faq.answer}</p>
                        </dd>
                      </Fragment>
                    ))}
                  </dl>
                </TabPanel>
              </TabPanels>
            </TabGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
