import React, { useState } from "react";
import "./Product.css";
import { BsCartCheck } from "react-icons/bs";

const Product = ({ product, handleAddToCart }) => {
  const [activeImage, setActiveImage] = useState(false);
  const { id, color, name, pairImage, price, quantity, sideImage } = product;

  return (
    <div
      onMouseEnter={() => setActiveImage(true)}
      onMouseLeave={() => setActiveImage(false)}
      className="product-card"
    >
      <div className="image-container">
        <img
          src={activeImage ? sideImage : pairImage}
          alt="image"
          className="product-image"
        />
      </div>
      <div className="product-info">
        <div>
          <p>
            {name} {color}
          </p>
          <small>${price}</small>
        </div>
        <div>
          <button onClick={() => handleAddToCart(product, id)}>
            <BsCartCheck size={25} />{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
