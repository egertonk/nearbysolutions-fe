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
    <a
      key={`${Math.random()}`}
      target="_blank"
      href={socialData.link}
      className="text-gray-500 hover:text-gray-600"
      rel="noreferrer"
    >
      {getSocialMedia(socialData.name)?.icon}
    </a>
  );
};
