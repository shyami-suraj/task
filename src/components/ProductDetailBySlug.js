import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const ProductDetailBySlug = ({ location }) => {
  const [product, setProduct] = useState(null);

  // Get the slug parameter from the URL
  const { slug } = useParams();

  // Fetch the product data when the component mounts or when the slug parameter changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the product data from the API
        const response = await axios.get(
          `https://thekayalab.softbenz.com/api/product/for-public/${slug}`
        );
        // Store the product data in the product state variable
        setProduct(response.data.data);
      } catch (error) {
        // Log the error message if there is an error fetching the product data
        console.error('Error fetching product:', error);
      }
    };

    fetchData();
  }, [slug]);

  // Render a loading message while the product data is being fetched
  if (!product) {
    return <div>Loading...</div>;
  }

  // Render the product's title, price, ratings, and brand name
  return (
    <div>
      <h1>{product.title}</h1>
      <p>Price: {product.price}</p>
      <p>Rating: {product.ratings || 'Not rated'}</p>
      <p>Brand: {product.brand.name}</p>
      {/* Render the product's images */}
      <div>
        {product.images.map((image, index) => (
          <img key={index} src={image} alt="" />
        ))}
      </div>
    </div>
  );
};

export default ProductDetailBySlug;