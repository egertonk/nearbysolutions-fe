import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { Search } from "../search/Search";
import { SolutionistCard } from "./SolutionistCard";
import { useEffect, useState } from "react";
import { MainTitle } from "../common-sections/MainTitle";
import { useLocation } from "react-router";
import { useGetUser } from "../../utils/fetchEndpoints";
import { SolutionistTypes } from "../../lib/types/solutionistTypes";
import { useCustomerInfo } from "../customer/useCustomerInfo";
import { useResetPostAJob } from "../Find-Work-Post-A-Job/useResetPostAJob";

export const Solutionist: React.FC = () => {
  const location = useLocation();

  const { data: user, isFetching } = useGetUser();

  const MAX_TALENT = 1;
  const [data, setData] = useState([] as SolutionistTypes[]);
  const [searchResults, setSearchResults] = useState([] as SolutionistTypes[]);
  const isSearchResults = data.length === 0;

  const isGiftASolution = location.pathname.includes("gift-a-solution");

  const { customerInfo } = useCustomerInfo(isGiftASolution, 1);
  const { resetPostAJob } = useResetPostAJob();

  useEffect(() => {
    // const giftStatus = location.pathname.includes("gift-a-solution");
    // if (giftStatus) dispatch(setApplicationMode(true));
    // if (giftStatus === false) dispatch(setApplicationMode(false));
    // dispatch(setCustomerOrder(orderStates));
    // dispatch(setPaymentState(paymentStatusStates));
    console.log("ressssssssssssssssssssset");
    resetPostAJob();
  }, []);

  useEffect(() => {
    if (user && searchResults.length === 0 && isFetching === false)
      setSearchResults(user);
  }, [isFetching, customerInfo, isGiftASolution]);

  return (
    <>
      <div className="w-full ">
        <section className="max-w-7x2 mx-auto px-4 sm:px-6 lg:px-4 py-4">
          <MainTitle
            title={
              isGiftASolution
                ? "Gift a Solution"
                : isSearchResults
                ? "Select a Solutionist"
                : "Solutionist is Unavailable"
            }
          />
          <Search
            setSearchResults={setSearchResults}
            searchResults={searchResults}
            fallBackData={user}
          />

          {user !== undefined && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              <SolutionistCard data={searchResults} />
            </div>
          )}
          {!isSearchResults && data.length > MAX_TALENT && (
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
              <div className="flex flex-1 justify-between sm:hidden">
                <a
                  href="#"
                  className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Previous
                </a>
                <a
                  href="#"
                  className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Next
                </a>
              </div>
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">1</span> to{" "}
                    <span className="font-medium">10</span> of{" "}
                    <span className="font-medium">{data.length}</span> results
                  </p>
                </div>
                <div>
                  <nav
                    className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                    aria-label="Pagination"
                  >
                    <a
                      href="#"
                      className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                      <span className="sr-only">Previous</span>
                      <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                    </a>
                    {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                    <a
                      href="#"
                      aria-current="page"
                      className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      1
                    </a>
                    <a
                      href="#"
                      className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                      2
                    </a>
                    <a
                      href="#"
                      className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                    >
                      3
                    </a>
                    <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                      ...
                    </span>
                    <a
                      href="#"
                      className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                    >
                      8
                    </a>
                    <a
                      href="#"
                      className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                      9
                    </a>
                    <a
                      href="#"
                      className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                      10
                    </a>
                    <a
                      href="#"
                      className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                      <span className="sr-only">Next</span>
                      <ChevronRightIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </a>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
};
