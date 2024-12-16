import { useQuery } from "@tanstack/react-query";
import {
  getWrapper,
  getWrapperSearchTerm,
  getWrapperWthId,
  getWrapperWthIds,
} from "./fetchGet";
import {
  SolutionistTypes,
  talentPlaceHolderData,
} from "../lib/types/solutionistTypes";
import { CustomerDetailsTypes } from "../../store/customerDetailsSlice";
import { CountryTypes } from "../lib/types/countryTypes";
import { OrderTypes } from "../lib/types/orderTypes";
import {
  JobPosting,
  NoLicensePermitVerificationServiceTypes,
} from "../lib/types/FindWorkPostAJobtypesData";
import {
  ToolAndCustomerTypes,
  ToolRentalListing,
} from "../lib/types/DIYToolsListings";
import { RentalOrderHistory } from "../lib/types/DIYToolsListings copy";

// Skills
export const getSkills = () => {
  return getWrapper("skills").then((data) => {
    return data;
  });
};

export const useGetSkills = () => {
  return useQuery({
    queryKey: ["skills"],
    queryFn: () => getSkills(),
    placeholderData: [],
  });
};

// Cart
export const getCart = (): Promise<{}> => {
  return getWrapper("cart").then((data) => {
    return data;
  });
};

export const useGetCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(),
    placeholderData: [],
  });
};

// Customer
export const getCustomer = async (): Promise<CustomerDetailsTypes> => {
  return getWrapper("customers").then((data) => {
    return data;
  });
};

export const useGetCustomer = () => {
  return useQuery({
    queryKey: ["customer"],
    queryFn: () => getCustomer().then((data) => data),
    placeholderData: {} as CustomerDetailsTypes,
  });
};

export const getCustomerWithId = (
  userId: number
): Promise<CustomerDetailsTypes> => {
  return getWrapperWthId("customers", userId).then((data) => {
    return data;
  });
};

export const useGetCustomerWithId = (userId: number) => {
  return useQuery({
    queryKey: ["customerWithId"],
    queryFn: () => getCustomerWithId(userId).then((data) => data),
    placeholderData: {} as CustomerDetailsTypes,
  });
};

// User
export const getUser = async (): Promise<SolutionistTypes[]> => {
  return getWrapper("user").then((data) => {
    return data;
  });
};

export const useGetUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => getUser().then((data) => data),
    placeholderData: talentPlaceHolderData,
  });
};

// User
export const getUserWithId = (userId: number): Promise<SolutionistTypes> => {
  return getWrapperWthId("user", userId).then((data) => {
    return data;
  });
};

export const useGetUserWithId = (userId: number) => {
  return useQuery({
    queryKey: ["userWithId"],
    queryFn: () => getUserWithId(userId).then((data) => data),
    placeholderData: talentPlaceHolderData[0],
  });
};

// Coutries
export const getCoutries = async (): Promise<CountryTypes[]> => {
  return getWrapper("country-features").then((data) => {
    return data;
  });
};

export const useGetCoutries = () => {
  return useQuery({
    queryKey: ["coutries"],
    queryFn: () => getCoutries().then((data) => data),
    placeholderData: [],
  });
};

// Orders
export const getOrders = async (): Promise<[]> => {
  return getWrapper("orders").then((data) => {
    return data;
  });
};

export const useGetOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrders().then((data) => data),
    placeholderData: [],
  });
};

export const getOrdersWithSolutionistId = (
  userId: number
): Promise<OrderTypes[]> => {
  return getWrapperWthId("orders/contractor", userId).then((data) => {
    return data;
  });
};

export const useGetOrdersWithSolutionistId = (userId: number) => {
  return useQuery({
    queryKey: ["rrdersWithSolutionistId"],
    queryFn: () => getOrdersWithSolutionistId(userId).then((data) => data),
    placeholderData: [],
  });
};

// Search Term Result
export const getUserSearchResult = (
  searchTerm: string
): Promise<SolutionistTypes[]> => {
  return getWrapperSearchTerm("skills", searchTerm).then((data) => {
    return data;
  });
};

export const useGetUserSearchResult = (searchTerm: string) => {
  return useQuery({
    queryKey: ["search-result"],
    queryFn: () => getUserSearchResult(searchTerm).then((data) => data),
    placeholderData: talentPlaceHolderData,
  });
};

// Job Posting
export const getJobPosting = async (): Promise<JobPosting[]> => {
  return getWrapper("job-postings").then((data) => {
    return data;
  });
};

export const useJobPosting = () => {
  return useQuery({
    queryKey: ["job-postings"],
    queryFn: () => getJobPosting().then((data) => data),
    placeholderData: [],
  });
};

export const getJobPostingById = async (id: number): Promise<JobPosting> => {
  return getWrapperWthId("job-postings", id).then((data) => {
    return data;
  });
};

export const useJobPostingById = (id: number) => {
  return useQuery({
    queryKey: ["job-postings-by-Id"],
    queryFn: () => getJobPostingById(id).then((data) => data),
    // placeholderData: {},
  });
};

export const getJobPostingSearchResult = (
  searchTerm: string
): Promise<JobPosting[]> => {
  return getWrapperSearchTerm("job-postings", searchTerm).then((data) => {
    return data;
  });
};

export const useGetJobPostingSearchResult = (searchTerm: string) => {
  return useQuery({
    queryKey: ["job-postings-search-result"],
    queryFn: () => getJobPostingSearchResult(searchTerm).then((data) => data),
    placeholderData: [],
  });
};

// No License Permit Verification Service
export const getNoLicensePermitVerificationService = async (): Promise<
  NoLicensePermitVerificationServiceTypes[]
> => {
  return getWrapper("no-verification-services").then((data) => {
    return data;
  });
};

export const useNoLicensePermitVerificationService = () => {
  return useQuery({
    queryKey: ["no-license-permit-verification-service"],
    queryFn: () => getNoLicensePermitVerificationService().then((data) => data),
    placeholderData: [],
  });
};

// Tools Rental
export const getToolRentalListing = async (): Promise<ToolRentalListing[]> => {
  return getWrapper("tool-rental-listing").then((data) => {
    return data;
  });
};

export const useToolRentalListing = (isEnabled: boolean) => {
  return useQuery({
    queryKey: ["tool-rental-listing"],
    queryFn: () => getToolRentalListing().then((data) => data),
    placeholderData: [],
    enabled: isEnabled,
  });
};

export const getToolCustomerWithId = (
  customerId: number,
  toolId: number
): Promise<ToolAndCustomerTypes> => {
  return getWrapperWthIds("tool-customer", customerId, toolId).then((data) => {
    return data;
  });
};

export const useGetToolRentalListingWithId = (
  customerId: number,
  toolId: number
) => {
  return useQuery({
    queryKey: ["tool-customer-with-id"],
    queryFn: () =>
      getToolCustomerWithId(customerId, toolId).then((data) => data),
    placeholderData: {} as ToolAndCustomerTypes,
  });
};

// Tool Rental Order History
export const getToolsRentalHistoryByCustomerId = async (
  id: number
): Promise<RentalOrderHistory[]> => {
  return getWrapperWthId("tools-rental-order-history/customer", id).then(
    (data) => {
      return data;
    }
  );
};

export const useToolsRentalHistoryByCustomerId = (id: number) => {
  return useQuery({
    queryKey: ["tools-rental-order-history"],
    queryFn: () => getToolsRentalHistoryByCustomerId(id).then((data) => data),
    placeholderData: [] as RentalOrderHistory[],
  });
};

export const getToolsRentalHistoryByOrderId = async (
  id: number
): Promise<RentalOrderHistory> => {
  return getWrapperWthId("tools-rental-order-history", id).then(
    (data) => {
      return data;
    }
  );
};

export const useToolsRentalHistoryByOrderId = (id: number) => {
  return useQuery({
    queryKey: [`order-id-${id}`],
    queryFn: () => getToolsRentalHistoryByOrderId(id).then((data) => data),
    placeholderData: {} as RentalOrderHistory,
  });
};
