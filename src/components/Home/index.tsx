"use client";
import { useState, useEffect } from "react";
import Card from "./Card";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchAllProductList } from "@/service";
import Loader from "@/common/Loader";

export default function Home({
  data,
  limit,
}: {
  data: Object[];
  limit: number;
}) {
  const [products, setProducts] = useState(data);
  const [hasMore, setHasMore] = useState(true);
  const [dataLimit, setDataLimit] = useState(limit);

  const fetchMoreData = async (limit: number) => {
    try {
      const { data } = await fetchAllProductList(limit);
      setProducts(data);
      setDataLimit((prev) => prev + 4);

      if (data.length < limit) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching more data:", error);
    }
  };
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
    });
  }, []);
  return (
    <div>
      <div className="bg-white mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>
        <InfiniteScroll
          dataLength={products.length}
          next={() => fetchMoreData(dataLimit + 4)}
          hasMore={hasMore}
          loader={<Loader />}
          endMessage={
            <p className="text-center text-[gray] mt-6">
              Yay! You have seen it all
            </p>
          }
        >
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product: any) => (
              <Card product={product} key={product.id} />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
}
