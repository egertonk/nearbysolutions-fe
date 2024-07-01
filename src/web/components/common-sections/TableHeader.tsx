import { editIconSVG } from "../../assets/svg/svgs";

type Props = {
  itemindex: number;
  itemStatus: boolean;
  itemsTotal: number;
  handleEdit: (orderNumber: number) => void;
  isOrder?: boolean;
  isJobListtings?: boolean;
  isRentalToolListings?: boolean;
  appSection?: string;
};

export const TableHeader: React.FC<Props> = ({
  itemStatus,
  itemindex,
  itemsTotal,
  handleEdit,
  isOrder,
  isJobListtings,
  isRentalToolListings,
  appSection,
}) => {
  let status = "";
  if (isRentalToolListings) status = itemStatus ? "Listed" : "In Use";
  if (isOrder || isJobListtings) status = itemStatus ? "Active" : "Completed";

  return (
    <div
      className="columns-3 flex justify-between"
      key={`header-${Math.random()}`}
    >
      <div className="text-purple-600 w-15 font-bold">
        {itemindex + 1} of {itemsTotal}
      </div>

      <div className=" justify-end">
        <div
          className={`p-1 w-20 ml-1 my-1 uppercase text-xs font-semibold text-yellow-100 ${
            itemStatus ? "bg-green-600" : "bg-purple-600"
          }`}
        >
          {status}
        </div>
      </div>

      {appSection !== "dateSearch" && (
        <div className="justify-end">
          {itemStatus ? (
            <button
              onClick={() => handleEdit(5353)}
              className="hover:text-purple-500 text-base w-5 flex font-medium text-gray rounded-full ml-4"
              key={`edit-icon-${Math.random()}`}
            >
              {editIconSVG}
            </button>
          ) : (
            <button
              className="text-base w-5 flex font-medium text-gray rounded-full ml-4 cursor-default"
              key={`empty-icon-${Math.random()}`}
            ></button>
          )}
        </div>
      )}
    </div>
  );
};
