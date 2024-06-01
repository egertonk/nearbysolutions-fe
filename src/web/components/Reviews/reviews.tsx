import { useState } from "react";
import { ReviewHeader } from "./reviewHeader";
import { customerReviewDetails } from "../..";
import { GetStars } from "./getStars";

type CustomerReviewDetails = {
  customerFirstName: string;
  customerLastName: string;
  customerReviewComment: string;
  customerCity: string;
  customerStarsRating: number;
  customerImage: string;
}[][];

export const Reviews: React.FC = () => {
  const MIN_CHUNK = 5;
  const [sortType, setSortType] = useState("");
  const [talentName, setTalentName] = useState("");

  const isChunkValid = customerReviewDetails.length > MIN_CHUNK;

  const handleSubmit = () => {
    console.log("sortType ", sortType);
    console.log("talentName ", talentName);

    // submit to database and get reviews
  };

  // Function to split array into chunks of specified size
  function splitIntoChunks<T>(array: T[], chunkSize: number): T[][] {
    const result: T[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }

  const chunks = splitIntoChunks(customerReviewDetails, 3);

  // Accessing the three separate arrays
  const firstChunk = chunks[0];
  const secondChunk = chunks[1];
  const thirdChunk = chunks[2];

  return (
    <section id="testimonies" className="py-5">
      <div className="max-w-6xl mx-8 md:mx-10 lg:mx-20 xl:mx-auto">
        <ReviewHeader
          handleSubmit={handleSubmit}
          setSortType={setSortType}
          setTalentName={setTalentName}
        />
        {isChunkValid ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            <ul className="space-y-8">
              {firstChunk.map((reviewData, index) => (
                <li className="text-sm leading-6" key={`review-${index}`}>
                  <div className="relative group">
                    <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
                    <a
                      href="https://twitter.com/tim_cook"
                      className="cursor-pointer"
                    >
                      <div className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                        <div className="flex items-center space-x-4">
                          <img
                            src={`${reviewData.customerImage}`}
                            className="w-12 h-12 bg-center bg-cover border rounded-full"
                            alt="Tim Cook"
                          />
                          <div>
                            <h3 className="text-lg font-semibold text-white">
                              {reviewData.customerFirstName}{" "}
                              {reviewData.customerLastName}
                            </h3>
                            <p className="text-gray-500 text-md">
                              {reviewData.customerCity}
                            </p>
                          </div>
                        </div>
                        <p className="leading-normal text-gray-300 text-md">
                          {reviewData.customerReviewComment}
                        </p>

                        <GetStars starNumber={reviewData.customerStarsRating} />
                      </div>
                    </a>
                  </div>
                </li>
              ))}
            </ul>

            <ul className="hidden space-y-8 sm:block">
              {secondChunk.map((reviewData, index) => (
                <li className="text-sm leading-6" key={`review-md-${index}`}>
                  <div className="relative group">
                    <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
                    <a
                      href="https://twitter.com/paraga"
                      className="cursor-pointer"
                    >
                      <div className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                        <div className="flex items-center space-x-4">
                          <img
                            src={`${reviewData.customerImage}`}
                            className="w-12 h-12 bg-center bg-cover border rounded-full"
                            alt="Parag Agrawal"
                          />
                          <div>
                            <h3 className="text-lg font-semibold text-white">
                              {reviewData.customerFirstName}{" "}
                              {reviewData.customerLastName}
                            </h3>
                            <p className="text-gray-500 text-md">
                              {reviewData.customerCity}
                            </p>
                          </div>
                        </div>
                        <p className="leading-normal text-gray-300 text-md">
                          {reviewData.customerReviewComment}
                        </p>

                        <GetStars starNumber={reviewData.customerStarsRating} />
                      </div>
                    </a>
                  </div>
                </li>
              ))}
            </ul>

            <ul className="hidden space-y-8 lg:block">
              {thirdChunk.map((reviewData, index) => (
                <li className="text-sm leading-6" key={`review-md-${index}`}>
                  <div className="relative group">
                    <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
                    <a
                      href="https://twitter.com/satyanadella"
                      className="cursor-pointer"
                    >
                      <div className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                        <div className="flex items-center space-x-4">
                          <img
                            src={`${reviewData.customerImage}`}
                            className="w-12 h-12 bg-center bg-cover border rounded-full"
                            alt="Satya Nadella"
                          />
                          <div>
                            <h3 className="text-lg font-semibold text-white">
                              {reviewData.customerFirstName}{" "}
                              {reviewData.customerLastName}
                            </h3>
                            <p className="text-gray-500 text-md">
                              {reviewData.customerCity}
                            </p>
                          </div>
                        </div>
                        <p className="leading-normal text-gray-300 text-md">
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
        ) : (
          <ul className="space-y-8">
            {customerReviewDetails.map((reviewData, index) => (
              <li className="text-sm leading-6" key={`review-${index}`}>
                <div className="relative group">
                  <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
                  <a
                    href="https://twitter.com/tim_cook"
                    className="cursor-pointer"
                  >
                    <div className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                      <div className="flex items-center space-x-4">
                        <img
                          src={`${reviewData.customerImage}`}
                          className="w-12 h-12 bg-center bg-cover border rounded-full"
                          alt="Tim Cook"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            {reviewData.customerFirstName}{" "}
                            {reviewData.customerLastName}
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
        )}
      </div>
    </section>
  );
};
