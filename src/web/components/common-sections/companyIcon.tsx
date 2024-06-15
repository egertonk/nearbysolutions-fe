import nearbySolutionsIcon from "../../assets/company-logos-icons/icononly_transparent_nobuffer.png";

export const CompanyIcon: React.FC = () => {
  return (
    <a href="/home" className="-m-1.5 p-1.5">
      <span className="sr-only">Nearby Solutions</span>
      <img className="h-10 w-auto" src={`${nearbySolutionsIcon}`} alt="" />
    </a>
  );
};
