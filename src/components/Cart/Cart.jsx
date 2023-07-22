import React, { useEffect, useState } from "react";
import { CiCircleRemove } from "react-icons/ci";
import "./Cart.css";

const Cart = ({ cart, products, handleRemoveItems }) => {
  const [freeProduct, setFreeProduct] = useState({});
  const [offer, setOffer] = useState(false);

  const handleFreeProduct = () => {
    const randomNumber = Math.floor(Math.random() * products.length);
    const item = products[randomNumber];
    setFreeProduct(item);
  };

  useEffect(() => {
    if (cart.length > 0) {
      setOffer(true);
    } else {
      setOffer(false);
      setFreeProduct([]);
    }
  }, [cart]);

  return (
    <div className="cart">
      <div className="cart-header">
        <h3>Order Summery</h3>
        <button onClick={handleRemoveItems}>
          <CiCircleRemove />
        </button>
      </div>
      {cart.map((item) => (
        <div key={item.id} className="cart-item">
          <img src={item.pairImage} alt="" />
          <div>
            <p>
              {item.name} {item.color}
            </p>
            <p>${item.price}</p>
            <p>quantity : {item.quantity}</p>
          </div>
        </div>
      ))}
      <p>Buy one get one free</p>
      <button
        disabled={!offer}
        className="offer-button"
        onClick={handleFreeProduct}
      >
        Get one for me
      </button>
      {Object.keys(freeProduct).length > 0 && (
        <div className="cart-item">
          <img src={freeProduct.pairImage} alt="" />
          <div>
            <p>
              {freeProduct.name} {freeProduct.color}
            </p>
            <p>${freeProduct.price}</p>
            <p>quantity : {freeProduct.quantity}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
