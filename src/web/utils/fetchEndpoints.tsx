import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import {
  getHomePageWrapper,
  getWrapper,
  getWrapperDataWithIds,
  getWrapperSearchTerm,
  getWrapperWthId,
  getWrapperWthIds,
} from "./fetchGet";
import {
  CustommerResponseTypes,
  SolutionistResponseTypes,
  UserTypes,
} from "../lib/types/solutionistTypes";
import { CountryTypes } from "../lib/types/countryTypes";
import { OrderTypes } from "../lib/types/orderTypes";
import {
  FullJobPostingDetails,
  JobPosting,
  NoLicensePermitVerificationServiceTypes,
} from "../lib/types/FindWorkPostAJobtypesData";
import {
  ToolAndCustomerTypes,
  ToolRentalListing,
} from "../lib/types/DIYToolsListings";
import { FullPaymentDetailsDTO } from "../lib/types/DIYToolsListings copy";

// Generic Fetch Wrapper
const fetchData = async <T,>(endpoint: string): Promise<T> =>
  getWrapper(endpoint).then((data) => data);

// Hook Wrapper
const useFetchData = <T,>(
  key: string[],
  fetchFn: () => Promise<T>,
  placeholder: T
) => {
  return useQuery<T, Error, T, string[]>({
    queryKey: key,
    queryFn: fetchFn,
    placeholderData: placeholder as T, // Explicit cast to avoid type inference issues
  } as UseQueryOptions<T, Error, T, string[]>); // Explicit typing
};

// Skills
export const getSkills = () => fetchData("skills");
export const useGetSkills = () => useFetchData(["skills"], getSkills, []);

// Cart
export const getCart = () => fetchData("cart");
export const useGetCart = () => useFetchData(["cart"], getCart, {});

// Customer
export const getCustomer = () => fetchData<UserTypes>("customers");
export const useGetCustomer = () =>
  useFetchData(["customer"], getCustomer, {} as UserTypes);

export const getCustomerWithId = (userId: number) =>
  getWrapperWthId("users", userId) as Promise<CustommerResponseTypes>;
export const useGetCustomerWithId = (userId: number) =>
  useFetchData(
    ["customerWithId"],
    () => getCustomerWithId(userId),
    {} as CustommerResponseTypes
  );

// Users
export const getUsers = () => getHomePageWrapper("users/with-skills?size=5");
export const useGetUsers = () =>
  useFetchData<SolutionistResponseTypes[]>(["users-with-skills"], getUsers, []);

export const getSolutionistWithIdAndSkillId = (
  solutionistId: number,
  skillId: number
) => getWrapperDataWithIds("solutionist", solutionistId, skillId);
export const useGetSolutionistWithIdAndSkillId = (
  solutionistId: number,
  skillId: number
) =>
  useFetchData(
    ["Solutionist-With-Id-And-Skill-Id"],
    () => getSolutionistWithIdAndSkillId(solutionistId, skillId),
    {} as SolutionistResponseTypes
  );

// Countries
export const getCountries = () => fetchData<CountryTypes[]>("country-features");
export const useGetCountries = () =>
  useFetchData(["countries"], getCountries, []);

// Orders
export const getOrders = () => fetchData<OrderTypes[]>("orders");
export const useGetOrders = () => useFetchData(["orders"], getOrders, []);

export const getOrdersWithSolutionistId = (userId: number) =>
  getWrapperWthId("orders/contractor", userId);
export const useGetOrdersWithSolutionistId = (userId: number) =>
  useFetchData(
    ["ordersWithSolutionistId"],
    () => getOrdersWithSolutionistId(userId),
    []
  );

// Search Term Result
export const getUserSearchResult = (searchTerm: string) =>
  getWrapperSearchTerm("skills", searchTerm);
export const useGetUserSearchResult = (searchTerm: string) =>
  useFetchData(["search-result"], () => getUserSearchResult(searchTerm), []);

// Job Posting
export const getJobPosting = (page: number, size: number) =>
  getHomePageWrapper(
    `job-postings/valid-listed-jobs?page=${page}&size=${size}`
  );
export const useJobPosting = (page: number, size: number) =>
  useFetchData<JobPosting[]>(
    ["valid-listed-jobs"],
    () => getJobPosting(page, size),
    []
  );

export const getJobPostingByJobId = (id: number) =>
  getWrapperWthId("job-postings", id);
export const useJobPostingByJobId = (id: number) =>
  useFetchData<JobPosting | FullJobPostingDetails>(
    ["job-postings-by-job-Id"],
    () => getJobPostingByJobId(id),
    {} as JobPosting | FullJobPostingDetails
  );

export const getJobPostingByCustomerId = (id: number) =>
  getWrapperWthId("job-postings/customer", id);
export const useJobPostingByCustomerId = (id: number) =>
  useFetchData(
    ["job-posted-by-customer-Id"],
    () => getJobPostingByCustomerId(id),
    []
  );

export const getJobPostingSearchResult = (searchTerm: string) =>
  getWrapperSearchTerm("job-postings", searchTerm);
export const useGetJobPostingSearchResult = (searchTerm: string) =>
  useFetchData(
    ["job-postings-search-result"],
    () => getJobPostingSearchResult(searchTerm),
    []
  );

// No License Permit Verification Service
export const getNoLicensePermitVerificationService = () =>
  fetchData<NoLicensePermitVerificationServiceTypes[]>(
    "no-verification-services"
  );
export const useNoLicensePermitVerificationService = () =>
  useFetchData(
    ["no-license-permit-verification-service"],
    getNoLicensePermitVerificationService,
    []
  );

// Tool Rentals
export const getToolRentalListing = (page: number, size: number) =>
  getHomePageWrapper(`tools/available?page=${page}&size=${size}`);
export const useToolRentalListing = (
  isEnabled: boolean,
  page: number,
  size: number
) =>
  useQuery<ToolRentalListing[]>({
    queryKey: ["tools-available"],
    queryFn: () => getToolRentalListing(page, size),
    placeholderData: [],
    enabled: isEnabled,
  });

export const getToolCustomerWithId = (
  userId: number,
  toolId: number
): Promise<ToolAndCustomerTypes> => getWrapperWthIds("tools", userId, toolId);
export const useGetToolRentalListingWithId = (userId: number, toolId: number) =>
  useFetchData(
    ["tool-customer-with-toolId"],
    () => getToolCustomerWithId(userId, toolId),
    {} as ToolAndCustomerTypes
  );

// Tool Rental Order History
export const getToolsRentalHistoryByCustomerId = (id: number) =>
  getWrapperWthId("tools-rental-order-history/customer", id);
export const useToolsRentalHistoryByCustomerId = (id: number) =>
  useFetchData(
    ["tools-rental-order-history"],
    () => getToolsRentalHistoryByCustomerId(id),
    []
  );

export const getToolsRentalHistoryByOrderId = (id: number) =>
  getWrapperWthId("tools-rental-order-history", id);
export const useToolsRentalHistoryByOrderId = (id: number) =>
  useFetchData(
    [`order-id-${id}`],
    () => getToolsRentalHistoryByOrderId(id),
    {} as FullPaymentDetailsDTO
  );
