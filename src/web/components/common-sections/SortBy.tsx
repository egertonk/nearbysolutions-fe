type Props = {
  setSortType: React.Dispatch<React.SetStateAction<string>>;
  isReviewValid?: boolean;
};

export const SortBy: React.FC<Props> = ({ setSortType, isReviewValid }) => {
  return (
    <select
      id="sortType"
      name="sortType"
      className="w-50 md:w-80 px-3 h-10 rounded-l border-2 border-purple-500 focus:outline-none focus:border-purple-800"
      onChange={(e) => setSortType(e.target.value)}
    >
      <option defaultValue="Sort by">Sort by</option>
      <option value="date">Date</option>
      <option value="location">Location</option>
      {isReviewValid && <option value="stars">Stars</option>}
      <option value="stars">Active</option>
      <option value="stars">Completed</option>
    </select>
  );
};
