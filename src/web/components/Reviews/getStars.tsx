import { whiteStar, yellowStar } from "../../assets/svg/svgs";

type Props = {
  starNumber: number;
};

export const GetStars: React.FC<Props> = ({ starNumber }) => {
  const MAX_STARS = 5;
  const getStars = (starCount: number) => {
    const result = [];
    for (let i = 0; i < starCount; i++) {
      result.push("yellow-star");
    }

    return result;
  };

  return (
    <div
      className="leading-normal text-gray-300 text-md flex items-center mb-5"
      key={`stars-${starNumber}`}
    >
      {getStars(starNumber)?.map((star, index) => (
        <span key={`yellow-star-${index}`}>{yellowStar}</span>
      ))}

      {MAX_STARS - starNumber <= 5 &&
        getStars(MAX_STARS - starNumber).map((star, index) => (
          <span key={`white-star-${index}`}>{whiteStar}</span>
        ))}
    </div>
  );
};
