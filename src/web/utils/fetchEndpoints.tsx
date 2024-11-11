import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getWrapper, getWrapperWthId } from "./fetchGet";
import {
  SolutionistTypes,
  talentPlaceHolderData,
} from "../components/all-types/solutionistTypes";
import { CustomerDetailsTypes } from "../../store/customerDetailsSlice";
import { CountryTypes } from "../components/all-types/countryTypes";

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
