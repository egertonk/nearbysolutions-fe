import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import jobSearchListImage from "../../assets/company-logos-icons/job-search-list.png";
import { JobPosting } from "../../lib/types/FindWorkPostAJobtypesData";
import { grayButtonCSS } from "../../assets/common-css/css";

// Type for the data item, assuming it's a list of posts or items.
type ItemTypes = {
  id: number;
  title: string;
  body: string;
};

type Props = {
  openImage: boolean;
  setOpenImage: React.Dispatch<React.SetStateAction<boolean>>;
  jobDetails: JobPosting | undefined;
};

export const InfiniteScroll: React.FC = () => {
  const [items, setItems] = useState<ItemTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1); // Tracks the current page

  //    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`;

  // Fetch data from API
  const fetchItems = useCallback(async () => {
    if (loading) return; // Prevent fetching if already loading
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/user`);
      const data = await response.json();
      const newItems = data;

      setItems((prevItems) => [...prevItems, ...newItems]); // Append new items to existing ones
      setHasMore(newItems.length > 0); // Check if there are more items to load
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  }, [loading, page]);

  // Handle when the bottom of the page is reached
  const observer = useRef<IntersectionObserver | null>(null);

  const lastItemRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect(); // Disconnect previous observer

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1); // Increase page number
        }
      });

      if (node) observer.current.observe(node); // Observe the last item
    },
    [loading, hasMore]
  );

  useEffect(() => {
    fetchItems(); // Fetch items on component mount and when page changes
  }, [page, fetchItems]);

  return (
    <>
      <div>
        <h1>Infinite Scroll Example</h1>
        <div>
          {items.map((item, index) => (
            <div
              key={item.id}
              ref={index === items.length - 1 ? lastItemRef : null}
            >
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>

        {loading && <div>Loading...</div>}
        {!hasMore && <div>No more items to load.</div>}
      </div>
    </>
  );
};
