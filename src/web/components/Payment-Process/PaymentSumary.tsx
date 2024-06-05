import { CustomerFormData } from "../../lib/types/orderTypes";

type Props = {
  formData: CustomerFormData;
};

export const PaymentSumary: React.FC<Props> = ({ formData }) => {
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
                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Job Price
                  </dt>
                  <dd className="text-base font-medium text-gray-900 dark:text-white">
                    ${formData.solutionPrice}
                  </dd>
                </dl>
                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Discount Savings Percent
                  </dt>
                  <dd className="text-base font-medium text-green-500">
                    {formData.solutionPriceDiscountPercentage}% OFF
                  </dd>
                </dl>
                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Discount Savings Amount
                  </dt>
                  <dd className="text-base font-medium text-gray-900 dark:text-white text-green-500">
                    $
                    {getDiscountAmount(
                      formData.solutionPrice,
                      formData.solutionPriceDiscountPercentage
                    )}
                  </dd>
                </dl>
                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Subtotal
                  </dt>
                  <dd className="text-base font-medium text-gray-900 dark:text-white">
                    ${formData.solutionPrice}
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
                      formData.solutionPrice,
                      formData.solutionPriceDiscountPercentage
                    )}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
