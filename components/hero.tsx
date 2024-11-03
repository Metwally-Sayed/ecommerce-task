import Image from "next/image";
import { Button } from "../components/ui/button";
import SliderComponent from "./ui/brands-slider";
import Link from "next/link";

const Hero = () => {
  const images = [
    "/gucci.png",
    "/zara.png",
    "/versace.png",
    "/prada.png",
    "/calvinklien.png",
  ];
  return (
    <div className="h-full w-full">
      {/* WEB VIEW */}
      <div className="hidden sm:block">
        <div>
          <div className="relative min-w-full">
            <Image
              src={"/hero-web.png"}
              alt="hero"
              width={1920}
              height={1080}
            />
          </div>
          <div className="absolute top-[10%] z-0 flex flex-col py-10 pl-10 lg:top-[20%]">
            <h1 className="w-[317px] text-3xl font-bold lg:w-[517px] lg:text-6xl">
              FIND CLOTES THAT MATC YOUR STYLE
            </h1>
            <p className="text-md mt-4 w-[317px] lg:w-[517px]">
              Browse through our diverse range of meticulously crafted garments,
              designed to bring out your individuality and cater to your sense
              of style.
            </p>
            <div className="w-full">
              <Link href="/shop">
                <Button
                  size={"lg"}
                  title="Shop Now"
                  className="mt-7 h-12 rounded-3xl bg-black px-20 py-7 text-white"
                >
                  Shop Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full bg-black lg:h-[122px]">
          <SliderComponent images={images} />
        </div>
      </div>

      {/* MOBILE VIEW */}
      <div className="block sm:hidden">
        <div className="h-full w-full bg-[#F2F0F1]">
          <div className="flex flex-col p-10">
            <h1 className="text-6xl font-bold lg:w-[517px]">
              FIND CLOTES THAT MATC YOUR STYLE
            </h1>
            <p className="text-md mt-4 lg:w-[517px]">
              Browse through our diverse range of meticulously crafted garments,
              designed to bring out your individuality and cater to your sense
              of style.
            </p>
            <div className="w-full">
              <Link href="/shop">
                <Button
                  size={"lg"}
                  title="Shop Now"
                  className="mt-7 h-12 w-full rounded-3xl bg-black px-20 py-7 text-white"
                >
                  Shop Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="min-h-full">
          <Image
            src={"/hero-mobile.png"}
            alt="hero"
            width={853}
            height={390}
            quality={100}
            className="w-full"
          />
        </div>
        <div className="h-[122px] w-full bg-black">
          <SliderComponent images={images} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
