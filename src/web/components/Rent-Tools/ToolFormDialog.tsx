import React from "react";
import { ProductFormDataTypes, ProductFormErrorTypes } from "./RentYourTools";
import { JobInputs } from "../Find-Work-Post-A-Job/JobInputs";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

type TootlFormDialogProps = {
  errors: ProductFormErrorTypes;
  productFormData: ProductFormDataTypes;
  handleProductChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  handleToolForm: (e: React.FormEvent) => void;
  openToolForm: boolean;
  setOpenToolForm: React.Dispatch<React.SetStateAction<boolean>>;
  productList: ProductFormDataTypes[];
  resetToolForm: () => void;
};

export const TootlFormDialog: React.FC<TootlFormDialogProps> = ({
  errors,
  productFormData,
  handleProductChange,
  handleToolForm,
  openToolForm,
  setOpenToolForm,
  resetToolForm,
}) => {
  {
    /* <ExclamationTriangleIcon
                      aria-hidden="true"
                      className="size-6 text-red-600"
                    /> */
  }

  return (
    <Dialog
      open={openToolForm}
      onClose={setOpenToolForm}
      className="relative z-10"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                  <svg
                    className="h-8 w-8 text-red-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold text-gray-900 items-center justify-center "
                  >
                    Tool Form
                  </DialogTitle>
                  <div className="mt-2">
                    <form className="p-6 font-[sans-serif] m-6 max-auto ">
                      <div className="grid sm:grid-cols-2 gap-10">
                        <JobInputs
                          value={productFormData.toolName}
                          errorMessage={errors.toolBrand ?? ""}
                          labelName={"Tool Name"}
                          name="tool-name"
                          id="toolName"
                          handleChange={handleProductChange}
                        />

                        <JobInputs
                          value={productFormData.toolBrand}
                          errorMessage={errors.toolBrand ?? ""}
                          labelName={"Tool Brand"}
                          name="tool-brand"
                          id="toolBrand"
                          handleChange={handleProductChange}
                        />

                        <JobInputs
                          value={productFormData.toolCategory}
                          errorMessage={errors.toolCategory ?? ""}
                          labelName={"Tool Category"}
                          name="tool-category"
                          id="toolCategory"
                          handleChange={handleProductChange}
                        />

                        <JobInputs
                          value={productFormData.pricePerDay?.toString()}
                          errorMessage={errors.pricePerDay?.toString() ?? ""}
                          labelName={"Tool Price Per Day"}
                          name="tool-price-per-day"
                          id="pricePerDay"
                          handleChange={handleProductChange}
                        />

                        <JobInputs
                          value={productFormData.discountPercent?.toString()}
                          errorMessage={
                            errors.discountPercent?.toString() ?? ""
                          }
                          labelName={"Discount Percent"}
                          name="discount-percent"
                          id="discountPercent"
                          handleChange={handleProductChange}
                        />

                        <JobInputs
                          value={productFormData.description}
                          errorMessage={errors.description ?? ""}
                          labelName={"Description"}
                          name="description"
                          id="description"
                          handleChange={handleProductChange}
                        />

                        <JobInputs
                          value={productFormData.powerSource}
                          errorMessage={errors.powerSource ?? ""}
                          labelName={"Power Source"}
                          name="power-source"
                          id="powerSource"
                          handleChange={handleProductChange}
                        />

                        <JobInputs
                          value={productFormData.safetyInformation}
                          errorMessage={errors.safetyInformation ?? ""}
                          labelName={"Safety Information"}
                          name="safety-information"
                          id="safetyInformation"
                          handleChange={handleProductChange}
                        />

                        <JobInputs
                          value={productFormData.usageInstructions}
                          errorMessage={errors.usageInstructions ?? ""}
                          labelName={"Usage Instructions"}
                          name="usage-instructions"
                          id="usageInstructions"
                          handleChange={handleProductChange}
                        />

                        <div className="relative flex items-center">
                          <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">
                            Tool Avialable Date
                          </label>
                          <input
                            type="date"
                            name="nextAvailableDate"
                            id="nextAvailableDate"
                            className="px-4 py-3 bg-[#f0f1f2] text-black w-full text-sm outline-[#007bff] rounded"
                            value={productFormData.nextAvailableDate}
                            onChange={handleProductChange}
                            min={
                              new Date(Date.now() + 86400000)
                                .toISOString()
                                .split("T")[0]
                            } //Data is one day ahead
                          />
                          {errors.nextAvailableDate && (
                            <p className="text-red-500 text-xs">
                              {errors.nextAvailableDate}
                            </p>
                          )}
                        </div>

                        <div className="relative flex items-center">
                          <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">
                            Tool Image
                          </label>

                          <input
                            type="file"
                            name="imageUrls"
                            id="imageUrls"
                            className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
                            onChange={handleProductChange}
                            accept="image/*"
                          />
                          {errors.imageUrls && (
                            <p className="text-red-500 text-xs">
                              Tool image nedded.
                            </p>
                          )}
                        </div>
                      </div>

                      {/* <JobAcceptanceAgreement
                          isCustomer
                          booleanStatus={true}
                        /> */}

                      <button
                        type="submit"
                        className="mt-8 px-6 py-2.5 w-full text-sm text-white rounded bg-gray-600 hover:bg-gray-700 transition-all"
                        onClick={handleToolForm}
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={() => {
                  setOpenToolForm(false);
                  resetToolForm();
                }}
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
