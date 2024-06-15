import { useNavigate } from "react-router";

export const PostAJobHeader: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="grid md:grid-cols-2 gap-4 h-64 overflow-hidden bg-[#371f1f] text-white w-full font-[sans-serif] ">
      <div className="my-10">
        <h1 className="sm:text-4xl text-2xl font-bold">
          Can't find a Solution? Post a Job today.
        </h1>
        <p className="mt-2 text-sm text-gray-400">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
          accumsan, nuncet tempus blandit, metus mi consectetur nibh.
        </p>
        <button
          type="button"
          className="px-6 py-3 mt-3 rounded text-white text-sm tracking-wider font-semibold border-none outline-none bg-gray-600 hover:bg-gray-700"
          onClick={() => navigate("/post-a-job")}
        >
          Post a Job
        </button>
      </div>
      <img
        src="https://readymadeui.com/team-image.webp"
        className="w-full object-cover shrink-0"
        alt="working people"
      />
    </div>
  );
};
