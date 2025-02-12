import { MainTitle } from "../common-sections/MainTitle";
import { GeneralBannerInfo } from "../common-sections/GeneralBannerInfo";
import { rentInputCSS } from "./SelectPickupDropoffTime";
import { SearchButton } from "../common-sections/SearchButton";
import { useRentTools } from "./useRentTools";
import { ImagePopup } from "../common-sections/ImagePopup";
import { DateAndTimeInputs } from "./DateAndTimeInputs";
import { useImagePopup } from "./useImagePopup";
import { imageDetailsTypes } from "../../lib/types/FindWorkPostAJobtypesData";
import { ToolsListing } from "./ToolsListing";

export const RentTools: React.FC = () => {
  const { rentToolsAction } = useRentTools(true, "");
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

      <ToolsListing
        rentToolsAction={rentToolsAction}
        setImageDetails={setImageDetails}
        setOpenImage={setOpenImage}
      />
    </>
  );
};
