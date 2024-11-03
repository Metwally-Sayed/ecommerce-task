import Image from "next/image";

type Props = {
  images: string[];
};

const SliderComponent = ({ images }: Props) => {
  return (
    <div className="flex items-center justify-center overflow-hidden">
      <div className="inline-flex w-full flex-nowrap overflow-hidden py-8 text-5xl [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
        <ul className="animate-infinite-scroll flex items-center justify-center md:justify-start [&_img]:max-w-none [&_li]:mx-4 sm:[&_li]:mx-8">
          {images.map((image, index) => (
            <li key={index}>
              <Image src={image} alt="hero" width={100} height={100} />
            </li>
          ))}
        </ul>
        <ul
          className="animate-infinite-scroll flex items-center justify-center md:justify-start [&_img]:max-w-none [&_li]:mx-4 sm:[&_li]:mx-8"
          aria-hidden="true"
        >
          {images.map((image, index) => (
            <li key={index}>
              <Image src={image} alt="hero" width={100} height={100} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SliderComponent;
