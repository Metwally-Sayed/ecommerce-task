import { FaStar } from "react-icons/fa6";

type Props = {
  rating?: number; // Rating value from the API
};

const StarRating = ({ rating }: Props): JSX.Element => {
  const totalStars = 5;

  const filledStars = Math.round(rating!);

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: totalStars }, (_, index) => (
        // <span
        //   key={index}
        //   style={{ color: index < filledStars ? "#FFD700" : "#D3D3D3" }}
        // >
        //   ★
        // </span>
        <FaStar
          size={20}
          key={index}
          color={index < filledStars ? "#FFD700" : "#D3D3D3"}
        />
      ))}
      <div className="ml-2 mt-1 text-gray-500">
        <span className="font-semibold">{rating?.toFixed(1)}</span>
        /5
      </div>{" "}
    </div>
  );
};

export default StarRating;
