import { useEffect } from "react";
import { breakUpDate, compareDates } from "../../lib";
import { useCalenderStates } from "../../lib/useCalenderStates";
import { DateTimeSelection } from "../customer-calender-time/DateTimeSelection";
import { MainTitle } from "../common-sections/MainTitle";
import { CustomerFormData } from "../../lib/types/OrderSolutionTypes";

export const EditOrder: React.FC = () => {
  const today = new Date();

  // const { setUserSelectedDate, setUserSelectedTime } = useCalenderStates();

  // const order = customerOrderHistory.find(
  //   (data) => data.orderID === 0
  // ) as CustomerFormData; // Todo: use this to get customer previous order to edit

  // const oldDate = breakUpDate(order?.orderDate);
  // const oldDateString = `${oldDate?.month}/${oldDate?.day}/${oldDate?.year}`;
  const currentDateString = `${
    today.getUTCMonth() + 1 === 12 ? 1 : today.getUTCMonth() + 1
  }/${today.getDate()}/${today.getFullYear()}`;

  const isDateChangeAllow = compareDates("oldDateString", currentDateString);

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
        {/* <DateTimeSelection
          isDateChangeAllow={isDateChangeAllow}
          isTimeChangeAllow={isDateChangeAllow}
        /> */}
      </div>
    </>
  );
};
