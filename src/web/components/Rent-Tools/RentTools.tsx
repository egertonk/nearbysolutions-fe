import { useState } from "react";
import { MainTitle } from "../common-sections/MainTitle";
import { GeneralBannerInfo } from "../common-sections/GeneralBannerInfo";
import { cart } from "../../assets/svg/svgs";
import { GetStars } from "../Reviews/getStars";
import {
  rentInputCSS,
  SelectPickupDropoffTime,
} from "./SelectPickupDropoffTime";
import { SearchButton } from "../common-sections/SearchButton";
import { useRentTools } from "./useRentTools";
import { ImagePopup } from "../common-sections/ImagePopup";

export const RentTools: React.FC = () => {
  const { rentToolsAction } = useRentTools();

  const [openImage, setOpenImage] = useState(false);
  const [imageDetails, setImageDetails] = useState<{
    name: string | "";
    image: string | "";
  }>();

  console.log(
    "rentToolsAction.filteredTools    ",
    rentToolsAction.filteredTools
  );

  console.log("imageDetails    ", imageDetails);

  return (
    <>
      {openImage && (
        <ImagePopup
          openImage={openImage}
          setOpenImage={setOpenImage}
          imageDetails={imageDetails}
        />
      )}

      <MainTitle title={"DIY Tools Rental"} />
      <div className="justify-center mx-auto flex  gap-4 py-4 bg-white rounded-lg">
        <p className="w-full">
          <input
            type="text"
            placeholder="Product, Category or City"
            value={rentToolsAction.location}
            onChange={(e) => rentToolsAction.setLocation(e.target.value)}
            className={rentInputCSS}
          />

          <input
            type="date"
            name="startDate"
            value={rentToolsAction.fromDate}
            onChange={(e) => rentToolsAction.setFromDate(e.target.value)}
            className={rentInputCSS}
            min={new Date().toISOString().split("T")[0]} // Sets the minimum date to today
          />

          <SelectPickupDropoffTime
            value={rentToolsAction.fromTime}
            onChange={(e) => rentToolsAction.setFromTime(e.target.value)}
          />

          <input
            type="date"
            name="returnDate"
            value={rentToolsAction.untilDate}
            onChange={(e) => rentToolsAction.setUntilDate(e.target.value)}
            className={rentInputCSS}
            min={new Date(Date.now() + 86400000).toISOString().split("T")[0]} //Data is one day ahead
          />

          <SelectPickupDropoffTime
            selectedDate={rentToolsAction.selectedDate}
            value={rentToolsAction.untilTime}
            onChange={(e) => rentToolsAction.setUntilTime(e.target.value)}
          />

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
              data.available && (
                <div className="group relative m-5">
                  <a
                    className="justify-center mx-3 mt-3 flex h-60 rounded-xl cursor-pointer"
                    onClick={() => {
                      setImageDetails({
                        name: data.toolName,
                        image: data.imageUrls[0],
                      });
                      setOpenImage(true);
                    }}
                  >
                    <img
                      className="object-cover"
                      src={`${data.imageUrls[0]}`}
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

                    <button className="w-full flex items-center justify-center rounded-md bg-purple-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                      {cart}
                      {rentToolsAction.hasDatePassed(data.nextAvailableDate) ===
                      false
                        ? `Rent Now`
                        : `Available On ${data.nextAvailableDate}`}
                    </button>
                  </div>
                </div>
              )
          )}
        </div>
      )}
    </>
  );
};