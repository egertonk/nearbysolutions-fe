import { CustomerFormData } from "./OrderSolutionTypes";
import { OrderTypes } from "./orderTypes";
import { SolutionistResponseTypes } from "./solutionistTypes";

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
  weeksArray: WeeksData;
  customerSolutionistDetails: SolutionistResponseTypes;
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
