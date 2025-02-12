import React from "react";
import { cart } from "../../assets/svg/svgs";
import DIYToolsImage from "../../assets/images/DIY-Tools-Renting.jpeg";
import { GetStars } from "../Reviews/getStars";
import { ToolRentalListing } from "../../lib/types/DIYToolsListings";
import { getImageArray } from "../../lib";
import { useNavigate } from "react-router";

type ToolsListingProps = {
  rentToolsAction: {
    filteredTools: ToolRentalListing[];
    handleSearch: () => void;
    hasDatePassed: (dateString: string) => boolean;
    location: string;
    setLocation: React.Dispatch<React.SetStateAction<string>>;
    fromDate: string;
    setFromDate: (date: string) => void;
    fromTime: string;
    setFromTime: React.Dispatch<React.SetStateAction<string>>;
    untilDate: string;
    setUntilDate: (date: string) => void;
    untilTime: string;
    setUntilTime: React.Dispatch<React.SetStateAction<string>>;
    selectedDate: string;
    setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
  };
  setOpenImage: (value: React.SetStateAction<boolean>) => void;
  setImageDetails: React.Dispatch<
    React.SetStateAction<
      | {
          name: string | "";
          image: string[] | [];
        }
      | undefined
    >
  >;
};

export const ToolsListing: React.FC<ToolsListingProps> = ({
  rentToolsAction,
  setOpenImage,
  setImageDetails,
}) => {
  const navigate = useNavigate();

  return (
    <>
      {rentToolsAction.filteredTools.length > 0 && (
        <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-5 lg:grid-cols-5 ">
          {rentToolsAction.filteredTools.map(
            (data) =>
              data.isAvailable && (
                <div className="group relative m-5">
                  <button
                    className="items-center justify-center mb-4 h-60 rounded-xl cursor-pointer bg-transparent border-none p-6"
                    onClick={() => {
                      setImageDetails({
                        name: data.toolName,
                        image:
                          data?.imageUrl === null
                            ? [DIYToolsImage]
                            : data.imageUrl,
                      });
                      setOpenImage(true);
                    }}
                  >
                    <img
                      className="object-cover h-60"
                      src={`${
                        getImageArray(data?.imageUrl).length > 0
                          ? getImageArray(data?.imageUrl)[0]
                          : DIYToolsImage
                      }`}
                      alt={data.toolName}
                    />
                    {data.discountPercent * 100 > 0 && (
                      <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                        {data.discountPercent}% OFF
                      </span>
                    )}
                  </button>
                  <div className=" mt-4 items-center justify-center">
                    <h5 className="text-xl tracking-tight text-white-900 font-bold">
                      {data.toolName}
                    </h5>

                    {data.toolBrand.length > 0 && (
                      <p>Brand Name: {data.toolBrand}</p>
                    )}
                    {data.toolCategory.length > 0 && (
                      <p>Catergory: {data.toolCategory}</p>
                    )}

                    <div className="ml-4 mr-4 mb-5 flex items-center justify-between">
                      <p>
                        <span className="text-3xl font-bold text-white-900">
                          {data.discountPercent * 100 > 0 ? (
                            <>
                              $
                              {(
                                data.pricePerDay -
                                data.pricePerDay * (data.discountPercent / 100)
                              ).toFixed(2)}
                            </>
                          ) : (
                            <>${data.pricePerDay}</>
                          )}
                        </span>
                        {data.discountPercent * 100 > 0 && (
                          <span className="text-sm text-white-900 line-through">
                            ${data.pricePerDay}
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

                    <button
                      onClick={() =>
                        navigate(`/rent-order-details?tool=${data.toolId}`)
                      }
                      className="w-full flex items-center justify-center rounded-md bg-purple-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                    >
                      {cart}
                      Rent Now
                    </button>
                    {/* <button
                      onClick={() =>
                        navigate(`/rent-order-details?tool=${data.toolId}`)
                      }
                      className="w-full flex items-center justify-center rounded-md bg-purple-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                    >
                      {cart}
                      {data.nextAvailableDate
                        ? `Rent Now`
                        : `Available On ${data.nextAvailableDate || ""}`}
                    </button> */}
                  </div>
                </div>
              )
          )}
        </div>
      )}
    </>
  );
};
