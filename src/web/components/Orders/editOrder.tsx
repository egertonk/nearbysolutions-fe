import { ChangeEvent, SetStateAction, useEffect, useState } from "react";
import {
  breakUpDate,
  compareDates,
  talentInformation,
  talentScheduleData,
} from "../../lib";
import { useNavigate } from "react-router-dom";
import { useCalenderStates } from "../../lib/useCalenderStates";
import { CalenderForm } from "../common-sections/calenderForm";
import { Calender } from "../common-sections/calender";
import { DatePicker } from "../common-sections/datePicker";

type Props = {
  orderNumber: number;
};

export const EditOrder: React.FC<Props> = ({ orderNumber }) => {
  const today = new Date();

  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);

  const {
    showNextMonth,
    setShowNextMonth,
    userSelectedDate,
    userSelectedTime,
    updateDateSelection,
    currentMonthSelection,
    currentYearSelection,
    formattedDate,
    isCurrentMonth,
    setUserSelectedDate,
    setUserSelectedTime,
  } = useCalenderStates();

  const order = talentScheduleData.find(
    (data) => data.orderNumber === orderNumber
  ); // Todo: use this to get customer previous order to edit

  const talent = talentInformation.find(
    (talent) => talent.talentID === order?.talentID
  );

  const jobDetails = talent?.jobTitlesPrice.find(
    (price) => price.selectedStatus
  );

  const jobTitle =
    order !== undefined ? order?.jobTitle : talent?.jobTitlesPrice[0].title;
  const [selectedTalent, setSelectedTalent] = useState(jobTitle || "");

  const handleSubmit = () => {
    // console.log("selectedTalent edit ", selectedTalent);
    // console.log("taskForTalent edit ", taskForTalent);

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
      <div className="flex flex-col lg:flex justify-center">
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
          userSelectedDate={userSelectedDate}
          isTimeChangeAllow={isDateChangeAllow}
          updateSolutionDetails={function (id: string, value: string): void {
            throw new Error("Function not implemented.");
          }}
          formData={{
            customerID: "",
            firstName: "",
            lastName: "",
            country: "",
            address: "",
            city: "",
            state: "",
            zip: "",
            selectedTalent: "",
            phoneNumber: "",
            solutionFormattedDate: formattedDate || "",
            solutionDate: "",
            solutionStartTime: "",
            solutionTask: "",
            solutionJob: "",
            talentID: 0,
            talentFirstName: "",
            talentLastName: "",
          }}
          setShowCustomerForm={function (value: SetStateAction<boolean>): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>

      <form className="md:p-8 p-5 dark:bg-gray-800 bg-white rounded-t auto-cols-max">
        <CalenderForm
          order={order || undefined}
          isEditOrder={true}
          handleSubmit={handleSubmit}
          selectedTalent={selectedTalent}
          setSelectedTalent={setSelectedTalent}
          jobDetails={jobDetails}
          formData={{
            customerID: "", // we can generated it later and it should never be null
            firstName: "",
            lastName: "",
            country: "",
            address: "",
            city: "",
            state: "",
            zip: "",
            phoneNumber: "",
            solutionFormattedDate: "",
            solutionDate:
              userSelectedDate !== undefined
                ? `${userSelectedDate?.day}/${userSelectedDate?.month}/${userSelectedDate?.year}`
                : "",
            solutionTask: "",
            solutionJob: jobDetails?.title || "",
            solutionStartTime: userSelectedTime || "",
            selectedTalent: "",
            talentID: talent?.talentID || 0, // it should never be null
            talentFirstName: talent?.firstName || "",
            talentLastName: talent?.lastName || "",
          }}
          handleChange={function (
            e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
          ): void {
            throw new Error("Function not implemented.");
          }}
          isError={isError}
          updateSolutionDetails={function (id: string, value: string): void {
            throw new Error("Function not implemented.");
          }}
        />
      </form>
    </>
  );
};
