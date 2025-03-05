import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dialog, Disclosure } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { Menulist } from "./Menulist";
import { callsToAction, products } from "../..";
import { CompanyIcon } from "../common-sections/companyIcon";

export const NearBySolutionsHeader: React.FC = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <CompanyIcon />
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="rounded-md p-2.5 text-gray-700 focus:outline-none"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open main menu"
          >
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <Menulist />

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            to="/home/login"
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-purple-600"
          >
            Log in <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>

      {/* Mobile Menu */}
      <Dialog
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10 bg-black bg-opacity-50" />

        <Dialog.Panel className="fixed inset-y-0 right-0 z-20 w-full max-w-sm bg-white px-6 py-6 sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <CompanyIcon />
            <button
              type="button"
              className="rounded-md p-2.5 text-gray-700 focus:outline-none"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-6 space-y-4">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">
                    Product
                    <ChevronDownIcon
                      className={`h-5 w-5 transform transition ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="space-y-2 pl-6">
                    {[...products, ...callsToAction].map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="block rounded-lg py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>

            <Link
              to="/favorite"
              className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
            >
              Favorite
            </Link>
            <Link
              to="/marketplace"
              className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
            >
              Marketplace
            </Link>
            <Link
              to="/company"
              className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
            >
              Company
            </Link>
          </div>

          <div className="mt-6">
            <Link
              to="/login"
              className="block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50"
            >
              Log in
            </Link>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};
