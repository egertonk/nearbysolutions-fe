import { useState, useEffect, useRef, useCallback } from "react";
import { SolutionistResponseTypes } from "../../lib/types/solutionistTypes";

export const useInfiniteScroll = (apiUrl: string) => {
  const [items, setItems] = useState<SolutionistResponseTypes[]>([]);
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [showScrollButton, setShowScrollButton] = useState<boolean>(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Fetch data from API
  const fetchData = async (pageNum: number) => {
    if (!hasMore) return;

    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}?page=${pageNum}&size=2`);

      if (!response.ok) throw new Error("Failed to fetch data");

      const data = await response.json();
      setItems((prev) => [...prev, ...data.content]);
      setHasMore(data.content.length > 0);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Observer for detecting when last item is in view
  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [loading, hasMore]
  );

  // Fetch new data when `page` changes
  useEffect(() => {
    fetchData(page);
  }, [page]);

  // Show "Back to Top" button when scrolling down
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll back to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return {
    items,
    loading,
    hasMore,
    lastElementRef,
    showScrollButton,
    scrollToTop,
  };
};
