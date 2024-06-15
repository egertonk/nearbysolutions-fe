type Props = {
  title?: string;
};

export const MainTitle: React.FC<Props> = ({ title }) => {
  return (
    <div className="text-center pb-6">
      <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-purple-800">
        {title}
      </h1>
    </div>
  );
};
