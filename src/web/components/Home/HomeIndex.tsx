import React from "react";
import "../../../App.css";
import { MainTitle } from "../common-sections/MainTitle";
import { SolutionistCard } from "../solutionist/SolutionistCard";
import { useGetUsers } from "../../utils/fetchEndpoints";
import { JobListings } from "../Find-Work-Post-A-Job/JobListings";
import { useFindWorkPostAJob } from "../../lib/useFindWorkPostAJob";
import { sortList } from "../Find-Work-Post-A-Job/FindWorkPostAJob";
import { ToolsListing } from "../Rent-Tools/ToolsListing";
import { useRentTools } from "../Rent-Tools/useRentTools";
import { useImagePopup } from "../Rent-Tools/useImagePopup";
import { HomeSectionHeader } from "./HomeSectionHeader";
import { imageDetailsTypes } from "../../lib/types/FindWorkPostAJobtypesData";
import { ImagePopup } from "../common-sections/ImagePopup";
import { StripePayment } from "../Payment-Process/StripePayment";

export const HomeIndex: React.FC = () => {
  const { rentToolsAction } = useRentTools(true, "home-page");
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

  const { data: users } = useGetUsers();
  const { filteredJobs } = useFindWorkPostAJob(sortList, "home-page");

  return (
    <>
      {/* <StripePayment /> */}
      ///// todo
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
      <MainTitle title={"Nearby Solution Services"} />
      <div className="grid grid-flow-col gap-4 p-4 mt-4 mb-4 h-auto bg-purple-800 text-white">
        <div className="row-span-2">
          <div className="max-md:order-1">
            <p className="mt-4 mb-2 font-semibold">
              CONNECTING YOU TO LOCAL EXPERTISE
            </p>
            <h1 className="md:text-5xl text-4xl font-bold mb-4 md:!leading-[55px]">
              Find a nearby solution effortlessly today
            </h1>
            <p className="mt-4 text-base leading-relaxed">
              Embark on a gastronomic journey with our curated dishes, delivered
              promptly to your doorstep. Elevate your dining experience today.
              Delve into the details and let us enhance every aspect of your
              dining adventure.
            </p>
            <div className="bg-white mt-10 flex px-1 py-1.5 rounded-full shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] overflow-hidden">
              <input
                type="email"
                placeholder="Search for a solution..."
                className="w-full outline-none bg-white pl-4"
              />
              <button
                type="button"
                className="bg-purple-600 hover:bg-purple-700 transition-all text-white rounded-full px-5 py-2.5"
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <div className="max-md:mt-12 h-48 mb-5">
            <img
              src="https://readymadeui.com/team-image.webp"
              alt="banner img"
              className="w-full h-64 object-cover"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-flow-col grid-rows-2 gap-4 px-4 m-1">
        <HomeSectionHeader
          sectionName={"Our Solutionists"}
          path={"/hire-a-talent"}
          addedSection={null}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-2 mb-4">
        <SolutionistCard data={users || []} lastElementRef={() => {}} />
      </div>
      <hr className="w-full h-1 mx-auto  bg-purple-300 border-0 rounded-sm dark:bg-purple-800"></hr>
      <div className="grid grid-flow-col grid-rows-2 gap-4 px-4 m-1">
        <HomeSectionHeader
          sectionName={"Find Work"}
          path={"/find-work-post-a-job"}
          addedSection={{
            name: "Post A Job",
            linkPath: "/post-a-job",
          }}
        />
      </div>
      <JobListings customerJobsArray={filteredJobs} />
      <hr className="w-full h-1 mx-auto  bg-purple-300 border-0 rounded-sm dark:bg-purple-800 mt-4"></hr>
      <div className="grid grid-flow-col grid-rows-2 gap-4 px-4 m-1">
        <HomeSectionHeader
          sectionName={"DIY Tools Rental"}
          path={"/DIY-tools-rental"}
          addedSection={{
            name: "Rent Your Home Tools",
            linkPath: "/rent-your-home-tools",
          }}
        />
      </div>
      <ToolsListing
        rentToolsAction={rentToolsAction}
        setImageDetails={setImageDetails}
        setOpenImage={setOpenImage}
      />
    </>
  );
};
