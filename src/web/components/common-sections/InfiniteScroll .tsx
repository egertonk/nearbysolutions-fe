import { useState, useEffect, useRef, useCallback } from "react";
import { SolutionistResponseTypes } from "../../lib/types/solutionistTypes";
import { ToolOrderHistoryWithPagination } from "../../lib/types/DIYToolsListings";
import { JobPosting } from "../../lib/types/FindWorkPostAJobtypesData";

export const isFeature = (featureName: string): boolean => {
  return featureName === "home-page";
};

export const useInfiniteScroll = (apiUrl: string, filterName?: string) => {
  const [items, setItems] = useState<
    SolutionistResponseTypes[] | ToolOrderHistoryWithPagination[] | JobPosting[]
  >([]);
  const [page, setPage] = useState<number>(0);
  const [previousPage, setPreviousPage] = useState<number>(-1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [showScrollButton, setShowScrollButton] = useState<boolean>(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isFirstLoad = useRef<boolean>(true); // Track first load

  // Fetch data from API
  const fetchData = async (pageNum: number, isFullRefresh: boolean) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}?page=${pageNum}&size=10`);
      if (!response.ok) throw new Error("Failed to fetch data");

      const data = await response.json();
      setItems((prev) =>
        isFullRefresh ? data.content : [...prev, ...data.content]
      );
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
      if (loading || !hasMore) return; // Prevents observer from triggering if already loading
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [loading, hasMore]
  );

  // Fetch new data when `page` changes
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false; // Mark first load as done
      return;
    }

    if (page > previousPage) {
      fetchData(page, false);
      setPreviousPage(page);
    }
  }, [page]);

  // Handle filter changes (reset data)
  useEffect(() => {
    if (filterName) {
      // setPage(0); // Reset page
      setItems([]); // Clear previous data
      setHasMore(true);

      fetchData(0, true); // Ensure API is called when filter changes
    }
  }, [filterName]);

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
