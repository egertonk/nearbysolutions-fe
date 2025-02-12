import React from "react";
import { greaterThanArrowWithTailSVG } from "../../assets/svg/svgs";
import { useNavigate } from "react-router";

type Props = {
  sectionName: string;
  path: string;
  addedSection: {
    name: string;
    linkPath: string;
  } | null;
};

export const HomeSectionHeader: React.FC<Props> = ({
  sectionName,
  path,
  addedSection,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="col-span-2 row-span-2 text-start mt-4">
        <span className="font-bold text-2xl font-heading text-purple-800 bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
          {sectionName}
        </span>
      </div>
      <div className="col-span-2 row-span-2 text-end p-4">
        {addedSection !== null && (
          <button
            className="mx-2 mx-2 px-4 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white gap-2 font-bold inline-flex items-center rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg"
            onClick={() => navigate(`${addedSection.linkPath}`)}
          >
            {addedSection.name}
          </button>
        )}
        <button
          className="mx-2 px-4 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white gap-2 font-bold inline-flex items-center rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg"
          onClick={() => navigate(`${path}`)}
        >
          View more!
          {greaterThanArrowWithTailSVG}
        </button>
      </div>
    </>
  );
};
