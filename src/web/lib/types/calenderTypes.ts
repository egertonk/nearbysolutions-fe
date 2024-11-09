import { CustomerFormData } from "./OrderSolutionTypes";

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
    setIsCalenderReady: React.Dispatch<React.SetStateAction<boolean>>;
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
};

export type weeksArrayTypes = {
  weeksArray: {
    day: number;
    dayTitle: string;
  }[][];
  month: string;
  year: number;
};
