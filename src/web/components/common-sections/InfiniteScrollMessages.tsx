type Props = {
  loading: boolean;
  hasMore: boolean;
  showScrollButton: boolean;
  scrollToTop: () => void;
};

export const InfiniteScrollMessages: React.FC<Props> = ({
  loading,
  hasMore,
  showScrollButton,
  scrollToTop,
}) => {
  return (
    <div className="max-w-lg mx-auto p-4 relative">
      {loading && (
        <p className="text-center mt-4 font-bold text-lg font-heading text-purple-800 bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500 ">
          Loading more...
        </p>
      )}
      {!hasMore && (
        <p className="font-bold text-lg font-heading text-purple-800 bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
          No more data to load.
        </p>
      )}

      {/* ✅ Back to Top Button */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 bg-purple-500 text-white p-3 rounded-full shadow-md hover:bg-purple-700 transition"
        >
          Top
        </button>
      )}
    </div>
  );
};
