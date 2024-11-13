import { CustomerFormData } from "../../../lib/types/OrderSolutionTypes";
import { OrderTypes } from "../../all-types/orderTypes";

export type DateSelection = {
  day: number;
  month: string;
  year: number;
};

export type TimeProps = {
  requiredData: {
    date: number;
    userSelectedDate: DateSelection;
    isCurrentMonth: boolean;
    solutionStartTimes: string[];
  };
  previousDateCheck: {
    isPreviousCurrentDatesMonthYear: boolean;
    dateUpdate: {
      day: number;
      month: string;
      year: number;
    };
  };
  isTimeChangeAllow?: any;
  filteredOrders: CustomerFormData[];
  ordersGreaterThanTodaysDate: OrderTypes[] | [];
};

export type weeksArrayTypes = {
  weeksArray: {
    day: number;
    dayTitle: string;
  }[][];
  month: string;
  year: number;
};

export type DateParts = {
  month: string;
  day: number;
  year: number;
};

export type WeeksData = {
  weeksArray: {
    day: number;
    dayTitle: string;
  }[][];
  month: string | "";
  year: number | 0;
};
