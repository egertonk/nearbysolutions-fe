import React from "react";
import { ProductFormDataTypes } from "./RentYourTools";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

type ToolFormTableListProps = {
  productFormData: ProductFormDataTypes;
  productList: ProductFormDataTypes[];
  setProductFormData: React.Dispatch<
    React.SetStateAction<ProductFormDataTypes>
  >;
  handleToolActions: (actionName: string, index: number) => void;
};

export const ToolFormTableList: React.FC<ToolFormTableListProps> = ({
  productFormData,
  productList,
  setProductFormData,
  handleToolActions,
}) => {
  return (
    <>
      <div className="relative flex flex-col w-full h-full overflow-scroll shadow-md rounded-xl ">
        <table className="w-full text-left table-auto min-w-max">
          <thead className="bg-[#a52a2a] text-white font-bold">
            <tr>
              <th className="p-4 border-b border-blue-gray-100">
                <p className="block font-sans text-sm antialiased font-normal leading-none">
                  Image
                </p>
              </th>
              <th className="p-4 border-b border-blue-gray-100">
                <p className="block font-sans text-sm antialiased font-normal leading-none">
                  Name
                </p>
              </th>
              <th className="p-4 border-b border-blue-gray-100">
                <p className="block font-sans text-sm antialiased font-normal leading-none">
                  Brand
                </p>
              </th>{" "}
              <th className="p-4 border-b border-blue-gray-100">
                <p className="block font-sans text-sm antialiased font-normal leading-none">
                  Category
                </p>
              </th>{" "}
              <th className="p-4 border-b border-blue-gray-100">
                <p className="block font-sans text-sm antialiased font-normal leading-none">
                  Rent Price Per Day
                </p>
              </th>{" "}
              <th className="p-4 border-b border-blue-gray-100">
                <p className="block font-sans text-sm antialiased font-normal leading-none">
                  Discount Percent
                </p>
              </th>{" "}
              <th className="p-4 border-b border-blue-gray-100">
                <p className="block font-sans text-sm antialiased font-normal leading-none">
                  Description
                </p>{" "}
                <p className="block font-sans text-sm antialiased font-normal leading-none">
                  Power Source
                </p>
              </th>
              <th className="p-4 border-b border-blue-gray-100">
                <p className="block font-sans text-sm antialiased font-normal leading-none">
                  <p className="block font-sans text-sm antialiased font-normal leading-none">
                    Safety Information
                  </p>{" "}
                  <p className="block font-sans text-sm antialiased font-normal leading-none">
                    Usage Instructions
                  </p>
                </p>
              </th>
              <th className="p-4 border-b border-blue-gray-100">
                <p className="block font-sans text-sm antialiased font-normal leading-none">
                  Avialable Date
                </p>
              </th>
              <th className="p-4 border-b border-blue-gray-100">
                <p className="block font-sans text-sm antialiased font-normal leading-none"></p>
              </th>
            </tr>
          </thead>

          <tbody>
            {Array.isArray(productList) &&
              productList.map((data, index) => (
                <tr
                  key={`${data.toolName}-${index}`}
                  className="border-b dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {/* Apple iMac 27&#34; */}
                    {/* {data.imageUrls} */}
                    <img
                      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
                      className="w-48 h-25"
                      alt="..."
                    />
                  </th>
                  <td className="px-4 py-3"> {data.toolName}</td>
                  <td className="px-4 py-3"> {data.toolBrand}</td>
                  <td className="px-4 py-3"> {data.toolCategory}</td>
                  <td className="px-4 py-3"> ${data.pricePerDay}</td>
                  <td className="px-4 py-3">{data.discountPercent}%</td>
                  <td className="px-4 py-3">
                    <div className="mb-2">
                      <span className="font-bold">Description</span>{" "}
                      <p>{data.description}</p>
                    </div>
                    <div>
                      <span className="font-bold">Power Source</span>{" "}
                      <p>{data.powerSource}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {" "}
                    <div className="mb-2">
                      <span className="font-bold">Safety Information</span>{" "}
                      <p>{data.safetyInformation}</p>
                    </div>
                    <div>
                      <span className="font-bold">Usage Instructions</span>{" "}
                      <p>{data.usageInstructions}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3"> {data.nextAvailableDate}</td>
                  <td className="px-4 py-3 flex items-center justify-end relative">
                    <Menu
                      as="div"
                      className="px-4 py-3 flex items-center justify-end relative"
                    >
                      <div>
                        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                          <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                          </svg>
                        </MenuButton>
                      </div>

                      <MenuItems
                        transition
                        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                      >
                        <div className="py-1 relative">
                          <MenuItem>
                            <button
                              onClick={() => handleToolActions("Edit", index)}
                              className="text-left w-full block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                            >
                              Edit
                            </button>
                          </MenuItem>
                          <MenuItem>
                            <button
                              onClick={() =>
                                handleToolActions("Duplicate", index)
                              }
                              className="text-left w-full block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                            >
                              Duplicate
                            </button>
                          </MenuItem>
                          <MenuItem>
                            <button
                              onClick={() => handleToolActions("Delete", index)}
                              className="text-left w-full block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                            >
                              Delete
                            </button>
                          </MenuItem>
                        </div>
                      </MenuItems>
                    </Menu>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
