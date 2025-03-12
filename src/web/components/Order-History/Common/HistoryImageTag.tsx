type Props = {
  imageSrc: string;
  name: string;
};

export const HistoryImageTag: React.FC<Props> = ({ imageSrc, name }) => {
  return (
    <img
      className="w-full hidden md:block rounded-lg"
      src={imageSrc}
      alt={name}
    />
  );
};
