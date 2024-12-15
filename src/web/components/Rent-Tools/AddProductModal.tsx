import React from "react";
import { ProductFormDataTypes, ProductFormErrorTypes } from "./RentYourTools";
import { TootlFormDialog } from "./ToolFormDialog";
import { ToolFormHeader } from "./ToolFormHeader";
import { ToolFormTableList } from "./ToolFormTableList";

type AddProductModalProps = {
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
  handleSort: (sortType: string) => void;
  setProductFormData: React.Dispatch<
    React.SetStateAction<ProductFormDataTypes>
  >;
  handleToolActions: (actionName: string, index: number) => void;
  resetToolForm: () => void;
};

export const AddProductModal: React.FC<AddProductModalProps> = ({
  errors,
  productFormData,
  handleProductChange,
  handleToolForm,
  openToolForm,
  setOpenToolForm,
  productList,
  handleSort,
  setProductFormData,
  handleToolActions,
  resetToolForm,
}) => {
  return (
    <>
      {openToolForm && (
        <TootlFormDialog
          errors={errors}
          productFormData={productFormData}
          handleProductChange={handleProductChange}
          handleToolForm={handleToolForm}
          openToolForm={openToolForm}
          setOpenToolForm={setOpenToolForm}
          productList={productList}
          resetToolForm={resetToolForm}
        />
      )}

      <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
        <div className="mx-auto  px-4 lg:px-12">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <ToolFormHeader
              setOpenToolForm={setOpenToolForm}
              productList={productList}
              handleSort={handleSort}
            />

            <ToolFormTableList
              productFormData={productFormData}
              productList={productList}
              setProductFormData={setProductFormData}
              handleToolActions={handleToolActions}
            />

            <nav
              className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
              aria-label="Table navigation"
            >
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                <span className="font-bold">Total Items</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {" "}
                  {productList.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  Max 20
                </span>
              </span>
            </nav>
          </div>
        </div>
      </section>
    </>
  );
};
