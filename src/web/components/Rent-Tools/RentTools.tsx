import { MainTitle } from "../common-sections/MainTitle";
import { SearchUI } from "../search/SearchUI";
import { useCustomerToolListings } from "../../lib/useCustomerToolListings";
import { diyToolListings } from "../../lib";
import { DIYToolListing } from "../../lib/types/DIYToolsListings";
import { GeneralBannerInfo } from "../common-sections/GeneralBannerInfo";
import { cart } from "../../assets/svg/svgs";
import { GetStars } from "../Reviews/getStars";

export const RentTools: React.FC = () => {
  const { handleOnChange, filteredTools, handleSubmit, handleSort } =
    useCustomerToolListings(diyToolListings as DIYToolListing[]);

  const hasDatePassed = (dateString: string): boolean => {
    const inputDate = new Date(dateString);
    const today = new Date();

    // Remove time from today's date for an accurate comparison
    today.setHours(0, 0, 0, 0);

    return inputDate > today;
  };

  return (
    <>
      <MainTitle title={"DIY Tools Rental"} />
      <SearchUI
        handleOnChange={handleOnChange}
        filteredTools={filteredTools}
        handleSubmit={handleSubmit}
      />
      35 MILES RADUIS ONLY
      <GeneralBannerInfo
        title={"Info"}
        description={
          "All tools listed for DIY rental are previously used and maintained by their respective owners."
        }
        titleBG={"bg-purple-900"}
      />
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 m-10 justify-center items-center">
        {diyToolListings.map(
          (data) =>
            data.isAvailable && (
              <div className="bg-sky-950 sm:m-4 mt-4 flex w-full flex-col overflow-hidden rounded-lg border border-purple-900 shadow-md text-white">
                <a className="justify-center mx-3 mt-3 flex h-60 rounded-xl">
                  <img
                    className="object-cover"
                    src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                  />
                  {data.discountPercent * 100 > 0 && (
                    <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                      {data.discountPercent}% OFF
                    </span>
                  )}
                </a>
                <div className=" mt-4 items-center justify-center">
                  <h5 className="text-xl tracking-tight text-white-900 font-bold">
                    {data.toolName}
                  </h5>

                  {data.brand.length > 0 && <p>Brand Name: {data.brand}</p>}
                  {data.category.length > 0 && (
                    <p>Catergory: {data.category}</p>
                  )}

                  <div className="ml-4 mr-4 mb-5 flex items-center justify-between">
                    <p>
                      <span className="text-3xl font-bold text-white-900">
                        {data.discountPercent * 100 > 0 ? (
                          <>
                            $
                            {(
                              data.pricePerday -
                              data.pricePerday * (data.discountPercent / 100)
                            ).toFixed(2)}
                          </>
                        ) : (
                          <>${data.pricePerday}</>
                        )}
                      </span>
                      {data.discountPercent * 100 > 0 && (
                        <span className="text-sm text-white-900 line-through">
                          ${data.pricePerday}
                        </span>
                      )}
                    </p>

                    <div className="flex items-center font-bold">
                      Price Per Day
                    </div>
                  </div>

                  {data.rating >= 3 && (
                    <p className="flex justify-center">
                      <GetStars starNumber={data.rating} />
                      <span className="mb-5 mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-md font-semibold text purple">
                        {data.rating}
                      </span>
                    </p>
                  )}

                  <button className="w-full flex items-center justify-center rounded-md bg-purple-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                    {cart}
                    {hasDatePassed(data.nextAvailableDate) === false
                      ? `Rent Now`
                      : `Available On ${data.nextAvailableDate}`}
                  </button>
                </div>
              </div>
            )
        )}
      </div>
    </>
  );
};
