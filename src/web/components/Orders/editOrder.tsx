import { useEffect } from "react";
import { breakUpDate, compareDates, customerOrderHistory } from "../../lib";
import { useCalenderStates } from "../../lib/useCalenderStates";
import { CustomerOrder } from "../../lib/types/orderTypes";
import { DateTimeSelection } from "../Hire-A-Talent/DateTimeSelection";
import { MainTitle } from "../common-sections/MainTitle";

export const EditOrder: React.FC = () => {
  const today = new Date();

  const { setUserSelectedDate, setUserSelectedTime } = useCalenderStates();

  const order = customerOrderHistory.find(
    (data) => data.orderID === 0
  ) as CustomerOrder; // Todo: use this to get customer previous order to edit

  const oldDate = breakUpDate(order?.orderDate);
  const oldDateString = `${oldDate?.month}/${oldDate?.day}/${oldDate?.year}`;
  const currentDateString = `${
    today.getUTCMonth() + 1 === 12 ? 1 : today.getUTCMonth() + 1
  }/${today.getDate()}/${today.getFullYear()}`;

  const isDateChangeAllow = compareDates(oldDateString, currentDateString);

  // useEffect(() => {
  //   if (oldDate) {
  //     setUserSelectedDate({
  //       day: Number(oldDate?.day),
  //       month: oldDate?.month?.toString(),
  //       year: Number(oldDate?.year),
  //     });
  //     if (order !== undefined) setUserSelectedTime(order?.solutionStartTime);
  //   }
  // }, []);

  return (
    <>
      <MainTitle title="Editing Order" />

      <div className="flex flex-col lg:flex-row justify-center">
        <DateTimeSelection
          isDateChangeAllow={isDateChangeAllow}
          isTimeChangeAllow={isDateChangeAllow}
        />
      </div>
    </>
  );
};
