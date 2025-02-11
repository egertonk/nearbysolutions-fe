import React from "react";
import { ProductFormDataTypes } from "./RentYourTools";
import { hasDatePassed } from "./useRentTools";
import { cart } from "../../assets/svg/svgs";
import { ImagePopup } from "../common-sections/ImagePopup";
import { useImagePopup } from "./useImagePopup";
import { ToolsLegalAgreement } from "../legal/ToolsLegalAgreement";

type RentToolsReviewProps = {
  currentStep: number;
  productList: ProductFormDataTypes[];
  isAccept: boolean;
  setIsAccept: React.Dispatch<React.SetStateAction<boolean>>;
  isShowTermsAndConditions: boolean;
  setIsShowTermsAndConditions: React.Dispatch<React.SetStateAction<boolean>>;
};

export const RentToolsReview: React.FC<RentToolsReviewProps> = ({
  productList,
  currentStep,
  isAccept,
  setIsAccept,
  isShowTermsAndConditions,
  setIsShowTermsAndConditions,
}) => {
  const { openImage, setOpenImage, imageDetails, setImageDetails } =
    useImagePopup();

  return (
    <>
      {openImage && (
        <ImagePopup
          openImage={openImage}
          setOpenImage={setOpenImage}
          imageDetails={imageDetails}
          featureName="tool"
        />
      )}

      {productList.length > 0 && (
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {productList.map(
            (data) =>
              data.nextAvailableDate && (
                <div className="group relative m-5">
                  <a
                    className="justify-center mx-3 mt-3 flex h-60 rounded-xl cursor-pointer"
                    onClick={() => {
                      setImageDetails({
                        name: data.toolName,
                        image: [data.imageUrls],
                      });
                      setOpenImage(true);
                    }}
                  >
                    <img className="object-cover" src={`${data.imageUrls}`} />
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
      )}

      {currentStep === 2 && (
        <ToolsLegalAgreement
          isCustomer={false}
          isAccept={isAccept}
          setIsAccept={setIsAccept}
          isShowTermsAndConditions={isShowTermsAndConditions}
          setIsShowTermsAndConditions={setIsShowTermsAndConditions}
        />
      )}

      {currentStep === 3 && (
        <button
          type="submit"
          onClick={() => {
            console.log("submit tool listing to database ---");
          }}
          className="font-bold mt-2 mb-4 px-6 py-2.5 w-full text-lg text-white rounded bg-purple-600 hover:bg-purple-900 transition-all cursor-pointer"
        >
          Submit
        </button>
      )}
    </>
  );
};
