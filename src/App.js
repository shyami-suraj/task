import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetailBySlug from './components/ProductDetailBySlug';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Product Listing</h1>
        <Routes>
          <Route exact path="/" element={<ProductList />} />
          <Route path="/products/:slug" element={<ProductDetailBySlug/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;