export const FooterTitles: React.FC = () => {
  const footerLinks = [
    { label: "Company History", href: "#" },
    { label: "Meet the Team", href: "#" },
    { label: "Employee Handbook", href: "#" },
    { label: "Careers", href: "#" },
  ];

  return (
    <div className="text-center sm:text-left">
      <p className="text-lg font-medium text-white">About Us</p>
      <ul className="mt-8 space-y-4 text-sm">
        {footerLinks.map((link, index) => (
          <li key={index}>
            <a
              className="text-gray-300 hover:text-white transition"
              href={link.href}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
