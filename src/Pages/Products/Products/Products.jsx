import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './Product.css';
const Products = () => {
    const { products, productsIsLoading, productsMultate, carts, cartsIsLoading, cartsMultate } = useAuth();
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [showsize, setshowsize] = useState(false);
    useEffect(() => {
        if (products && products.length > 0) {
            const defaultVariant = products[0].variants[0]; // Assuming at least one product and one variant
            setSelectedColor(defaultVariant.color);
            setSelectedSize(defaultVariant.size);

        }
    }, [products]);
    const handleColorClick = (color) => {
        setshowsize(true)
        setSelectedColor(color);
    };

    const handleSizeChange = (event) => {
        setSelectedSize(event.target.value);
    };

    const handleAddToCart = (product) => {
        const existingCartItem = carts.find((cartItem) => {
            return (
                cartItem.selectedColor === selectedColor &&
                cartItem.selectedSize === selectedSize &&
                cartItem.product._id === product._id
            );
        });

        if (existingCartItem) {
            // If the product already exists in the cart, update the quantity
            const updatedCart = carts.map((cartItem) => {
                if (
                    cartItem.selectedColor === selectedColor &&
                    cartItem.selectedSize === selectedSize &&
                    cartItem.product._id === product._id
                ) {
                    return {
                        ...cartItem,
                        quantity: cartItem.quantity + 1,
                    };
                }
                return cartItem;
            });

            axios.put(`https://jobtaskt-server.vercel.app/carts/${existingCartItem._id}`, { quantity: existingCartItem.quantity + 1 })
                .then(res => {
                    setshowsize(false);
                    cartsMultate();
                })
                .catch(error => {
                    console.error('Error updating quantity:', error);
                });
        } else {
            // If the product does not exist in the cart, add a new cart item
            const newCartItem = {
                selectedColor,
                selectedSize,
                quantity: 1,
                product,
            };

            axios.post(`https://jobtaskt-server.vercel.app/carts`, newCartItem)
                .then(res => {
                    setshowsize(false);
                    cartsMultate();
                })
                .catch(error => {
                    console.error('Error adding to cart:', error);
                });
        }
    };
    return (
        <div>
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {products?.map((product) => (
                        <div key={product?._id} className="pro_card card flex flex-col justify-center p-5 bg-white rounded-lg shadow-2xl">
                            <Link to={`/products/view/${product?._id}`}>
                                <div className="prod-title">
                                    <p className="text-xl uppercase text-gray-900 font-bold">{product?.title.slice(0, 10)}...</p>
                                    <p className="uppercase text-sm text-gray-400">
                                        <span dangerouslySetInnerHTML={{ __html: product?.shortDetails.slice(0, 20) }}></span>
                                    </p>
                                </div>
                                <div className="flex justify-center my-2">
                                    <div className="prod-img w-[11rem] h-[11rem] border-4 overflow-hidden">
                                        <img
                                            src={product?.images[0]}
                                            className="w-full object-cover object-center transition ease-in duration-200 hover:scale-125"
                                            alt={product?.title}
                                        />
                                    </div>
                                </div>
                            </Link>
                            <div className="prod-info grid gap-3">
                                <div className='variants'>
                                    <ul className="flex flex-row justify-center items-center">
                                        {product?.variants.map((variant, index) => (
                                            <li key={index} className="mr-4 last:mr-0">
                                                <span
                                                    onClick={() => handleColorClick(variant.color)}
                                                    className={`block p-1 border-4 ${selectedColor === variant.color ? 'border-black' : 'border-gray-500'
                                                        }  hover:border-gray-500 rounded-full transition ease-in duration-300`}
                                                >
                                                    <a
                                                        href="#blue"
                                                        style={{ backgroundColor: variant.color }}
                                                        className="block w-4 h-4 rounded-full"
                                                    ></a>
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                    {
                                        showsize && <select
                                            className="select select-bordered w-full select-xs mt-2"
                                            onChange={handleSizeChange}
                                        >
                                            {product?.variants.map((variant, index) => (
                                                <option key={index}>{variant.size}</option>
                                            ))}
                                        </select>
                                    }

                                </div>
                                <div className="flex flex-col md:flex-row justify-between items-center text-gray-900">
                                    <p className="font-bold text-xl">{product?.price} $</p>
                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        className="px-6 py-2 transition ease-in duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none"
                                    >
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Products;
