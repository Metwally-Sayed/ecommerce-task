import { IProduct, IRating } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import StarRating from "./StarRating";
import { getProductById } from "@/lib/apis";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { memo } from "react";

type Props = {
  id?: number;
  image?: string;
  title?: string;
  price?: number;
  rating?: IRating;
  size?: "Default" | "Cart";
  quantity?: number;
  deleteItem?: (productId: number) => void;
};

const ProductCard = ({
  id,
  image,
  title,
  price,
  rating,
  size,
  quantity,
  deleteItem,
}: Props) => {
  const [productData, setProductData] = useState<IProduct>();

  useEffect(() => {
    if (size === "Cart") {
      (async () => {
        try {
          const data = await getProductById(id!);
          console.log(data, "data");
          setProductData(data);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [id]);

  const deleteItemHandler = () => {
    if (deleteItem) {
      deleteItem(id!);
    }
  };

  return (
    <>
      {size === "Default" && (
        <div
          key={id}
          className="group relative mx-auto flex w-full flex-col justify-center"
        >
          <div className="mx-auto flex w-full flex-col items-center justify-center">
            <div className="flex h-[300px] w-[300px] items-center justify-center overflow-hidden rounded-xl bg-white shadow-xl group-hover:opacity-75 lg:h-[250px] lg:w-[230px] xl:h-[300px] xl:w-[300px]">
              {image && (
                <Image
                  width={150}
                  height={150}
                  alt={image}
                  src={image}
                  quality={100}
                  loading="lazy"
                />
              )}
            </div>
          </div>
          <div className="ml-1 mt-4 flex w-[300px] flex-col justify-start gap-1 lg:w-[230px]">
            <h3 className="truncate text-[20px] font-semibold text-gray-700">
              <Link href={`/product/${id}`}>
                <span aria-hidden="true" className="absolute inset-0" />
                {title}
              </Link>
            </h3>
            <StarRating rating={rating?.rate} />
            <p className="text-[24px] font-bold text-gray-900">${price}</p>
          </div>
        </div>
      )}

      {size === "Cart" && (
        <ul
          role="list"
          className="m-2 rounded-md border-b border-t border-gray-200 bg-white p-2 shadow-xl"
        >
          <li key={productData?.id} className="flex gap-2">
            {productData?.image && (
              <div className="flex h-[130px] w-[100px] items-center justify-center overflow-hidden rounded-xl bg-white">
                <Image
                  height={150}
                  width={130}
                  alt={productData?.image}
                  src={productData?.image}
                  className="h-[130px] w-auto"
                  loading="lazy"
                  decoding="async"
                  quality={100}
                />
              </div>
            )}

            <div className="relative flex flex-1 flex-col gap-1">
              <span
                onClick={deleteItemHandler}
                className="absolute -right-3 -top-3 cursor-pointer rounded-full bg-black p-1 duration-500 ease-in-out hover:bg-gray-700"
              >
                <X color="white" size={13} className="cursor-pointer" />
              </span>

              <h3 className="mt-2 text-sm leading-4">
                <Link
                  href={`/product/${productData?.id}`}
                  className="font-bold text-black hover:text-gray-700"
                >
                  {productData?.title}
                </Link>
              </h3>
              <div className="flex flex-1 justify-between">
                {productData?.price && quantity && (
                  <p className="mt-1 text-sm font-medium text-gray-600">
                    Price: ${productData?.price * quantity}
                  </p>
                )}
                <p className="mt-1 pr-4 text-sm font-medium text-gray-600">
                  Quantity: {quantity}
                </p>
              </div>
            </div>
          </li>
        </ul>
      )}
    </>
  );
};

export default memo(ProductCard);
