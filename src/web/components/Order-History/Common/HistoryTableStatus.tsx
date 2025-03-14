import { HistoryDetailsButton } from "./HistoryDetailsButton";
import { getPaymentOrderStatusClass } from "./Index";

type Props = {
  url: string;
  price: number;
  status: string;
};

export const HistoryTableStatus: React.FC<Props> = ({ status, price, url }) => {
  return (
    <div className="flex md:justify-end justify-center space-x-8 items-start w-full ">
      <div className="grid grid-cols-3 gap-2 text-white text-sm text-center font-bold leading-6">
        <div className="p-2 rounded-lg shadow-lg bg-purple-600">
          Paid: ${price?.toFixed(2)}
        </div>

        <div
          className={`${getPaymentOrderStatusClass(
            status
          )} p-2 rounded-lg shadow-lg`}
        >
          {status}
        </div>

        <HistoryDetailsButton url={url} />
      </div>
    </div>
  );
};
