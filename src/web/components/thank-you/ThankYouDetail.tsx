type Props = {
  columName: string;
  name: string;
  isJobDetail: boolean;
};

export const ThankYouDetail: React.FC<Props> = ({
  columName,
  name,
  isJobDetail,
}) => {
  return (
    <>
      {isJobDetail ? (
        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dd className="text-lg font-medium sm:mt-0 sm:col-span-2">
            {columName}
          </dd>
          <button className="mt-1 text-lg sm:mt-0">{name}</button>
        </div>
      ) : (
        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className="text-lg font-medium">{columName}</dt>
          <dd className="mt-1 text-lg sm:mt-0 sm:col-span-2">{name}</dd>
        </div>
      )}
    </>
  );
};
