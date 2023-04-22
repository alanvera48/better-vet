import { AiFillStar } from "react-icons/ai";

export const RatingStars = ({ rating }: any) => {
  const stars = [];

  if (rating == 0) {
    stars.push(<AiFillStar color={"e3e6e8"} />);
  } else {
    for (let i = 0; i < rating; i++) {
      stars.push(<AiFillStar key={i} color={"gold"} />);
    }
  }
  return <>{stars.map((star) => star)}</>;
};
