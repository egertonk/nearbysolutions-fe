import { editIconSVG } from "../../assets/svg/svgs";

type Props = {
  itemIndex: number;
  itemStatus: string | boolean;
  itemsTotal: number;
  handleEdit: (orderNumber: number) => void;
  isOrder?: boolean;
  isJobListings?: boolean;
  isRentalToolListings?: boolean;
  appSection?: string;
};

export const TableHeader: React.FC<Props> = ({
  itemStatus,
  itemIndex,
  itemsTotal,
  handleEdit,
  isOrder,
  isJobListings,
  isRentalToolListings,
  appSection,
}) => {
  const status = isRentalToolListings
    ? itemStatus
      ? "Listed"
      : "In Use"
    : isOrder || isJobListings
    ? itemStatus
      ? "Active"
      : "Completed"
    : "";

  return (
    <div
      className="flex justify-between items-center"
      key={`header-${itemIndex}`}
    >
      <div className="text-purple-600 font-bold">
        {itemIndex + 1} of {itemsTotal}
      </div>

      <div
        className={`p-1 w-20 ml-1 my-1 uppercase text-xs font-semibold text-yellow-100 ${
          itemStatus ? "bg-green-600" : "bg-purple-600"
        }`}
      >
        {status}
      </div>

      {appSection !== "dateSearch" && itemStatus && (
        <button
          onClick={() => handleEdit(itemIndex)}
          className="hover:text-purple-500 text-base w-5 flex font-medium text-gray rounded-full ml-4"
          key={`edit-icon-${itemIndex}`}
        >
          {editIconSVG}
        </button>
      )}
    </div>
  );
};
