import { useState } from "react";
import { Reviews } from "../../lib/types/ReviewTypes";
import { reviews } from "../..";
import { GetStars } from "./getStars";
import { ReviewHeader } from "./reviewHeader";

export const Review: React.FC = () => {
  const [sortBy, setSortBy] = useState("");
  const [talentName, setTalentName] = useState("");
  const [reviewsSorted, setReviewsSorted] = useState<Reviews[]>(reviews);

  const sortByCity = () => {
    const sortedData = reviews.sort((a, b) =>
      a.customerCity.localeCompare(b.customerCity)
    );
    return sortedData;
  };

  const sortByReviewDate = () => {
    return reviews.sort((a, b) => {
      const dateA = new Date(a.customerReviewDate);
      const dateB = new Date(b.customerReviewDate);

      return dateA.getTime() - dateB.getTime();
    });
  };
  const sortByStarsRating = () => {
    const sortedData = reviews.sort(
      (a, b) => b.customerStarsRating - a.customerStarsRating
    );
    return sortedData;
  };

  const handleSortBy = (action: string) => {
    if (action === "city") setReviewsSorted(sortByCity());
    if (action === "date") setReviewsSorted(sortByReviewDate());
    if (action === "stars") setReviewsSorted(sortByStarsRating());

    setSortBy(action);
  };

  const filterByContractorName = (name: string) => {
    if (name === "Select Solutionist") {
      setReviewsSorted(reviews);
      setTalentName("");
    } else {
      setTalentName(name);
      setReviewsSorted(
        [...reviews].filter((review) => review.contractorFullName === name)
      );
    }
  };

  const contractorFullNames = Array.from(
    new Set(reviews.map((review) => review.contractorFullName))
  );

  return (
    <section id="testimonies" className="py-5">
      <div className="max-w-6xl mx-8 md:mx-10 lg:mx-20 xl:mx-auto">
        <ReviewHeader
          talentName={talentName}
          contractorFullNames={contractorFullNames}
          handleSortBy={handleSortBy}
          filterByContractorName={filterByContractorName}
        />

        <ul
          className={
            reviewsSorted.length <= 3
              ? "space-y-8"
              : "grid grid-cols-1 lg:grid-cols-4 gap-4"
          }
        >
          {reviewsSorted.map((reviewData, index) => (
            <li className="text-sm " key={`review-${index}`}>
              <div className="relative group">
                <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
                <a
                  href="https://twitter.com/tim_cook"
                  className="cursor-pointer"
                >
                  <div className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                    <div className="flex items-center space-x-4">
                      <img
                        src={`${reviewData.contractorImage}`}
                        className="w-12 h-12 bg-center bg-cover border rounded-full"
                        alt="Tim Cook"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {reviewData.contractorFullName}
                        </h3>
                        <p className="text-white text-md">
                          {reviewData.customerCity}
                          {reviewData.customerStarsRating}
                        </p>
                      </div>
                    </div>
                    <p className="leading-normal text-white text-md">
                      {reviewData.customerReviewComment}
                    </p>

                    <GetStars starNumber={reviewData.customerStarsRating} />
                  </div>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
