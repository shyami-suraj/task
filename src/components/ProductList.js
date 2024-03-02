import React, { useState, useEffect } from 'react';
import ProductDetail from './ProductDetail';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components';
import Loading from './Loading';


const Gridcontainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 16px;
`;
const AContainer = styled.div`
 display: flex;
  align-items: center;
  justify-content: center;
margin:10px;
`;

const ProductList = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
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
    <AContainer>

      <InfiniteScroll
        dataLength={data.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<Loading/>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>"There is no more data"</b>
          </p>
        }
      >
        <Gridcontainer>

          {data.map((product) => (
            <ProductDetail key={product._id} product={product} />
          ))}
        </Gridcontainer>

      </InfiniteScroll>
    </AContainer>
  );
};

export default ProductList;