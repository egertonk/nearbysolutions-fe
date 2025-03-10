import { useDispatch, useSelector } from "react-redux";
import { monthNames, priceWithComma } from "../../lib";
import { useCalenderStates } from "../../lib/useCalenderStates";
import { orderSortList, useOrders } from "../../lib/useOrders";
import { SortData } from "../common-sections/SortData";
import { TableHeader } from "../common-sections/TableHeader";
import { Calender } from "./calender";
import { Timeicker } from "./timeicker";
import { RootState } from "../../../store";
import { setCustomerOrder } from "../../../store/customerContractorSlice";
import { SolutionistResponseTypes } from "../../lib/types/solutionistTypes";
import { defaultWeeksData, extractDateParts } from "./data-setup";
import { useState } from "react";
import { DateSelection, WeeksData } from "../../lib/types/CalenderTypes";
import { OrderTypes } from "../../lib/types/orderTypes";

type Props = {
  solutionistOrders: OrderTypes[] | [];
  customerSolutionistDetails: SolutionistResponseTypes;
  isTimeChangeAllow?: boolean;
  isDateChangeAllow?: boolean;
};

export const DateTimeSelection: React.FC<Props> = ({
  customerSolutionistDetails,
  solutionistOrders,
}) => {
  const dispatch = useDispatch();
  const [weeksArray, setWeeksArray] = useState<WeeksData>(defaultWeeksData);

  const customerOrder = useSelector(
    (state: RootState) => state.formData.customerOrder
  );

  const customerID = 78901; // From api profile
  const defaultDateSelected = {
    month: "",
    day: 0,
    year: 0,
  };

  const {
    showNextMonth,
    updateDateSelection,
    currentMonthSelection,
    currentYearSelection,
    date,
    isCurrentMonth,
  } = useCalenderStates(customerSolutionistDetails);

  const ordersGreaterThanTodaysDate = Array.isArray(solutionistOrders)
    ? solutionistOrders.filter((data) => {
        return data?.startDate && new Date(data.startDate) > new Date();
      })
    : [];

  const dateSelectedByUser = extractDateParts(
    customerOrder.solutionDateContract.solutionDate
  );

  const { handleSort, filteredOrders, handleEdit, filterAndSortOrders } =
    useOrders(
      dateSelectedByUser !== null
        ? dateSelectedByUser
        : {
            day: date,
            month: currentMonthSelection,
            year: currentYearSelection,
          },
      "dateSearch"
    );

  const solutionStartTimes = filteredOrders.map(
    (order) => order.solutionDateContract.solutionStartTime
  );
  const previousDate = new Date(
    customerOrder.solutionDateContract.solutionDate
  );

  const dateUpdate = {
    day: Number(previousDate.getDate()),
    month:
      monthNames[
        previousDate.getMonth() + 1 === 13 ? 12 : previousDate.getMonth()
      ],
    year: Number(previousDate.getFullYear()),
  };

  const isPreviousCurrentDatesMonthYear =
    dateUpdate.month === currentMonthSelection &&
    dateUpdate.year === currentYearSelection; //

  const getDayName = (dateStr: string): string => {
    const parts = dateStr.split("/");
    if (parts.length === 3) {
      const [month, day, year] = parts;
      const date = new Date(`${month} ${day}, ${year}`);
      const options: Intl.DateTimeFormatOptions = { weekday: "long" };
      return date.toLocaleDateString("en-US", options);
    }
    return "";
  };

  const updateStore = (defaultValueDate?: DateSelection) => {
    const extraZero =
      defaultValueDate?.day.toLocaleString().length === 1
        ? `0${defaultValueDate?.day}`
        : defaultValueDate?.day;

    const solutionDate = `${defaultValueDate?.month}/${extraZero}/${defaultValueDate?.year}`;
    const dateSelectedByUser = extractDateParts(solutionDate || "");
    const userDate = new Date(
      `${dateSelectedByUser?.month} ${dateSelectedByUser?.day}, ${dateSelectedByUser?.year}`
    );

    const dayName = getDayName(
      `${dateSelectedByUser?.day}/${dateSelectedByUser?.month}/${dateSelectedByUser?.year}`
    );

    const formattedDate = `${dayName} ${dateSelectedByUser?.day} ${dateSelectedByUser?.month} ${dateSelectedByUser?.year}`;

    const updatedOrder = {
      ...customerOrder,
      solutionDateContract: {
        ...customerOrder.solutionDateContract,
        solutionDate: solutionDate || "",
        solutionFormattedDate: formattedDate,
      },
    };

    dispatch(setCustomerOrder(updatedOrder));

    // filterAndSortOrders(customerOrderHistory, solutionDate);
  };

  return (
    <>
      <Calender
        currentMonthYear={{
          showMonth: currentMonthSelection,
          showYear: currentYearSelection,
        }}
        showNextMonth={showNextMonth}
        updateDateSelection={updateDateSelection}
        userSelectedDate={
          dateSelectedByUser !== null ? dateSelectedByUser : defaultDateSelected
        }
        updateStore={updateStore}
        customerSolutionistDetails={customerSolutionistDetails}
        weeksArray={weeksArray}
        setWeeksArray={setWeeksArray}
      />

      <Timeicker
        requiredData={{
          date,
          userSelectedDate:
            dateSelectedByUser !== null
              ? dateSelectedByUser
              : defaultDateSelected,
          isCurrentMonth,
          solutionStartTimes,
        }}
        previousDateCheck={{ isPreviousCurrentDatesMonthYear, dateUpdate }}
        filteredOrders={filteredOrders}
        ordersGreaterThanTodaysDate={ordersGreaterThanTodaysDate}
        weeksArray={weeksArray}
        customerSolutionistDetails={customerSolutionistDetails}
      />

      {filteredOrders.length > 0 && (
        <div className="px-4 mt-5 rounded-b">
          <SortData sortList={orderSortList} handleSort={handleSort} />
          <div className="justify-center mt-4">
            {filteredOrders.map((order, index) => (
              <>
                <div
                  className="mx-auto border-purple-500 border rounded-sm mb-2 h-30 "
                  key={`1-${index}`}
                >
                  <div
                    className="rounded-t auto-cols-max items-center"
                    key={`2-${index}`}
                  >
                    <TableHeader
                      itemIndex={index}
                      itemStatus={order.orderStatus}
                      isOrder={true}
                      itemsTotal={filteredOrders.length}
                      handleEdit={handleEdit}
                      appSection="dateSearch"
                    />

                    <div
                      className="px-4 md:flex flex-row items-center border-t-8 border-purple-600"
                      key={`3-${index}`}
                    >
                      <div className="w-full md:w-60 text-center md:text-left mr-2">
                        {customerID === order.customerInfo.id && (
                          <>
                            <div className="text-sm">
                              <span className="text-base font-semibold">
                                Order Id:
                              </span>{" "}
                              {order.orderID}
                            </div>
                            <div className="text-sm">
                              <span className="text-base font-semibold">
                                Customer Name:
                              </span>{" "}
                              {`${order.customerInfo.firstName} ${order.customerInfo.lastName}`}
                            </div>{" "}
                          </>
                        )}

                        <div className="text-sm">
                          <span className="text-base font-semibold">
                            Start Time:
                          </span>{" "}
                          {order.solutionDateContract.solutionStartTime}
                        </div>

                        {customerID === order.customerInfo.id ? (
                          <div className="text-sm">
                            <span className="text-base font-semibold">
                              Location:
                            </span>{" "}
                            {`${order.customerAddress.street}`}
                            <p>{`${order.customerAddress.city}, ${order.customerAddress.state}, ${order.customerAddress.postalCode}.`}</p>
                          </div>
                        ) : (
                          <div className="text-sm">
                            <span className="text-base font-semibold">
                              Location:
                            </span>{" "}
                            {`${order.customerAddress.city}, ${order.customerAddress.state}.`}
                          </div>
                        )}
                      </div>

                      <div className="w-full md:w-60  text-center m-1 md:text-left">
                        <div className="text-sm">
                          <span className="text-base font-semibold">
                            Talent Job:
                          </span>{" "}
                          {order.solutionJob}
                        </div>

                        <div className="text-sm">
                          <span className="text-base font-semibold">
                            Solutionist Name:
                          </span>{" "}
                          {order.selectedTalent}
                        </div>

                        {customerID === order.customerInfo.id && (
                          <>
                            <div className="text-sm">
                              <span className="text-base font-semibold">
                                Order Date:
                              </span>{" "}
                              {order.orderDate}
                            </div>

                            <div className="text-sm">
                              <span className="text-base font-semibold">
                                Task Description:
                              </span>{" "}
                              {order.solutionTask}
                            </div>

                            <div className="text-sm">
                              <span className="text-base font-semibold">
                                Price
                              </span>{" "}
                              {priceWithComma(order.solutionPrice || "")}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
