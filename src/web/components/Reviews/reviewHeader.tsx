import { userAccountProfile } from "../..";

type Props = {
  talentName: string;
  contractorFullNames: string[];
  handleSortBy: (action: string) => void;
  filterByContractorName: (name: string) => void;
};

export const ReviewHeader: React.FC<Props> = ({
  talentName,
  contractorFullNames,
  handleSortBy,
  filterByContractorName,
}) => {
  return (
    <div className="transition duration-500 ease-in-out transform scale-100 translate-x-0 translate-y-0 opacity-100">
      <div className="mb-12 space-y-5 md:mb-16 md:text-center">
        <h1 className="mb-5 text-3xl font-semibold text-purple-800 md:text-center md:text-5xl">
          {userAccountProfile.account.customerAccount
            ? "Words From You"
            : "Customer Reviews"}
        </h1>

        {userAccountProfile.account.customerAccount && (
          <label
            htmlFor="country"
            className="block text-md font-medium leading-6 text-red-900"
          >
            Select a Solutionist to see Reviews
          </label>
        )}

        <form className="flex flex-col md:flex-row gap-3 justify-center">
          {userAccountProfile.account.customerAccount && (
            <div>
              <select
                value={talentName}
                id="talent-name"
                name="talent-name"
                autoComplete="talent-name"
                onChange={(e) => filterByContractorName(e.target.value)}
                className="w-50 md:w-80 px-3 h-10 rounded-l border-2 border-purple-500 focus:outline-none focus:border-purple-800"
              >
                <option defaultValue="Select Solutionist">
                  Select Solutionist
                </option>
                {contractorFullNames.map((name, index) => (
                  <option key={`contractor-${index}`}>{name}</option>
                ))}
              </select>
            </div>
          )}

          <select
            id="sortType"
            name="sortType"
            className="w-50 md:w-80 px-3 h-10 rounded-l border-2 border-purple-500 focus:outline-none focus:border-purple-800"
            onChange={(e) => handleSortBy(e.target.value)}
          >
            <option defaultValue="Sort by">Sort by</option>
            <option value="date">Date</option>
            <option value="city">City</option>
            <option value="stars">Stars</option>
          </select>
        </form>
      </div>
    </div>
  );
};
