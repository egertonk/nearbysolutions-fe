import { useState } from "react";
import { DateSelection } from "../../lib/types/calenderTypes";
import { talentInformation, talentProfile } from "../../lib";
import { Order } from "../../lib/types/orderTypes";

type Props = {
  userSelectedDate: DateSelection | undefined;
  userSelectedTime: string;
  talentID?: number;
  isEditOrder?: boolean;
  order?: Order;
  handleSubmit: (selectedTalent: string, taskForTalent: string) => void;
};

export const CalenderForm: React.FC<Props> = ({
  userSelectedDate,
  userSelectedTime,
  talentID,
  isEditOrder,
  order,
  handleSubmit,
}) => {
  const talent = talentInformation.find(
    (talent) => talent.talentID === talentID
  ); // Todo: use this to get talent talentInformation - when comming from order Sumarry

  const jobTitle = order !== undefined ? order?.jobTitle : talent?.jobTitles[0];
  const [selectedTalent, setSelectedTalent] = useState(jobTitle || "");

  const task = order !== undefined ? order?.userTaskDescription : "";
  const [taskForTalent, setTaskForTalentt] = useState(task);

  return (
    <>
      {isEditOrder ||
      (userSelectedDate !== undefined &&
        userSelectedTime !== undefined &&
        userSelectedTime.length > 0) ? (
        <>
          <div className="justify-center -mx-3 mb-1">
            <p className="text-gray-900 dark:text-white text-base font-medium mb-3 text-center font-heading text-purple-800">
              {`Talent Name: ${
                isEditOrder ? order?.fullName : talent?.fullName
              }`}
            </p>
            <p className="flex justify-center text-gray-900 dark:text-white text-base font-medium mb-3 text-center font-heading">
              {`Date: ${userSelectedDate?.month}-${userSelectedDate?.day}-${userSelectedDate?.year} | Time: ${userSelectedTime}`}
            </p>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                htmlFor="Talent"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select Talent
              </label>
              <div className="relative ">
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                  onChange={(e) => setSelectedTalent(e.target.value)}
                  value={selectedTalent}
                >
                  {talentProfile.jobTitles.map((jobTitle) => (
                    <option key={jobTitle}>{jobTitle}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-1">
            <div className="w-full px-3">
              <div>
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Talent Job Task
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write out your solution..."
                  defaultValue={taskForTalent}
                  maxLength={100}
                  onChange={(e) => setTaskForTalentt(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <button
                className="mt-5 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-purple-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none block w-full"
                type="button"
                onClick={() => handleSubmit(selectedTalent, taskForTalent)}
              >
                Submit
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center pb-4">
          <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-purple-800">
            Select a Date and Time
          </h1>
        </div>
      )}
    </>
  );
};
