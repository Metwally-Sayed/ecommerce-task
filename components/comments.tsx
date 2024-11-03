"use client";
import { useQuery } from "@tanstack/react-query";
import { getComments } from "@/lib/apis";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { SkeletonComments } from "./ui/custom-skeleton";
import CommentCard from "./ui/comment-card";

const Comments = (): JSX.Element => {
  const { data: comments, isLoading } = useQuery({
    queryKey: ["comments"],
    queryFn: () => getComments(),
  });
  return (
    <div className="w-full bg-white p-5 pb-20 md:mt-0 md:px-[100px] lg:h-[400px] lg:p-10">
      <Carousel className="w-full">
        <div className="flex h-20 w-full items-center justify-between lg:h-20">
          <div className="flex h-full w-full items-end justify-start">
            <h2 className="w-full text-[32px] font-bold lg:text-start lg:text-[48px]">
              OUR HAPPY CUSTOMERS
            </h2>
          </div>
          <div className="flex h-full items-end justify-end gap-2">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </div>
        <CarouselContent className="-ml-1">
          {isLoading &&
            Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="pl-1 md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1">
                  <SkeletonComments />
                </div>
              </CarouselItem>
            ))}
          {comments?.map((comment, index) => (
            <CarouselItem
              key={`${index} ${comment.name}`}
              className="pl-1 md:basis-1/2 lg:basis-1/3"
            >
              <CommentCard comment={comment} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default Comments;
