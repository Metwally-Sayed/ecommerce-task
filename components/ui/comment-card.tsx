import { FaCircleCheck, FaStar } from "react-icons/fa6";
import { Card, CardContent } from "./card";
import { IComment } from "@/lib/types";

type Props = {
  comment: IComment;
};

const CommentCard = ({ comment }: Props): JSX.Element => {
  return (
    <div className="p-1">
      <Card>
        <CardContent className="flex aspect-[3/0.7] flex-col justify-center gap-2 p-6">
          <div className="flex items-center gap-1">
            {Array.from({ length: comment.stars }).map((_, index) => (
              <FaStar size={20} key={index} color="#FFD700" />
            ))}
          </div>
          <div>
            <span className="flex w-full items-center gap-2 text-xl font-semibold">
              {comment.name} <FaCircleCheck size={20} color="#01AB31" />
            </span>
            <p className="truncate text-sm font-thin text-gray-500">
              {comment.comment}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommentCard;
