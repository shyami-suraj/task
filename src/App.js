import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetailBySlug from './components/ProductDetailBySlug';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  
`;
function App() {
  return (
    <Router>
      <div className="App">
      <h1 style={{marginLeft:'50px'}}><b>
        <StyledLink to="/" className="product-listing-heading">
          Product Listing
        </StyledLink>
        </b></h1>
        {/* <h1>Product Listing</h1> */}
        <Routes>
          <Route exact path="/" element={<ProductList />} />
          <Route path="/products/:slug" element={<ProductDetailBySlug />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;