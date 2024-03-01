import React, { useState, useEffect } from 'react';
import ProductDetail from './ProductDetail';
import InfiniteScroll from 'react-infinite-scroll-component';

const ProductList = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async () => {
    // Fetch data from the API with the current page number
    const response = await fetch(
      `https://thekayalab.softbenz.com/api/product/latest?page=${page}`
    );
    const jsonData = await response.json();

    // Update the state with the new data and pagination info
    setData((prevData) => [...prevData, ...jsonData.data.docs]);
    setHasMore(jsonData.data.pagination.nextPage);
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <InfiniteScroll
      dataLength={data.length}
      next={fetchData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      {data.map((product) => (
        <ProductDetail key={product._id} product={product} />
      ))}
    </InfiniteScroll>
  );
};

export default ProductList;