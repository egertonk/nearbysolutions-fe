import { CustomerFormData } from "../../lib/types/orderTypes";
import { useCalenderStates } from "../../lib/useCalenderStates";
import { Calender } from "../common-sections/calender";
import { DatePicker } from "../common-sections/datePicker";

type Props = {
  formData: CustomerFormData;
  isTimeChangeAllow?: boolean;
  isDateChangeAllow?: boolean;
};

export const DateTimeSelection: React.FC<Props> = ({
  formData,
  isDateChangeAllow,
}) => {
  const {
    showNextMonth,
    setShowNextMonth,
    userSelectedDate,
    updateDateSelection,
    currentMonthSelection,
    currentYearSelection,
    formattedDate,
    date,
    isCurrentMonth,
  } = useCalenderStates();

  return (
    <>
      <Calender
        fullDate={`${currentMonthSelection} ${currentYearSelection}`}
        setShowNextMonth={setShowNextMonth}
        showNextMonth={showNextMonth}
        updateDateSelection={updateDateSelection}
        currentMonthSelection={currentMonthSelection}
        currentYearSelection={currentYearSelection}
        userSelectedDate={userSelectedDate}
        isDateChangeAllow={isDateChangeAllow}
      />

      <DatePicker
        formattedDate={formattedDate}
        date={date}
        isCurrentMonth={isCurrentMonth}
        formData={formData}
        userSelectedDate={userSelectedDate}
      />
    </>
  );
};
