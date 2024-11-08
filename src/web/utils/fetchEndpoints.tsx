import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getWrapper, getWrapperWthId } from "./fetchGet";
import {
  talentPlaceHolderData,
  TalentTypes,
} from "../components/talent/talentTypes";

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

// User
export const getUser = async (): Promise<TalentTypes[]> => {
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
export const getUserWithId = (userId: number): Promise<TalentTypes> => {
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
