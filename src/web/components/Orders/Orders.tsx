import { WorkOrderList } from "../common-sections/workOrderList";
import { useState } from "react";
import { SideMenuList } from "../Header/SideMenuList";
import { MainTitle } from "../common-sections/MainTitle";
import { SortData } from "../common-sections/SortData";
import { customerOrderHistory } from "../../lib";

type Props = {
  isOrderSumary?: boolean;
};

export const Orders: React.FC<Props> = ({ isOrderSumary }) => {
  const sortList = [
    "Order ID",
    "City",
    "State",
    "Talent ID",
    "Status",
    "Gift",
    "Price",
    "Date",
  ];

  let pageTile = "";
  const [isEditOrder, setIsEditOrder] = useState(false);
  const [showTalentDetailPage, setShowTalentDetailPage] = useState(false);

  if (isOrderSumary) pageTile = "Order Summary";
  else if (isEditOrder) pageTile = "Editing Order";
  else pageTile = "Order History";

  const [filteredOrders, setFilteredOrders] =
    useState<typeof customerOrderHistory>(customerOrderHistory);
  const [sortDirections, setSortDirections] = useState<{
    [key: string]: string;
  }>({
    orderID: "asc",
    city: "asc",
    state: "asc",
    talentID: "asc",
    orderStatus: "asc",
    giftStatus: "asc",
    solutionPrice: "asc",
    orderDate: "asc",
  });

  const getVariableName = (name: string) => {
    if ("Order ID" === name) return "orderID";
    if ("City" === name) return "city";
    if ("State" === name) return "state";
    if ("Talent ID" === name) return "talentID";
    if ("Status" === name) return "orderStatus";
    if ("Gift" === name) return "giftStatus";
    if ("Price" === name) return "solutionPrice";
    if ("Date" === name) return "orderDate";

    return "";
  };

  const handleSort = (sortType: string) => {
    const correctNameType = getVariableName(sortType);
    const sortOrder = sortDirections[correctNameType] === "asc" ? 1 : -1;

    const sortFunctions: { [key: string]: (a: any, b: any) => number } = {
      orderID: (a, b) => (a.orderID - b.orderID) * sortOrder,
      city: (a, b) => a.city.localeCompare(b.city) * sortOrder,
      state: (a, b) => a.state.localeCompare(b.state) * sortOrder,
      talentID: (a, b) => (a.talentID - b.talentID) * sortOrder,
      orderStatus: (a, b) =>
        (a.orderStatus === b.orderStatus ? 0 : a.orderStatus ? -1 : 1) *
        sortOrder,
      giftStatus: (a, b) =>
        (a.giftStatus === b.giftStatus ? 0 : a.giftStatus ? -1 : 1) * sortOrder,
      solutionPrice: (a, b) => (a.solutionPrice - b.solutionPrice) * sortOrder,
      orderDate: (a, b) =>
        (new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime()) *
        sortOrder,
    };

    const sortedOrders = [...filteredOrders].sort(
      sortFunctions[correctNameType]
    );

    setFilteredOrders(sortedOrders);
    setSortDirections({
      ...sortDirections,
      [correctNameType]:
        sortDirections[correctNameType] === "asc" ? "desc" : "asc",
    });
  };

  return (
    <>
    <div className="px-4 sm:px-10">
        <div className="min-h-[500px]">
          <div className="grid md:grid-cols-2 justify-center items-center gap-10">
            <div className="max-md:order-1">
              <p className="mt-4 mb-2 font-semibold text-blue-600"><span className="rotate-90 inline-block mr-2">|</span> ALL IN
                ONE
                MEETING SCHEDULER</p>
              <h1 className="md:text-5xl text-4xl font-bold mb-4 md:!leading-[55px]">Schedule meetings effortlessly</h1>
              <p className="mt-4 text-base leading-relaxed">Embark on a gastronomic journey with our curated dishes, delivered
                promptly to your doorstep. Elevate your dining experience today. Delve into the details and let us enhance
                every aspect of your dining adventure.</p>
              <div className="bg-white mt-10 flex px-1 py-1.5 rounded-full shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] overflow-hidden">
                <input type="email" placeholder="Search Something..." className="w-full outline-none bg-white pl-4" />
                <button type="button" className="bg-blue-600 hover:bg-blue-700 transition-all text-white rounded-full px-5 py-2.5">Search</button>
              </div>
              <div className="flex items-center mt-10">
                <input id="checkbox3" type="checkbox" className="hidden peer" defaultChecked />
                <label htmlFor="checkbox3" className="relative flex items-center justify-center p-1 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white w-5 h-5 cursor-pointer bg-blue-600 border rounded-full overflow-hidden">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-full fill-white" viewBox="0 0 520 520">
                    <path d="M79.423 240.755a47.529 47.529 0 0 0-36.737 77.522l120.73 147.894a43.136 43.136 0 0 0 36.066 16.009c14.654-.787 27.884-8.626 36.319-21.515L486.588 56.773a6.13 6.13 0 0 1 .128-.2c2.353-3.613 1.59-10.773-3.267-15.271a13.321 13.321 0 0 0-19.362 1.343q-.135.166-.278.327L210.887 328.736a10.961 10.961 0 0 1-15.585.843l-83.94-76.386a47.319 47.319 0 0 0-31.939-12.438z" data-name="7-Check" data-original="#000000" />
                  </svg>
                </label>
                <p className="text-base ml-3">No credit card required!</p>
              </div>
              <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
                <img src="https://readymadeui.com/google-logo.svg" className="w-28 mx-auto" alt="google-logo" />
                <img src="https://readymadeui.com/facebook-logo.svg" className="w-28 mx-auto" alt="facebook-logo" />
                <img src="https://readymadeui.com/linkedin-logo.svg" className="w-28 mx-auto" alt="linkedin-logo" />
                <img src="https://readymadeui.com/pinterest-logo.svg" className="w-28 mx-auto" alt="pinterest-logo" />
              </div>
            </div>
            <div className="max-md:mt-12 h-full">
              <img src="https://readymadeui.com/team-image.webp" alt="banner img" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
      <div className="py-3 px-4 justify-center dark:bg-gray-700 rounded-b">
        <MainTitle title={pageTile} />

        <SortData sortList={sortList} handleSort={handleSort} />

        <div className="flex flex-col lg:flex-row justify-center">
          <SideMenuList
            isEditOrder={isEditOrder}
            setShowTalentDetailPage={setShowTalentDetailPage}
          />

          <WorkOrderList showEdits filteredOrders={filteredOrders} />
        </div>
      </div>
    </>
  );
};
