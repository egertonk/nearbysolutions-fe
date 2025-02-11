import { MainTitle } from "../common-sections/MainTitle";
import { GeneralBannerInfo } from "../common-sections/GeneralBannerInfo";
import { cart } from "../../assets/svg/svgs";
import { GetStars } from "../Reviews/getStars";
import { rentInputCSS } from "./SelectPickupDropoffTime";
import { SearchButton } from "../common-sections/SearchButton";
import { useRentTools } from "./useRentTools";
import { ImagePopup } from "../common-sections/ImagePopup";
import DIYToolsImage from "../../assets/images/DIY-Tools-Renting.jpeg";
import { useNavigate } from "react-router";
import { DateAndTimeInputs } from "./DateAndTimeInputs";
import { useImagePopup } from "./useImagePopup";
import { imageDetailsTypes } from "../../lib/types/FindWorkPostAJobtypesData";
import { getImageArray } from "../../lib";

export const RentTools: React.FC = () => {
  const navigate = useNavigate();
  const { rentToolsAction } = useRentTools(true);
  const { openImage, setOpenImage, imageDetails, setImageDetails } =
    useImagePopup();

  const imageArray: string[] = (imageDetails as imageDetailsTypes)?.image;

  // Ensure imageArray is already a valid array or a JSON string
  const jsonString = Array.isArray(imageArray)
    ? JSON.stringify(imageArray)
    : imageArray;

  // Safely parse JSON if it's a string
  const extractedImageData: string[] =
    typeof jsonString === "string" ? JSON.parse(jsonString) : [];

  return (
    <>
      {openImage && (
        <ImagePopup
          openImage={openImage}
          setOpenImage={setOpenImage}
          imageDetails={{
            name: imageDetails?.name || "",
            image: extractedImageData,
          }}
          featureName="tool"
        />
      )}

      <MainTitle title={"DIY Tools Rental"} />
      <div className="justify-center mx-auto flex  gap-4 py-4 bg-white rounded-lg">
        <p className="w-full">
          <input
            type="text"
            placeholder="Product, Category or City"
            value={rentToolsAction.location}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              rentToolsAction.setLocation(e.target.value)
            }
            className={rentInputCSS}
          />

          <DateAndTimeInputs rentToolsAction={rentToolsAction} />

          <SearchButton handleSubmit={rentToolsAction.handleSearch} />
        </p>
      </div>
      <GeneralBannerInfo
        title={"Info"}
        description={
          "All tools listed for DIY rental are previously used and maintained by their respective owners."
        }
        titleBG={"bg-purple-900"}
      />

      {rentToolsAction.filteredTools.length > 0 && (
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {rentToolsAction.filteredTools.map(
            (data) =>
              data.isAvailable && (
                <div className="group relative m-5">
                  <button
                    className="justify-center mx-3 mt-3 flex h-60 rounded-xl cursor-pointer bg-transparent border-none p-6"
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
                      className="object-cover"
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
