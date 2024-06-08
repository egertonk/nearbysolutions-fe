import { SetStateAction, useEffect, useState } from "react";
import {
  breakUpDate,
  compareDates,
  talentInformation,
  customerOderHistory,
} from "../../lib";
import { useNavigate } from "react-router-dom";
import { useCalenderStates } from "../../lib/useCalenderStates";
import { CalenderForm } from "../common-sections/calenderForm";
import { useCustomerPersonalInfoForm } from "../../lib/useCustomerPersonalInfoForm";
import { CustomerOrder } from "../../lib/types/orderTypes";
import { DateTimeSelection } from "../Hire-A-Talent/DateTimeSelection";

type Props = {
  orderNumber: number;
};

export const EditOrder: React.FC<Props> = ({ orderNumber }) => {
  const today = new Date();

  const navigate = useNavigate();

  const {
    userSelectedDate,
    formattedDate,
    setUserSelectedDate,
    setUserSelectedTime,
  } = useCalenderStates();

  const order = customerOderHistory.find(
    (data) => data.orderID === orderNumber
  ) as CustomerOrder; // Todo: use this to get customer previous order to edit

  const talent = talentInformation.find(
    (talent) => talent.talentID === order?.talentID
  );

  const jobDetails = talent?.jobTitlesPrice.find(
    (price) => price.selectedStatus
  );

  const jobTitle =
    order !== undefined ? order?.solutionJob : talent?.jobTitlesPrice[0].title;
  const [selectedTalent, setSelectedTalent] = useState(jobTitle || "");

  const handleSubmit = () => {
    // submit to database and navig
    console.log("/view-order-history");
    console.log("customerOderHistory ", customerOderHistory);
    navigate("/view-order-history");
  };

  const oldDate = breakUpDate(order?.orderDate);
  const oldDateString = `${oldDate?.month}/${oldDate?.day}/${oldDate?.year}`;
  const currentDateString = `${
    today.getUTCMonth() + 1 === 12 ? 1 : today.getUTCMonth() + 1
  }/${today.getDate()}/${today.getFullYear()}`;

  const isDateChangeAllow = compareDates(oldDateString, currentDateString);

  const { formData } = useCustomerPersonalInfoForm(
    talent,
    jobDetails,
    order?.solutionJob,
    setSelectedTalent,
    order?.solutionStartTime,
    formattedDate
  );

  useEffect(() => {
    if (oldDate) {
      setUserSelectedDate({
        day: Number(oldDate?.day),
        month: oldDate?.month?.toString(),
        year: Number(oldDate?.year),
      });
      if (order !== undefined) setUserSelectedTime(order?.solutionStartTime);
    }
  }, []);

  return (
    <>
      <div className="flex flex-col lg:flex justify-center">
        <DateTimeSelection
          isDateChangeAllow={isDateChangeAllow}
          isTimeChangeAllow={isDateChangeAllow}
          formData={formData}
        />
      </div>

      <form className="md:p-8 p-5 dark:bg-gray-800 bg-white rounded-t auto-cols-max">
        <CalenderForm />
      </form>
    </>
  );
};
