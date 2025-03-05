import { useNavigate } from "react-router";

type Props = {
  url: string;
};

export const HistoryDetailsButton: React.FC<Props> = ({ url }) => {
  const navigate = useNavigate();

  return (
    <div className="p-2 rounded-lg shadow-lg bg-black hover:bg-blue hover:bg-gray-100 hover:text-black">
      <button onClick={() => navigate(`${url}`)} className="">
        View Details
      </button>
    </div>
  );
};
