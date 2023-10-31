import React, { useState, useEffect } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [productName, setProductName] = useState('');

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);
  }, []); // Load products from localStorage on component mount

  const updateLocalStorage = (updatedProducts) => {
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const addProduct = () => {
    if (productId && sellingPrice && productName) {
      const newProduct = {
        id: productId,
        name: productName,
        price: parseFloat(sellingPrice)
      };
      const updatedProducts = [...products, newProduct];
      setProducts(updatedProducts);
      updateLocalStorage(updatedProducts);
      setProductId('');
      setSellingPrice('');
      setProductName('');
    }
  };

  const deleteProduct = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
    updateLocalStorage(updatedProducts);
  };

  const calculateTotalPrice = () => {
    return products.reduce((total, product) => total + product.price, 0).toFixed(2);
  };

  return (
    <div className="App">
      <h1>Seller's Admin With Total Stock Value</h1>
      <div className="input-container">
        product Id:
        <input
          type="text"
          placeholder="Product Id"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />
        Selling Price:
        <input
          type="text"
          placeholder="Selling Price"
          value={sellingPrice}
          onChange={(e) => setSellingPrice(e.target.value)}
        />
        Product Name:
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <button onClick={addProduct}>Submit</button>
      </div>
      <div className="product-list">
        <h2>Products</h2>
        <ul>
          {products.map((product, index) => (
            <li key={index}>
              {product.name} - Rs{product.price.toFixed(2)}
              <button onClick={() => deleteProduct(index)}>Delete</button>
            </li>
          ))}
        </ul>
        <h2>Total Value Worth of Products: Rs{calculateTotalPrice()}</h2>
      </div>
    </div>
  );
}

export default App;
