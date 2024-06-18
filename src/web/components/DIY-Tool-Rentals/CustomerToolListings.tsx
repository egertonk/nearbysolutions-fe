import React from "react";
import { diyToolListings, priceWithComma } from "../../lib";

import { MainTitle } from "../common-sections/MainTitle";
import { SortData } from "../common-sections/SortData";
import { SideMenuList } from "../Header/SideMenuList";
import { TableHeader } from "../common-sections/TableHeader";
import { SearchUI } from "../common-sections/SearchUI";
import { useCustomerToolListings } from "../../lib/useCustomerToolListings";

export const CustomerToolListings: React.FC = () => {
  const sortList = [
    "Tool Name",
    "Description",
    "Category",
    "Availability",
    "Brand",
    "Price",
  ];
  const { handleOnChange, filteredTools, handleSubmit, handleSort } =
    useCustomerToolListings(diyToolListings);

  // todo
  const handleEdit = (orderNumber: number) => {
    console.log("/edit-order ", orderNumber);
  };

  return (
    <div className="px-4 justify-center dark:bg-gray-700 rounded-b">
      <MainTitle title="Rental Tool Listings" />

      <SearchUI
        handleOnChange={handleOnChange}
        filteredTools={filteredTools}
        handleSubmit={handleSubmit}
      />

      <div className="flex flex-col lg:flex-row justify-center">
        <SideMenuList />

        <div className="px-2 rounded-b">
          <SortData sortList={sortList} handleSort={handleSort} />

          <div className="justify-center ">
            {filteredTools.map((tool, index) => (
              <div
                key={tool.toolId}
                className="mx-auto border-gray-500 border rounded-sm mb-2 h-30"
              >
                <div className="rounded-t auto-cols-max items-center">
                  <TableHeader
                    itemindex={index}
                    itemStatus={tool.availability}
                    itemsTotal={filteredTools.length}
                    handleEdit={handleEdit}
                    isRentalToolListings={true}
                  />
                  <div className="px-4 md:flex flex-row items-center border-t-8 border-purple-600">
                    <div className="w-full md:w-60 text-center md:text-left mr-2">
                      <div className="text-sm">
                        <span className="text-base font-semibold">Name:</span>{" "}
                        {tool.toolName}
                      </div>
                      <div className="text-sm">
                        <span className="text-base font-semibold">
                          Description:
                        </span>{" "}
                        {tool.description}
                      </div>
                      <div className="text-sm">
                        <span className="text-base font-semibold">Brand:</span>{" "}
                        {tool.brand}
                      </div>
                    </div>
                    <div className="w-full md:w-60 text-center m-1 md:text-left">
                      <div className="text-sm">
                        <span className="text-base font-semibold">
                          Availability:
                        </span>{" "}
                        {tool.availability ? "In Stock" : "Out of Stock"}
                      </div>
                      <div className="text-sm">
                        <span className="text-base font-semibold">
                          Max Rental Days:
                        </span>{" "}
                        {tool.rentalTotalDays}
                      </div>
                      <div className="text-sm">
                        <span className="text-base font-semibold">
                          Rental Price Per Day:
                        </span>{" "}
                        ${priceWithComma(tool.pricePerday || "")}
                      </div>
                      <div className="text-sm">
                        <span className="text-base font-semibold">
                          Usage Instructions:
                        </span>{" "}
                        {tool.usageInstructions}
                      </div>
                    </div>
                    <div className="w-60 text-center m-1 md:text-left">
                      {tool.imageUrls.map((image, imgIndex) => (
                        <img
                          key={imgIndex}
                          className="h-50 w-60 img"
                          src={`${image}`}
                          alt="Tool Image"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
