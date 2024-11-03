"use client";
import { useQuery } from "@tanstack/react-query";

import ProductCard from "./ui/product-card";
import { SkeletonCard } from "./ui/custom-skeleton";
import { getLatestProducts, getTopSellingProducts } from "@/lib/apis";
import { IProduct } from "@/lib/types";

type Props = {
  title: string;
  fetchDataType: string;
};

const ShowCase = ({ title, fetchDataType }: Props) => {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: [fetchDataType],
    queryFn:
      fetchDataType === "latestproducts"
        ? getLatestProducts
        : getTopSellingProducts,
  });

  return (
    <div className="flex w-full flex-col items-center bg-[#F2F0F1] py-[70px] md:mt-0 md:px-[40px] lg:py-[100px]">
      <h2 className="text-[32px] font-bold lg:text-[48px]">{title}</h2>
      <div className="mx-auto mt-6 grid grid-cols-1 items-center justify-center gap-x-10 gap-y-24 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading &&
          Array.from({ length: 4 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}

        {products?.map((product: IProduct) => (
          <ProductCard
            key={product.id}
            id={product.id}
            image={product.image}
            title={product.title}
            price={product.price}
            rating={product.rating}
            size="Default"
          />
        ))}
      </div>
    </div>
  );
};

export default ShowCase;
