import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Rating } from 'react-simple-star-rating';
import Cssloder from './Cssloder';
const Acard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  width: 100%;
  /* max-width: 600px; */
  margin: 20px auto;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }

  .slider {
    display: flex;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }

    .slide {
      flex: 0 0 auto;
      scroll-snap-align: start;
      margin-right: 20px;
      border-radius: 5px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      cursor: pointer;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .product-info {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 20px;

    .price {
      font-size: 24px;
      font-weight: bold;
      color: #333;
    }

    .rating {
      font-size: 18px;
      color: #777;
    }
  }

  .description {
    font-size: 16px;
    color: #333;
    margin-bottom: 20px;
  }
`;
const MainContainer = styled.div`
display:flex;
flex-direction:row;
`

const ProductDetailBySlug = ({ location }) => {
  const [product, setProduct] = useState(null);
  const [slideIndex, setSlideIndex] = useState(1);
  const showDivs = (n) => {
    if (n > product.images.length) {
      setSlideIndex(1);
    }
    if (n < 1) {
      setSlideIndex(product.Acardimages.length);
    }
    setSlideIndex(n);
  };

  const currentDiv = (n) => {
    showDivs(n);
  };

  const { slug } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://thekayalab.softbenz.com/api/product/for-public/${slug}`
        );
        setProduct(response.data.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchData();
  }, [slug]);

  if (!product) {
    return <div>Loading...</div>;
  }



  return (
    <Acard>

      <Cssloder />
      <MainContainer>
        <div>
          <div className="w3-content" style={{ maxWidth: '1200px' }}>
            {product.images.map((image, index) => (
              <img
                key={index}
                className={`mySlides ${index === slideIndex - 1 ? 'w3-opacity-off' : ''}`}
                src={image}
                style={{ minwidth: '70vh', height: '30vh', display: index === slideIndex - 1 ? 'block' : 'none' }}
                alt=""
              />
            ))}

            <div className="w3-row-padding w3-section">
              {product.images.map((image, index) => (
                <div key={index} className="w3-col s4">
                  <img
                    className={`demo w3-opacity w3-hover-opacity-off ${index === slideIndex - 1 ? 'w3-opacity-off' : ''}`}
                    src={image}
                    style={{ width: '100%', height: '100px', cursor: 'pointer' }}
                    onClick={() => currentDiv(index + 1)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="product-info">
            <div><h1>{product.title}</h1></div>

            <div className="price">Price: Rs.{product.price}</div>


            <div className="rating">Rating: <Rating
              readonly={true}
              initialValue={product.ratings}
              size={24}
              strokeWidth={2}
              strokeColor="#ff9800"
            />({product.totalRatings})</div>
          </div>
          </div>
          <p>Brand: {product.brand.name}</p>


          <p className="description">{product.description}</p>
      </MainContainer>
    </Acard>
  );
};

export default ProductDetailBySlug;