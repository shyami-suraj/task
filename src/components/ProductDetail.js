import React from 'react';
import { Link } from "react-router-dom";

const ProductDetail = ({ product }) => {
  const url =`/products/${product.slug}`
  const linkObj = { pathname: url, state: { slug: product.slug} }

  return (
    <div className="product-card">
      <Link to={linkObj}><img src={product.images[0]} alt={product.title} style={{height:500,width:700}} />
      <div className="product-info">
       <h3>{product.title}</h3>
        <p>Price: Rs.{product.price}</p>
        <p>Rating: {product.ratings  || 'Not rated'}</p>
        <p>Brand: {product.brand.name}</p>
      </div>
      </Link>
    </div>
  );
};

export default ProductDetail;