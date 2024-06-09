import { useCalenderStates } from "../../lib/useCalenderStates";
import { Calender } from "../common-sections/calender";
import { DatePicker } from "../common-sections/datePicker";

type Props = {
  isTimeChangeAllow?: boolean;
  isDateChangeAllow?: boolean;
};

export const DateTimeSelection: React.FC<Props> = ({ isDateChangeAllow }) => {
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
        formattedDate={formattedDate}
      />

      <DatePicker
        formattedDate={formattedDate}
        date={date}
        isCurrentMonth={isCurrentMonth}
        userSelectedDate={userSelectedDate}
      />
    </>
  );
};
