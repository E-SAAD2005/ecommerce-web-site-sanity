'use client';

import React, { createContext, useContext, useState } from "react";
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
    };

    const decQty = () => {
        setQty((prevQty) => (prevQty - 1 < 1 ? 1 : prevQty - 1));
    };

    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id);
        
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
        
        if (checkProductInCart) {
            const updatedCartItems = cartItems.map((cartProduct) => {
                if (cartProduct._id === product._id) {
                    return {
                        ...cartProduct,
                        quantity: cartProduct.quantity + quantity
                    };
                }
                return cartProduct;
            });
            setCartItems(updatedCartItems); 
        } else {
             product.quantity = quantity;
            setCartItems([...cartItems, { ...product }]);
        }
        
        toast.success(`${quantity} x ${product.name} ajouté au panier!`);
    };

    const onRemove = (product) => {
        const foundProduct = cartItems.find((item) => item._id === product._id);
        const newCartItems = cartItems.filter((item) => item._id !== product._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity);
        setCartItems(newCartItems);
    };

    const toggleCartItemQuantity = (id, value) => {
        const foundProduct = cartItems.find((item) => item._id === id);
        const index = cartItems.findIndex((product) => product._id === id);
        const newCartItems = [...cartItems];

        if (value === 'inc') {
            newCartItems[index] = { ...foundProduct, quantity: foundProduct.quantity + 1 };
            setCartItems(newCartItems);
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
            setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
        } else if (value === 'dec') {
            if (foundProduct.quantity > 1) {
                newCartItems[index] = { ...foundProduct, quantity: foundProduct.quantity - 1 };
                setCartItems(newCartItems);
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
                setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
            }
        }
    };

    return (
        <Context.Provider 
            value={{
                showCart,
                setShowCart,
                cartItems,
                setCartItems,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
                onAdd,
                onRemove,
                toggleCartItemQuantity
            }}
        >
            {children}
        </Context.Provider>
    );
};

export const useStateContext = () => useContext(Context);