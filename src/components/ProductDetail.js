import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import {Rating} from 'react-simple-star-rating';

const Acard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-out;
  justify-content: center; 
  align-items: center; 

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  img {
    max-width:750px;
    width: auto;
    height: 400px;
    border-radius:10px;
  
    object-fit: cover;
    transition: transform 0.2s ease-out;
    &:hover {
      transform: scale(1.05);
    }
  }

  .product-info {
    display: flex;
    flex-direction: column;
    
    padding: 16px;
    justify-content: center; 
  align-items: center; 

    h3 {
      margin-top: 0;
      margin-bottom: 8px;
      font-weight: bold;
      color: #333;
    }

    p {
      margin-bottom: 0;
      font-size: 14px;
      color: #666;
    }
  }
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const ProductDetail = ({ product }) => {
  const url =`/products/${product.slug}`
  const linkObj = { pathname: url, state: { slug: product.slug} }

  return (
    <Acard >
      <StyledLink to={linkObj}>
        <img src={product.images[0]} alt={product.title} />
        <div className="product-info">
          <h3>{product.title}</h3>
          {product.offPercent > 0 && (
            <p>
              <span style={{ textDecoration: "line-through" }}>
                Rs.{product.strikePrice}
              </span>{" "}
              ({product.offPercent}% off)
            </p>
          )}
          <p>Price: Rs.{product.price}</p>
          
          
          <p>
          <Rating
            readonly={true}
            initialValue={product.ratings}
            size={24}
            strokeWidth={2}
            strokeColor="#ff9800"
          />({product.totalRatings})</p>
          <p>Brand: {product.brand.name}</p>
        </div>
      </StyledLink>
    </Acard>
  );
};

export default ProductDetail;