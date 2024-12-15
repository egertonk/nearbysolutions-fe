import React from "react";
export const TermsConditionForToolOwners: React.FC = () => {
  return (
    <>
      <div className="m-8 pb-8 bg-sky-950 text-white rounded-lg shadow-lg">
        <h1 className="pt-8 font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-white-800 bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
          Terms and Conditions for Tool Owners
        </h1>
        <ol className="ps-5 mt-8 space-y-1 list-decimal list-inside text-start">
          <li>
            <span className="font-bold dark:text-white">
              Tool Listing Requirements
            </span>
            <ul className="ps-5 mt-2 space-y-1 list-disc list-inside">
              <li>
                All tools listed for rental must be owned by the owner or
                authorized for rental.
              </li>
              <li>
                Tools must be in safe, functional, and good working condition.
              </li>
              <li>
                Clear and accurate descriptions, including brand, category, and
                functionality, must be provided for each tool.
              </li>
              <li>
                Owners must upload high-quality images of the tools, ensuring
                they reflect the actual condition of the item.
              </li>
            </ul>
          </li>

          <li>
            <span className="font-bold dark:text-white">
              Tool Maintenance and Safety
            </span>
            <ul className="ps-5 mt-2 space-y-1 list-disc list-inside">
              <li>
                Owners are responsible for ensuring tools are well-maintained
                and safe for use.
              </li>
              <li>
                Any defects or issues with the tool must be disclosed before
                rental.
              </li>
              <li>
                The owner agrees to conduct regular inspections and service the
                tool as necessary.
              </li>
            </ul>
          </li>

          <li>
            <span className="font-bold dark:text-white">
              Rental Pricing and Discounts
            </span>
            <ul className="ps-5 mt-2 space-y-1 list-disc list-inside">
              <li>
                Owners are responsible for setting competitive and fair pricing
                for their tools.
              </li>
              <li>
                Discounts (e.g., 10% off) must be clearly indicated if
                applicable.
              </li>
            </ul>
          </li>

          <li>
            <span className="font-bold dark:text-white">
              Rental Period and Availability
            </span>
            <ul className="ps-5 mt-2 space-y-1 list-disc list-inside">
              <li>
                Owners must accurately specify tool availability, including
                rental dates and times.
              </li>
              <li>
                Owners should promptly update availability to avoid conflicts.
              </li>
            </ul>
          </li>

          <li>
            <span className="font-bold dark:text-white">Prohibited Tools</span>
            <ul className="ps-5 mt-2 space-y-1 list-disc list-inside">
              <li>
                The following items are strictly prohibited from being listed
                for rental:
                <ul className="ps-5 mt-2 space-y-1 list-disc list-inside">
                  <li>
                    <span className="font-bold">Weapons or Firearms:</span>{" "}
                    Including guns, ammunition, or any device designed to cause
                    harm.
                  </li>
                  <li>
                    <span className="font-bold">
                      Explosives or Hazardous Materials:
                    </span>{" "}
                    Such as dynamite, fireworks, or chemicals classified as
                    dangerous.
                  </li>
                  <li>
                    <span className="font-bold">
                      Tools Requiring Special Licensing:
                    </span>{" "}
                    Such as certain types of heavy machinery or equipment
                    restricted by local regulations.
                  </li>
                  <li>
                    <span className="font-bold">
                      Unregistered or Stolen Items:
                    </span>{" "}
                    Only legally owned tools with proper documentation may be
                    listed.
                  </li>
                  <li>
                    <span className="font-bold">Unsafe or Damaged Tools:</span>{" "}
                    Any tool that fails to meet basic safety standards or is in
                    disrepair.
                  </li>
                </ul>
              </li>
            </ul>
          </li>

          <li>
            <span className="font-bold dark:text-white">
              Damage, Loss, and Insurance
            </span>
            <ul className="ps-5 mt-2 space-y-1 list-disc list-inside">
              <li>
                Owners should document the condition of tools before and after
                each rental.
              </li>
              <li>
                Owners are strongly encouraged to insure their tools, as the
                <span className="text-purple-400">Nearby Solutions</span> is not
                liable for loss, theft, or damage.
              </li>
            </ul>
          </li>

          <li>
            <span className="font-bold dark:text-white">Platform Policies</span>
            <ul className="ps-5 mt-2 space-y-1 list-disc list-inside">
              <li>
                The platform reserves the right to remove any tool listing that
                violates these terms.
              </li>
              <li>
                Owners must comply with all platform policies, including user
                ratings and feedback mechanisms.
              </li>
            </ul>
          </li>

          <li>
            <span className="font-bold dark:text-white">
              Cancellation and Refunds
            </span>
            <ul className="ps-5 mt-2 space-y-1 list-disc list-inside">
              <li>
                Owners must provide a clear cancellation policy for renters.
              </li>
              <li>
                If an owner cancels a confirmed rental, the renter is entitled
                to a full refund.
              </li>
            </ul>
          </li>

          <li>
            <span className="font-bold dark:text-white">
              Legal Protections for the Platform
            </span>
            <ul className="ps-5 mt-2 space-y-1 list-disc list-inside">
              <li>
                The platform acts as an intermediary for facilitating rentals
                and is not responsible for the actual performance, safety, or
                functionality of tools.
              </li>
              <li>
                IThe platform is not liable for any injuries, damages, or
                accidents caused by tools rented through the platform.
              </li>
              <li>
                Owners agree to indemnify and hold the platform harmless against
                any claims, damages, or liabilities arising from the rental or
                use of their tools.
              </li>
              <li>
                The platform reserves the right to terminate or suspend accounts
                that violate these terms.
              </li>
            </ul>
          </li>

          <li>
            <span className="font-bold dark:text-white">
              Privacy and Confidentiality
            </span>
            <ul className="ps-5 mt-2 space-y-1 list-disc list-inside">
              <li>
                Owners must protect the personal information of renters and only
                use it for rental-related purposes.
              </li>
              <li>
                The platform will handle all user data according to its privacy
                policy and will not share personal information without consent.
              </li>
            </ul>
          </li>
        </ol>
      </div>
    </>
  );
};
