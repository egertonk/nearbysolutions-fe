import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { Search } from "../search/Search";
import { SolutionistCard } from "./SolutionistCard";
import { useEffect, useState } from "react";
import { MainTitle } from "../common-sections/MainTitle";
import { useLocation } from "react-router";
import {
  SolutionistResponseTypes,
  SolutionistTypes,
} from "../../lib/types/solutionistTypes";
import { useCustomerInfo } from "../customer/useCustomerInfo";
import { useResetPostAJob } from "../Find-Work-Post-A-Job/useResetPostAJob";
import { useInfiniteScroll } from "../common-sections/InfiniteScroll ";
export const Solutionist: React.FC = () => {
  const location = useLocation();

  // const { data: users, isFetching } = useGetUsers();
  const {
    items: users,
    loading,
    hasMore,
    lastElementRef,
    showScrollButton,
    scrollToTop,
  } = useInfiniteScroll("http://localhost:8080/api/users/with-skills");

  const MAX_TALENT = 1;
  const [data, setData] = useState([] as SolutionistTypes[]);
  const [searchResults, setSearchResults] = useState(
    [] as SolutionistResponseTypes[]
  );
  const isSearchResults = data.length === 0;

  const isGiftASolution = location.pathname.includes("gift-a-solution");

  const { customerInfo, customerOrder } = useCustomerInfo(isGiftASolution, 49);
  const { resetPostAJob } = useResetPostAJob();

  useEffect(() => {
    // const giftStatus = location.pathname.includes("gift-a-solution");
    // if (giftStatus) dispatch(setApplicationMode(true));
    // if (giftStatus === false) dispatch(setApplicationMode(false));
    // dispatch(setCustomerOrder(orderStates));
    // dispatch(setPaymentState(paymentStatusStates));
    resetPostAJob();
  }, []);

  // useEffect(() => {
  //   if (searchResults.length === 0 && !isFetching && users)
  //     setSearchResults(users);
  // }, [isFetching, customerInfo, isGiftASolution]);

  if (users === undefined) return <div>loading...</div>;

  return (
    <>
      <div className="w-full ">
        <section className="max-w-7x2 mx-auto px-4 sm:px-6 lg:px-4 py-4">
          <MainTitle
            title={
              customerOrder.giftStatus
                ? "Gift a Solution"
                : isSearchResults
                ? "Select a Solutionist"
                : "Solutionist is Unavailable"
            }
          />

          <Search
            setSearchResults={setSearchResults}
            searchResults={searchResults}
            fallBackData={users}
          />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <SolutionistCard data={users} lastElementRef={lastElementRef} />
          </div>

          <div className="max-w-lg mx-auto p-4 relative">
            {loading && (
              <p className="text-center mt-4 font-bold text-lg font-heading text-purple-800 bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500 ">
                Loading more...
              </p>
            )}
            {!hasMore && (
              <p className="font-bold text-lg font-heading text-purple-800 bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
                No more solutionists to load.
              </p>
            )}

            {/* ✅ Back to Top Button */}
            {showScrollButton && (
              <button
                onClick={scrollToTop}
                className="fixed bottom-5 right-5 bg-purple-500 text-white p-3 rounded-full shadow-md hover:bg-purple-700 transition"
              >
                Top
              </button>
            )}
          </div>
        </section>
      </div>
    </>
  );
};
