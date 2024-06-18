import { priceWithComma } from "../../lib";
import { useCalenderStates } from "../../lib/useCalenderStates";
import { orderSortList, useOrders } from "../../lib/useOrders";
import { SortData } from "../common-sections/SortData";
import { TableHeader } from "../common-sections/TableHeader";
import { Calender } from "../common-sections/calender";
import { DatePicker } from "../common-sections/datePicker";

type Props = {
  isTimeChangeAllow?: boolean;
  isDateChangeAllow?: boolean;
};

export const DateTimeSelection: React.FC<Props> = ({ isDateChangeAllow }) => {
  const customerID = 78901; // From api profile
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

  const { handleSort, filteredOrders, handleEdit } = useOrders(
    userSelectedDate,
    "dateSearch"
  );

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

      {filteredOrders.length > 0 && (
        <div className="px-2 rounded-b">
          <SortData sortList={orderSortList} handleSort={handleSort} />
          <div className="justify-center ">
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
                      itemindex={index}
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
                        {customerID === order.customerID && (
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
                              {`${order.firstName} ${order.lastName}`}
                            </div>{" "}
                          </>
                        )}

                        <div className="text-sm">
                          <span className="text-base font-semibold">
                            Start Time:
                          </span>{" "}
                          {order.solutionStartTime}
                        </div>

                        {customerID === order.customerID ? (
                          <div className="text-sm">
                            <span className="text-base font-semibold">
                              Location:
                            </span>{" "}
                            {`${order.address}`}
                            <p>{`${order.city}, ${order.state}, ${order.zip}.`}</p>
                          </div>
                        ) : (
                          <div className="text-sm">
                            <span className="text-base font-semibold">
                              Location:
                            </span>{" "}
                            {`${order.city}, ${order.state}.`}
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

                        {customerID === order.customerID && (
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
