export const FooterTitles: React.FC = () => {
  return (
    <div className="text-center sm:text-left">
      <p className="text-lg font-medium text-gray-900">About Us</p>

      <ul className="mt-8 space-y-4 text-sm">
        <li>
          <a
            className="text-gray-700 transition hover:text-gray-700/75"
            href="#"
          >
            Company History
          </a>
        </li>

        <li>
          <a
            className="text-gray-700 transition hover:text-gray-700/75"
            href="#"
          >
            Meet the Team
          </a>
        </li>

        <li>
          <a
            className="text-gray-700 transition hover:text-gray-700/75"
            href="#"
          >
            Employee Handbook
          </a>
        </li>

        <li>
          <a
            className="text-gray-700 transition hover:text-gray-700/75"
            href="#"
          >
            {" "}
            Careers{" "}
          </a>
        </li>
      </ul>
    </div>
  );
};
