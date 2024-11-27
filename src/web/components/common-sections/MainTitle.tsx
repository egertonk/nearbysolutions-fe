type Props = {
  title?: string;
};

export const MainTitle: React.FC<Props> = ({ title }) => {
  return (
    <div className="text-center pb-1">
      <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-purple-800 bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
        {title}
      </h1>
    </div>
  );
};
