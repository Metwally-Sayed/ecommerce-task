"use client";

import { Fragment, SetStateAction, useEffect, useState } from "react";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon, PlusIcon } from "@heroicons/react/20/solid";
import { useQuery } from "@tanstack/react-query";
import { getCategories, getProducts } from "@/lib/apis";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import ProductCard from "@/components/ui/product-card";
import { IProduct } from "@/lib/types";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";

const navigation = {
  categories: [
    {
      id: "women",
      name: "Women",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/mega-menu-category-01.jpg",
          imageAlt:
            "Models sitting back to back, wearing Basic Tee in black and bone.",
        },
        {
          name: "Basic Tees",
          href: "#",
          imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/mega-menu-category-02.jpg",
          imageAlt:
            "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
        },
      ],
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [
            { name: "Tops", href: "#" },
            { name: "Dresses", href: "#" },
            { name: "Pants", href: "#" },
            { name: "Denim", href: "#" },
            { name: "Sweaters", href: "#" },
            { name: "T-Shirts", href: "#" },
            { name: "Jackets", href: "#" },
            { name: "Activewear", href: "#" },
            { name: "Browse All", href: "#" },
          ],
        },
        {
          id: "accessories",
          name: "Accessories",
          items: [
            { name: "Watches", href: "#" },
            { name: "Wallets", href: "#" },
            { name: "Bags", href: "#" },
            { name: "Sunglasses", href: "#" },
            { name: "Hats", href: "#" },
            { name: "Belts", href: "#" },
          ],
        },
        {
          id: "brands",
          name: "Brands",
          items: [
            { name: "Full Nelson", href: "#" },
            { name: "My Way", href: "#" },
            { name: "Re-Arranged", href: "#" },
            { name: "Counterfeit", href: "#" },
            { name: "Significant Other", href: "#" },
          ],
        },
      ],
    },
    {
      id: "men",
      name: "Men",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg",
          imageAlt:
            "Drawstring top with elastic loop closure and textured interior padding.",
        },
        {
          name: "Artwork Tees",
          href: "#",
          imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/category-page-02-image-card-06.jpg",
          imageAlt:
            "Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
        },
      ],
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [
            { name: "Tops", href: "#" },
            { name: "Pants", href: "#" },
            { name: "Sweaters", href: "#" },
            { name: "T-Shirts", href: "#" },
            { name: "Jackets", href: "#" },
            { name: "Activewear", href: "#" },
            { name: "Browse All", href: "#" },
          ],
        },
        {
          id: "accessories",
          name: "Accessories",
          items: [
            { name: "Watches", href: "#" },
            { name: "Wallets", href: "#" },
            { name: "Bags", href: "#" },
            { name: "Sunglasses", href: "#" },
            { name: "Hats", href: "#" },
            { name: "Belts", href: "#" },
          ],
        },
        {
          id: "brands",
          name: "Brands",
          items: [
            { name: "Re-Arranged", href: "#" },
            { name: "Counterfeit", href: "#" },
            { name: "Full Nelson", href: "#" },
            { name: "My Way", href: "#" },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: "Company", href: "#" },
    { name: "Stores", href: "#" },
  ],
};
const filters = [
  {
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "White" },
      { value: "beige", label: "Beige" },
      { value: "blue", label: "Blue" },
      { value: "brown", label: "Brown" },
      { value: "green", label: "Green" },
      { value: "purple", label: "Purple" },
    ],
  },
  {
    id: "category",
    name: "Category",
    options: [
      { value: "new-arrivals", label: "All New Arrivals" },
      { value: "tees", label: "Tees" },
      { value: "crewnecks", label: "Crewnecks" },
      { value: "sweatshirts", label: "Sweatshirts" },
      { value: "pants-shorts", label: "Pants & Shorts" },
    ],
  },
  {
    id: "sizes",
    name: "Sizes",
    options: [
      { value: "xs", label: "XS" },
      { value: "s", label: "S" },
      { value: "m", label: "M" },
      { value: "l", label: "L" },
      { value: "xl", label: "XL" },
      { value: "2xl", label: "2XL" },
    ],
  },
];
// const products = [
//   {
//     id: 1,
//     name: "Basic Tee 8-Pack",
//     href: "#",
//     price: "$256",
//     description:
//       "Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.",
//     options: "8 colors",
//     imageSrc:
//       "https://tailwindui.com/plus/img/ecommerce-images/category-page-02-image-card-01.jpg",
//     imageAlt:
//       "Eight shirts arranged on table in black, olive, grey, blue, white, red, mustard, and green.",
//   },
//   {
//     id: 2,
//     name: "Basic Tee",
//     href: "#",
//     price: "$32",
//     description:
//       "Look like a visionary CEO and wear the same black t-shirt every day.",
//     options: "Black",
//     imageSrc:
//       "https://tailwindui.com/plus/img/ecommerce-images/category-page-02-image-card-02.jpg",
//     imageAlt: "Front of plain black t-shirt.",
//   },
//   // More products...
// ];

export default function Shop(): JSX.Element {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [category, setCategory] = useState<string>("");

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const {
    data: categories = [],
    isLoading: categoriesLoading,
    error: categoriesError,
    refetch,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  const {
    data: products = [],
    isLoading: productsLoading,
    error: productsError,
    refetch: refetchProducts,
  } = useQuery({
    queryKey: ["products", category, currentPage],
    queryFn: () => getProducts(category),
  });

  const totalPages = Array.isArray(products)
    ? Math.ceil(products.length / productsPerPage)
    : 0;

  const currentProducts = products
    ? products.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage,
      )
    : [];

  const handlePageChange = (page: SetStateAction<number>) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    // Refetch products when category changes
    if (category) {
      refetchProducts();
    }
  }, [category]);

  if (productsLoading) return <div>Loading products...</div>;
  if (productsError)
    return <div>Error loading products: {productsError.message}</div>;

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
          <SheetContent side="left" className="bg-white">
            <SheetTitle className="text-2xl font-extrabold text-black">
              FILTERS
            </SheetTitle>
            <form className="mt-12">
              <Disclosure
                as="div"
                className="border-t border-gray-200 pb-4 pt-4"
              >
                <fieldset>
                  <legend className="w-full px-2">
                    <DisclosureButton className="group flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500">
                      <span className="text-xl font-bold text-gray-900">
                        {"Category"}
                      </span>
                      <span className="ml-6 flex h-7 items-center">
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="h-5 w-5 rotate-0 transform group-data-[open]:-rotate-180"
                        />
                      </span>
                    </DisclosureButton>
                  </legend>
                  <DisclosurePanel className="px-4 pb-2 pt-4">
                    <div className="space-y-3 pt-6">
                      <RadioGroup>
                        <div className="mb-2 flex items-center space-x-2">
                          <RadioGroupItem
                            onClick={() => setCategory("")}
                            value={""}
                            id={""}
                          />
                          <Label className="text-md" htmlFor={""}>
                            ALL
                          </Label>
                        </div>
                        {!categoriesLoading &&
                          categories?.map((option: string) => (
                            <div
                              key={option}
                              className="mb-2 flex items-center space-x-2"
                            >
                              <RadioGroupItem
                                onClick={() => setCategory(option)}
                                value={option}
                                id={option}
                              />
                              <Label className="text-md" htmlFor={option}>
                                {option.toLocaleUpperCase()}
                              </Label>
                            </div>
                          ))}
                      </RadioGroup>
                    </div>
                  </DisclosurePanel>
                </fieldset>
              </Disclosure>
            </form>
          </SheetContent>
        </Sheet>

        <main className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
          <div className="border-b border-gray-200 pb-10 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              OUR SHOP
            </h1>
            <p className="mt-4 text-base text-gray-500">
              Checkout out the latest releases.
            </p>
          </div>
          <div className="pb-24 pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
            <aside>
              <h2 className="sr-only">Filters</h2>

              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="inline-flex items-center lg:hidden"
              >
                <span className="text-sm font-medium text-gray-700">
                  Filters
                </span>
                <PlusIcon
                  aria-hidden="true"
                  className="ml-1 h-5 w-5 flex-shrink-0 text-gray-400"
                />
              </button>

              <div className="hidden lg:block">
                <form className="space-y-10 divide-y divide-gray-200">
                  <div className={"pt-10"}>
                    <fieldset>
                      <legend className="block text-xl font-bold text-black">
                        CATEORIES{" "}
                      </legend>
                      <div className="space-y-3 pt-6">
                        <RadioGroup>
                          <div className="mb-2 flex items-center space-x-2">
                            <RadioGroupItem
                              onClick={() => setCategory("")}
                              value={""}
                              id={""}
                            />
                            <Label className="text-md" htmlFor={""}>
                              ALL
                            </Label>
                          </div>
                          {!categoriesLoading &&
                            categories?.map((option: string) => (
                              <div
                                key={option}
                                className="mb-2 flex items-center space-x-2"
                              >
                                <RadioGroupItem
                                  onClick={() => setCategory(option)}
                                  value={option}
                                  id={option}
                                />
                                <Label className="text-md" htmlFor={option}>
                                  {option.toLocaleUpperCase()}
                                </Label>
                              </div>
                            ))}
                        </RadioGroup>
                      </div>
                    </fieldset>
                  </div>
                </form>
              </div>
            </aside>

            <section className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3">
              <h2 id="product-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
                {currentProducts?.map((product: IProduct) => (
                  <ProductCard
                    key={product.id}
                    price={product.price}
                    rating={product.rating}
                    title={product.title}
                    image={product.image}
                    id={product.id}
                    size="Default"
                  />
                ))}
              </div>
              <div className="mt-4 flex justify-center">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    className={`mx-1 rounded px-4 py-2 ${currentPage === index + 1 ? "bg-black text-white" : "bg-gray-200"}`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
