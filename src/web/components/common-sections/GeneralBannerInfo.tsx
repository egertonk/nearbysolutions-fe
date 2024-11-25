type Props = {
  title: string;
  description: string;
  titleBG: string;
};

export const GeneralBannerInfo: React.FC<Props> = ({
  title,
  description,
  titleBG,
}) => {
  return (
    <div
      className="p-2 bg-cyan-950 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex"
      role="alert"
    >
      <span
        className={` ${titleBG} flex rounded-fulluppercase px-2 py-1 text-xs font-bold mr-3`}
      >
        {title}
      </span>
      <span className="font-semibold mr-2 text-left flex-auto">
        {description}
      </span>
    </div>
  );
};
