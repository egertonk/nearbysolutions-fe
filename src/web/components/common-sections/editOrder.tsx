import { useEffect, useState } from "react";
import { breakUpDate, compareDates, talentScheduleData } from "../../lib";
import { useNavigate } from "react-router-dom";
import { CalenderForm } from "./calenderForm";
import { useCalenderStates } from "../../lib/useCalenderStates";
import { Calender } from "./calender";
import { DatePicker } from "./datePicker";

type Props = {
  orderNumber: number;
};

export const EditOrder: React.FC<Props> = ({ orderNumber }) => {
  const today = new Date();

  const navigate = useNavigate();

  const {
    showNextMonth,
    setShowNextMonth,
    userSelectedDate,
    userSelectedTime,
    updateDateSelection,
    currentMonthSelection,
    currentYearSelection,
    formattedDate,
    handleChangeTime,
    isCurrentMonth,
    setUserSelectedDate,
    setUserSelectedTime,
  } = useCalenderStates();

  const order = talentScheduleData.find(
    (data) => data.orderNumber === orderNumber
  ); // Todo: use this to get customer previous order to edit

  const handleSubmit = (selectedTalent: string, taskForTalent: string) => {
    console.log("selectedTalent edit ", selectedTalent);
    console.log("taskForTalent edit ", taskForTalent);

    // submit to database and navig

    navigate("/order-summary?edited");
  };

  const oldDate = breakUpDate(order?.orderDate);
  const oldDateString = `${oldDate?.month}/${oldDate?.day}/${oldDate?.year}`;
  const currentDateString = `${
    today.getUTCMonth() + 1 === 12 ? 1 : today.getUTCMonth() + 1
  }/${today.getDate()}/${today.getFullYear()}`;

  const isDateChangeAllow = compareDates(oldDateString, currentDateString);

  console.log("userSelectedDate ", userSelectedDate);
  console.log("oldDateString ", oldDateString);
  console.log("currentDateString ", currentDateString);

  useEffect(() => {
    if (oldDate) {
      setUserSelectedDate({
        day: Number(oldDate?.day),
        month: oldDate?.month?.toString(),
        year: Number(oldDate?.year),
      });
      if (order !== undefined) setUserSelectedTime(order?.customerStartTime);
    }
  }, []);

  return (
    <>
      <form className="md:p-8 p-5 dark:bg-gray-800 bg-white rounded-t auto-cols-max ">
        <CalenderForm
          order={order || undefined}
          userSelectedDate={userSelectedDate}
          isEditOrder={true}
          handleSubmit={handleSubmit}
          userSelectedTime={userSelectedTime}
        />
      </form>

      <div className="flex flex-col lg:flex-row justify-center">
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
          date={today.getDate()}
          isCurrentMonth={isCurrentMonth}
          userSelectedTime={userSelectedTime}
          userSelectedDate={userSelectedDate}
          handleChangeTime={handleChangeTime}
          isTimeChangeAllow={isDateChangeAllow}
        />
      </div>
    </>
  );
};
