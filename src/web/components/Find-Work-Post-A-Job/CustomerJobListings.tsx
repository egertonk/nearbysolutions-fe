import { MainTitle } from "../common-sections/MainTitle";
import { SortData } from "../common-sections/SortData";
import { useFindWorkPostAJob } from "../../lib/useFindWorkPostAJob";
import { SideMenuList } from "../Header/SideMenuList";
import { priceWithComma } from "../../lib";
import { TableHeader } from "../common-sections/TableHeader";
import { SearchUI } from "../search/SearchUI";

type Props = {
  isOrderSumary?: boolean;
};

export const CustomerJobListings: React.FC<Props> = ({ isOrderSumary }) => {
  const sortList = ["Date", "Time", "Amount", "Status"];
  const { handleSort, filteredJobs, handleOnChange, handleSubmit } =
    useFindWorkPostAJob(sortList, "job-listings");

  // todo
  const handleEdit = (orderNumber: number) => {
    console.log("/edit-order ", orderNumber);
  };

  return (
    <div className="px-4 justify-center dark:bg-gray-700 rounded-b">
      <MainTitle title="Job Listings" />

      <SearchUI
        handleOnChange={handleOnChange}
        filteredJobs={filteredJobs}
        handleSubmit={handleSubmit}
      />

      <div className="flex flex-col lg:flex-row justify-center">
        <SideMenuList />

        <div className="px-2 rounded-b">
          <SortData sortList={sortList} handleSort={handleSort} />

          <div className="justify-center ">
            {filteredJobs.map((job, index) => (
              <>
                <div
                  className="mx-auto border-gray-500 border rounded-sm mb-2 h-30 "
                  key={`1-${index}`}
                >
                  <div
                    className="rounded-t auto-cols-max items-center"
                    key={`2-${index}`}
                  >
                    <TableHeader
                      itemIndex={index}
                      itemStatus={job.jobStatus}
                      itemsTotal={filteredJobs.length}
                      handleEdit={handleEdit}
                      isJobListings={true}
                    />

                    <div
                      className="px-4 md:flex flex-row items-center border-t-8 border-purple-600"
                      key={`3-${index}`}
                    >
                      <div className="w-full md:w-60 text-center md:text-left mr-2">
                        <div className="text-sm">
                          <span className="text-base font-semibold">
                            Job Date:
                          </span>{" "}
                          {job.jobDate}
                        </div>

                        <div className="text-sm">
                          <span className="text-base font-semibold">
                            Job Start Time:
                          </span>{" "}
                          {job.time}
                        </div>

                        <div className="text-sm">
                          <span className="text-base font-semibold">
                            Job City Location:
                          </span>{" "}
                          {job.jobCityLocation}
                        </div>
                      </div>

                      <div className="w-full md:w-60  text-center m-1 md:text-left">
                        <div className="text-sm">
                          <span className="text-base font-semibold">Name:</span>{" "}
                          {job.jobName ? "In Stock" : "Out of Stock"}
                        </div>

                        <div className="text-sm">
                          <span className="text-base font-semibold">Price</span>{" "}
                          {priceWithComma(job.jobPrice || "")}
                        </div>

                        <div className="text-sm">
                          <span className="text-base font-semibold">
                            Description:
                          </span>{" "}
                          {job.jobTask}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
