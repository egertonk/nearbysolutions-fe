import { useSelector } from "react-redux";
import { RootState } from "../../../store";

export const PaymentSumary: React.FC = () => {
  const states = useSelector((state: RootState) => state);
  const customerOrder = states.formData.customerOrder;
  const postAJobOrder = states.postAJobFormDetailsState.postAJobFormDetailsData;

  const calculateFinalPrice = (originalPrice: number, discount: number) => {
    if (originalPrice) {
      const discountGiven = (originalPrice * (discount / 100)).toFixed(2);
      const finalPrice = originalPrice - Number(discountGiven);
      return finalPrice.toFixed(2);
    }
  };

  const getDiscountAmount = (originalPrice: number, discount: number) => {
    if (originalPrice) {
      const discountGiven = (originalPrice * (discount / 100)).toFixed(2);
      return Number(discountGiven);
    }
  };

  const getToral = (originalPrice: number, tax: number) => originalPrice + tax;

  return (
    <div className="flex-1 px-3">
      <div
        className="p-12 rounded-lg border-gray-200 mb-8"
        style={{ boxShadow: "0 10px 28px rgba(0,0,0,.08)" }}
      >
        <p className="text-xl font-semibold">Payment Sumarry</p>
        <div className="flex flex-col md:flex-row justify-center mt-5">
          <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
            <div className="flow-root">
              <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
                {postAJobOrder ? (
                  <>
                    <dl className="flex items-center justify-between gap-4 py-3">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Job Price
                      </dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        ${postAJobOrder.jobPrice}
                      </dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4 py-3">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Subtotal
                      </dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        ${postAJobOrder.jobPrice}
                      </dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4 py-3">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Tax
                      </dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        $5
                        {/* later calculate the tax and add to total */}
                      </dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4 py-3">
                      <dt className="text-base font-bold text-gray-900 dark:text-white">
                        Total (Payment On Hold)
                      </dt>
                      <dd className="text-base font-bold text-gray-900 dark:text-white">
                        ${getToral(Number(postAJobOrder.jobPrice), 5)}
                      </dd>
                    </dl>
                  </>
                ) : (
                  <>
                    <dl className="flex items-center justify-between gap-4 py-3">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Job Price
                      </dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        ${customerOrder.solutionPrice}
                      </dd>
                    </dl>
                    <dl className="flex items-center justify-between gap-4 py-3">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Discount Savings Percent
                      </dt>
                      <dd className="text-base font-medium text-green-500">
                        {customerOrder.solutionPriceDiscountPercentage}% OFF
                      </dd>
                    </dl>
                    <dl className="flex items-center justify-between gap-4 py-3">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Discount Savings Amount
                      </dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white text-green-500">
                        $
                        {getDiscountAmount(
                          customerOrder.solutionPrice,
                          customerOrder.solutionPriceDiscountPercentage
                        )}
                      </dd>
                    </dl>
                    <dl className="flex items-center justify-between gap-4 py-3">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Subtotal
                      </dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        ${customerOrder.solutionPrice}
                        {/* later calculate the per hour */}
                      </dd>
                    </dl>
                    <dl className="flex items-center justify-between gap-4 py-3">
                      <dt className="text-base font-bold text-gray-900 dark:text-white">
                        Total
                      </dt>
                      <dd className="text-base font-bold text-gray-900 dark:text-white">
                        $
                        {calculateFinalPrice(
                          customerOrder.solutionPrice,
                          customerOrder.solutionPriceDiscountPercentage
                        )}
                      </dd>
                    </dl>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
