import React, { useEffect, useState } from "react";
import "./Home.css";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import { addToCart, addToDb, removeFromCart } from "../Utilitis/fakedb";
// import { BsFillCartPlusFill } from 'react-icons/bs';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    fetch("data.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    if (products.length) {
      const storedCart = addToCart();
      const previousCart = [];
      for (const id in storedCart) {
        // console.log(id);
        const foundProducts = products.find((product) => product.id == id);
        if (foundProducts) {
          const quantity = storedCart[id];
          foundProducts.quantity = quantity;
          previousCart.push(foundProducts);
        }
      }
      setCart(previousCart);
    }
  }, [products]);

  const handleAddToCart = (selectedProduct, id) => {
    // addToDb(id);
    let newCart = [];
    const exist = cart.find((product) => product.id == selectedProduct.id);
    const rest = cart.filter((product) => product.id !== selectedProduct.id);

    if (!exist) {
      selectedProduct.quantity = 1;
      newCart = [...cart, selectedProduct];
    } else {
      selectedProduct.quantity = selectedProduct.quantity + 1;
      newCart = [...rest, selectedProduct];
    }

    setCart(newCart);
    addToDb(selectedProduct.id);
  };
  const handleRemoveItems = () => {
    removeFromCart();
    setCart([]);
  };

  return (
    <div className="shop">
      <div className="products-container">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart
          cart={cart}
          products={products}
          handleRemoveItems={handleRemoveItems}
        ></Cart>
      </div>
    </div>
  );
};

export default Home;
