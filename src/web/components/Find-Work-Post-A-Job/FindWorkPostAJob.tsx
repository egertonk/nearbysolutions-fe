import { PostAJobHeader } from "./PostAJobHeader";
import { MainTitle } from "../common-sections/MainTitle";
import { JobListings } from "./JobListings";
import { SearchUI } from "../search/SearchUI";
import { SortData } from "../common-sections/SortData";
import { useFindWorkPostAJob } from "../../lib/useFindWorkPostAJob";
import { useGetCustomerWithId } from "../../utils/fetchEndpoints";
import { useEffect } from "react";
import { setCustomerDetails } from "../../../store/customerDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCustomerOrder } from "../../../store/customerContractorSlice";
import { RootState } from "../../../store";

export const FindWorkPostAJob: React.FC = () => {
  const dispatch = useDispatch();

  const states = useSelector((state: RootState) => state);
  const customerOrder = states.formData.customerOrder;

  const sortList = ["Date", "Time", "Amount"];
  const { handleOnChange, handleSubmit, handleSort, filteredJobs } =
    useFindWorkPostAJob(sortList);
  const { data: customer, isFetching: isCustomerFetching } =
    useGetCustomerWithId(1); // comes from login

  useEffect(() => {
    if (customer && isCustomerFetching === false) {
      dispatch(setCustomerDetails(customer));

      const updatedCustomerFormData = {
        ...customerOrder,
        customerInfo: {
          customerID: customer.customerId,
          firstName: customer.firstName || "",
          lastName: customer.lastName || "",
          country: customer.country || "",
          address: customer.address || "",
          city: customer.city || "",
          state: customer.state || "",
          zip: customer.zip || "",
          phoneNumber: customer.phoneNumber || "",
          email: customer.email || "",
        },
      };

      dispatch(setCustomerOrder(updatedCustomerFormData));
    }
  }, [isCustomerFetching]);

  return (
    <>
      <MainTitle title={"Customer Job Requests"} />
      <SearchUI
        handleOnChange={handleOnChange}
        handleSubmit={handleSubmit}
        filteredJobs={filteredJobs}
      />
      <PostAJobHeader />
      <SortData sortList={sortList} handleSort={handleSort} />
      <JobListings customerJobsArray={filteredJobs} />
    </>
  );
};
