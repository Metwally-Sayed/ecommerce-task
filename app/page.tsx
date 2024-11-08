import Comments from "@/components/comments";
import Hero from "@/components/hero";
import ShowCase from "@/components/show-case";

export default function Home() {
  return (
    <>
      <Hero />
      <ShowCase title="NEW ARRIVALS" fetchDataType={"latestproducts"} />
      <ShowCase title="TOP SELLING" fetchDataType={"topsellingproducts"} />
      <Comments />
    </>
  );
}
