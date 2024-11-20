import { getSocialMedia } from "../../lib";

type Props = {
  key: string;
  socialData: {
    name: string;
    link: string;
  };
};

export const SocialIcon: React.FC<Props> = ({ socialData }) => {
  return (
    <div className="relative group inline-block mb-4">
      <a
        key={Math.random()}
        target="_blank"
        href={socialData.link}
        className="text-white-500 hover:text-white-600"
        rel="noreferrer"
      >
        {getSocialMedia(socialData.name)?.icon}
      </a>
      <div className="absolute transform -translate-y-1/4 -translate-x-0 opacity-0 group-hover:opacity-100 transition-all bg-gray-800 text-white text-sm rounded-md">
        {socialData.name}
      </div>
    </div>
  );
};
