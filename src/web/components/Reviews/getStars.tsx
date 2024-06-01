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
    <>
      <p className="leading-normal text-gray-300 text-md" key={`${Math.random()}`}>
        <div className="flex items-center  mb-5">
          {getStars(starNumber)?.map((star) => yellowStar)}

          {MAX_STARS - starNumber <= 5 &&
            getStars(MAX_STARS - starNumber).map((star) => whiteStar)}
        </div>
      </p>
    </>
  );
};
