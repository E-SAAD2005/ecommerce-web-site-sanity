'use client';

import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { urlFor } from '../../../lib/client';
import Products from '../../../componenet/Product';
import { useStateContext } from '../../../context/StateContext';  // ← استيراد الـ hook

const ProductClient = ({ product, products }) => {
  const [index, setIndex] = useState(0);
  const [qty, setQty] = useState(1);
  
  // ← استخدام Context
  const { onAdd, setShowCart } = useStateContext();

  if (!product) {
    return (
      <div className='product-detail-container' style={{ padding: '40px' }}>
        <h1>Chargement...</h1>
      </div>
    );
  }

  const { image, name, details, price } = product;

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => (prevQty - 1 < 1 ? 1 : prevQty - 1));
  };

  const handleAddToCart = () => {
    onAdd(product, qty);
  };

  const handleBuyNow = () => {
    onAdd(product, qty);
    setShowCart(true);  // فتح السلة مباشرة
  };

  return (
    <div>
      <div className='product-detail-container'>
        <div>
          <div className='image-container'>
            {image && image.length > 0 && image[index] ? (
              <img 
                src={urlFor(image[index]).url()} 
                alt={name}
                className='product-detail-image'
              />
            ) : (
              <p>Aucune image disponible</p>
            )}
          </div>

          <div className='small-images-container'>
            {image && image.length > 0 ? (
              image.map((img, i) => (
                <img 
                  key={i} 
                  src={urlFor(img).url()} 
                  alt={`${name} ${i + 1}`}
                  className={i === index ? 'small-image selected-image' : 'small-image'}
                  onMouseEnter={() => setIndex(i)}
                />
              ))
            ) : null}
          </div>
        </div>

        <div className='product-detail-desc'>
          <h1>{name}</h1>
          
          <div className='reviews'>
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
            <p>(20)</p>
          </div>
          
          <h4>Détails:</h4>
          <p>{details}</p>
          
          <p className='price'>MAD {price}</p>
          
          <div className='quantity'>
            <h3>Quantité :</h3>
            <p className='quantity-desc'>
              <span className='minus' onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className='num'>{qty}</span>
              <span className='plus' onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>

          <div className='buttons'>
            <button 
              type="button" 
              className='add-to-cart' 
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <button 
              type="button" 
              className='buy-now' 
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {products && products.length > 0 && (
        <div className='maylike-product-wrapper'>
          <h2>You may also like</h2>
          <div className='marquee'>
            <div className='maylike-products-container track'>
              {products.map((item) => (
                <Products key={item._id} product={item} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductClient;