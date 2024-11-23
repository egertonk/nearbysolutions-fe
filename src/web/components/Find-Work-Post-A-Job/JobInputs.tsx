type Props = {
  value: string;
  errorMessage: string;
  labelName: string;
  name: string;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
};

export const JobInputs: React.FC<Props> = ({
  value,
  errorMessage,
  labelName,
  name,
  handleChange,
}) => {
  return (
    <>
      <div className="relative flex items-center">
        <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">
          {labelName}
        </label>
        <input
          type="text"
          name={name}
          className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
          value={value}
          onChange={handleChange}
        />
        {errorMessage && <p className="text-red-500 text-xs">{errorMessage}</p>}
      </div>
    </>
  );
};
