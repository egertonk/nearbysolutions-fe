type Props = {
  name: string;
  value: string | number;
};

export const OrderHistoryItemDetails: React.FC<Props> = ({
  name,
  value,
}) => {
  return (
    <p className="text-sm dark:text-white leading-none text-gray-800">
      <span className="text-black-400  font-semibold">{name}: </span> {value}
    </p>
  );
};
