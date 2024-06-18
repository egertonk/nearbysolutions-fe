export const FooterTitles: React.FC = () => {
  return (
    <div className="text-center sm:text-left">
      <p className="text-lg font-medium text-white">About Us</p>

      <ul className="mt-8 space-y-4 text-sm">
        <li>
          <a
            className="text-gray-300 hover:text-white text-sm transition"
            href="#"
          >
            Company History
          </a>
        </li>

        <li>
          <a
            className="text-gray-300 hover:text-white text-sm transition"
            href="#"
          >
            Meet the Team
          </a>
        </li>

        <li>
          <a
            className="text-gray-300 hover:text-white text-sm transition"
            href="#"
          >
            Employee Handbook
          </a>
        </li>

        <li>
          <a
            className="text-gray-300 hover:text-white text-sm transition"
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
