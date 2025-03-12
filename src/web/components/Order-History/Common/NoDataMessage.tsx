type Props = {
  name: string;
};

export const NoDataMessage: React.FC<Props> = ({ name }) => {
  return (
    <p className="font-bold text-lg font-heading text-purple-800 bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
      No more {name} data to load.
    </p>
  );
};
