import { getSocialMedia } from "../../lib";
import { SocialMediaTypes } from "../../lib/types/solutionistTypes";

type Props = {
  key: string;
  socialData: SocialMediaTypes;
};

export const SocialIcon: React.FC<Props> = ({ socialData }) => {
  return (
    <div className="relative group inline-block mb-4 mt-4">
      <a
        id={socialData.name}
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
