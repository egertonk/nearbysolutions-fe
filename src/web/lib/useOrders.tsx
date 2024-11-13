import { useEffect, useState } from "react";
import { CustomerFormData } from "./types/OrderSolutionTypes";
import { customerOrderHistory } from ".";
import { setCustomerOrder } from "../../store/customerContractorSlice";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { DateSelection } from "../components/customer-calender-time/types/CalenderTypes";

export const orderSortList = [
  "Order ID",
  "City",
  "State",
  "Talent ID",
  "Status",
  "Gift",
  "Price",
  "Date",
];

export const useOrders = (
  userSelectedDate?: DateSelection,
  appSection?: string
) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchId, setSearchId] = useState<number>();
  const [filteredOrders, setFilteredOrders] =
    useState<CustomerFormData[]>(customerOrderHistory);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchId(Number(value));
    if (value.length === 0) setFilteredOrders(customerOrderHistory);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchId(Number(term));
    if (term === "") {
      setFilteredOrders(customerOrderHistory);
    } else {
      const filtered = customerOrderHistory.filter(
        (order) => order.orderID === Number(term)
      );
      setFilteredOrders(filtered);
    }
  };

  const handleSubmit = () => {
    if (customerOrderHistory.length > 0) {
      const matchJobs = customerOrderHistory.filter(
        (job) => job.orderID === searchId
      );
      setFilteredOrders(matchJobs);
    }
  };

  const [sortDirections, setSortDirections] = useState<{
    [key: string]: string;
  }>({
    orderID: "asc",
    city: "asc",
    state: "asc",
    talentID: "asc",
    orderStatus: "asc",
    giftStatus: "asc",
    solutionPrice: "asc",
    orderDate: "asc",
  });

  const getVariableName = (name: string) => {
    if (orderSortList[0] === name) return "orderID";
    if (orderSortList[1] === name) return "city";
    if (orderSortList[2] === name) return "state";
    if (orderSortList[4] === name) return "talentID";
    if (orderSortList[5] === name) return "orderStatus";
    if (orderSortList[6] === name) return "giftStatus";
    if (orderSortList[7] === name) return "solutionPrice";
    if (orderSortList[8] === name) return "orderDate";
    return "";
  };

  const handleSort = (sortType: string) => {
    const correctNameType = getVariableName(sortType);
    const sortOrder = sortDirections[correctNameType] === "asc" ? 1 : -1;

    const sortFunctions: { [key: string]: (a: any, b: any) => number } = {
      orderID: (a, b) => (a.orderID - b.orderID) * sortOrder,
      city: (a, b) => a.city.localeCompare(b.city) * sortOrder,
      state: (a, b) => a.state.localeCompare(b.state) * sortOrder,
      talentID: (a, b) => (a.talentID - b.talentID) * sortOrder,
      orderStatus: (a, b) =>
        (a.orderStatus === b.orderStatus ? 0 : a.orderStatus ? -1 : 1) *
        sortOrder,
      giftStatus: (a, b) =>
        (a.giftStatus === b.giftStatus ? 0 : a.giftStatus ? -1 : 1) * sortOrder,
      solutionPrice: (a, b) => (a.solutionPrice - b.solutionPrice) * sortOrder,
      orderDate: (a, b) =>
        (new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime()) *
        sortOrder,
    };

    const sortedOrders = [...filteredOrders].sort(
      sortFunctions[correctNameType]
    );

    setFilteredOrders(sortedOrders);
    setSortDirections({
      ...sortDirections,
      [correctNameType]:
        sortDirections[correctNameType] === "asc" ? "desc" : "asc",
    });
  };

  const handleEdit = (orderNumber: number) => {
    const foundOrder = customerOrderHistory.find((oldOrder) => {
      return oldOrder?.orderID?.toString() === orderNumber?.toString();
    });

    if (foundOrder !== undefined) {
      // dispatch(setIsEditOrder(true));
      dispatch(setCustomerOrder(foundOrder));
    }
    navigate("/edit-order");
  };

  const normalizeDateString = (dateStr: string): string => {
    return dateStr.trim().toLowerCase();
  };

  const areDatesEqual = (dateStr1: string, dateStr2: string): boolean => {
    return normalizeDateString(dateStr1) === normalizeDateString(dateStr2);
  };

  const filterAndSortOrders = (
    orders: CustomerFormData[],
    targetDate: string
  ) => {
    // Filter orders by the target solutionDate
    const filteredOrders = orders.filter((order) => {
      return areDatesEqual(order.solutionDateContract.solutionDate, targetDate);
    });

    // Sort orders by solutionStartTime in AM to PM order
    const sortedOrders = filteredOrders.sort((a, b) => {
      const parseTime = (time: string) => {
        const [hours, minutes, period] = time
          .match(/(\d+):(\d+) (\w+)/)!
          .slice(1);
        return (
          (period === "PM" ? 12 : 0) +
          (hours === "12" ? 0 : parseInt(hours, 10)) * 60 +
          parseInt(minutes, 10)
        );
      };
      return (
        parseTime(a.solutionDateContract.solutionStartTime) -
        parseTime(b.solutionDateContract.solutionStartTime)
      );
    });

    setFilteredOrders(sortedOrders);
  };

  useEffect(() => {
    const extraZero =
      userSelectedDate?.day.toLocaleString().length === 1
        ? `0${userSelectedDate?.day}`
        : userSelectedDate?.day;

    filterAndSortOrders(
      customerOrderHistory,
      `${userSelectedDate?.month}/${extraZero}/${userSelectedDate?.year}`
    );
  }, []);

  return {
    handleSearch,
    handleSubmit,
    handleSort,
    customerOrderHistory,
    filterAndSortOrders,
    filteredOrders,
    setFilteredOrders,
    searchId,
    setSearchId,
    handleOnChange,
    handleEdit,
    sortDirections,
    setSortDirections,
  };
};
