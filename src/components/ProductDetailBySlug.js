import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Rating } from 'react-simple-star-rating';
import Cssloder from './Cssloder';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Loading from './Loading';
import Swal from 'sweetalert2'; 

const Acard = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  padding: 20px;
  border-radius: 5px;
  width: 100%;
  margin: 20px auto;

  h1 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  .slider {
    display: flex;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
    -ms-overflow-style: none;
    scrollbar-width: none;
    justify-content: center;

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

  .price {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
  }

  .rating {
    font-size: 1.125rem;
    color: #777;
  }

  .description {
    font-size: 1rem;
    color: #333;
    margin-bottom: 1rem;
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  box-shadow: 6px 4px 6px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
  width: '100%';
`;

const LeftContainer = styled.div`
  margin-left: 10px;
  margin-right: 50px;
  width: 50%;
  display: flex;
  align-items: center;
`;

const RightContainer = styled.div`
  width: 50%;
`;

const Button = styled.button`
  margin:10px;
  width:150px;
  height:50px;
  border-radius:5px;
  border:none;
  cursor: pointer;
  &:hover {
    /* background-color: blue; */
    /* color: #fff; */
    box-shadow: 0 0 10px #333;}
  
`;

const addToCart = () => {
  Swal.fire({
    title: 'Success!',
    text: 'Product added to cart successfully!',
    icon: 'success',
    confirmButtonText: 'Okey!!',
  });
};

const addToWishlist = () => {
  Swal.fire({
    title: 'Success!',
    text: 'Product added to wishlist successfully!',
    icon: 'success',
    confirmButtonText: 'Okey!!',
  });
};
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
    return <div><Loading/></div>;
  }

  return (
    <Acard>
      <Cssloder />
      <MainContainer>
        <LeftContainer>
          <div>
            {product.images.map((image, index) => (
              <img
                key={index}
                className={`mySlides ${index === slideIndex - 1 ? 'w3-opacity-off' : ''}`}
                src={image}
                style={{
                 
                  width:'750px',
                  height: '400px',
                  borderRadius: '10px',
                  // backgroundColor:'red',
                  padding:3,
                 
                  display: index === slideIndex - 1 ? 'block' : 'none'
                }}
                alt=""
              />
            ))}

            <div>
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`w3-col s4 ${index === slideIndex - 1 ? 'w3-opacity-off' : ''}`}
                >
                  <img
                    src={image}
                    style={{ width: '100%', height: '100px',padding:'3px', cursor: 'pointer' }}
                    onClick={() => currentDiv(index + 1)}
                  />
                </div>
              ))}
            </div>
          </div>
        </LeftContainer>
        <RightContainer>
          <div>
            <h1><b>{product.title}</b></h1>
            <div className="description"><b>Description:</b>{product.description}</div>
            <div className="rating">
              <Rating
                readonly={true}
                initialValue={product.ratings}
                size={24}
                strokeWidth={2}
                strokeColor="#ff9800"
              />({product.totalRatings})
            </div>
            {product.offPercent > 0 && (
            <p>
              <span style={{ textDecoration: "line-through" }}>
                Rs.{product.strikePrice}
              </span>{" "}
              ({product.offPercent}% off)
            </p>
          )}
          
            <div className="price">Price: Rs.{product.price}</div>

            <div><b>Brand:</b> {product.brand.name}</div>
            <Button onClick={addToCart} style={{ marginTop: "10px", backgroundColor:'black',color:'white'}}><FontAwesomeIcon icon={faShoppingCart} style={{ color: "#fff" }} /> Add to Cart</Button>
<Button onClick={addToWishlist} style={{ marginTop: "10px",backgroundColor:'lightgray' }}><FontAwesomeIcon icon={faHeart} /> Add to Wishlist</Button>          </div>
              </RightContainer>
      </MainContainer>
    </Acard>
  );
};

export default ProductDetailBySlug;