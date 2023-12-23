import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const ViewProduct = () => {
    const { cartsMultate, carts } = useAuth()
    const { productID } = useParams()
    const [data, setData] = useState()
    const [quantity, setQuantity] = useState(1)
    useEffect(() => {
        axios.get(`http://localhost:5000/products/${productID}`)
            .then(res => {
                setData(res.data)
            })

    }, [productID]);



    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);

    useEffect(() => {
        if (data) {
            const defaultVariant = data.variants[0]; // Assuming at least one product and one variant
            setSelectedColor(defaultVariant.color);
            setSelectedSize(defaultVariant.size);

        }
    }, [data]);

    const handleColorClick = (color) => {
        setSelectedColor(color);
    };

    const handleSizeChange = (event) => {
        setSelectedSize(event.target.value);
    };


    const handleIncrease = () => {
        if (quantity) {
            setQuantity(quantity + 1)
        }
    };

    const handleDecrease = (id, quantity) => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    };
    const handleAddToCart = (product) => {
        const cart = {
            selectedColor,
            selectedSize,
            quantity,
            product,
        };
        const isexist = carts?.find(item => item?.selectedColor === selectedColor && item?.selectedSize === selectedSize && item?.product?._id === product._id);
        if (isexist) {
            axios.put(`http://localhost:5000/carts/${isexist?._id}`, { quantity: parseInt(isexist?.quantity) + quantity })
                .then(res => {
                    cartsMultate();
                })
                .catch(error => {
                    console.error('Error updating quantity:', error);
                });

        }
        else {
            axios.post(`http://localhost:5000/carts`, cart)
                .then(res => {
                    if (res.data.insertedId) {
                        cartsMultate()
                    }

                })
        }


    };
    return (
        <div>
            <div>
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center">
                        <div className="flex items-center gap-4 ">
                            <div className="w-[74.88px]">
                                {data?.images.map((image, index) => (
                                    <img
                                        key={index}
                                        className={`w-100 my-8 cursor-pointer  ${index === selectedImage ? '' : 'opacity-40'}`}
                                        src={image}
                                        alt={`Product Image ${index}`}
                                        onClick={() => handleImageClick(index)}
                                    />
                                ))}
                            </div>
                            <div className="w-[413px] overflow-hidden">
                                <img

                                    className={`w-100 transition duration-300 ease-in-out`}
                                    src={data?.images[selectedImage]}
                                />
                            </div>
                        </div>


                        <div className="a">
                            <h3 className="text-2xl font-bold">{data?.title}</h3>
                            <div className="flex items-center text-xl mt-[1.5rem] mb-[0.5rem]">
                                <p className='me-2'>${data?.price}</p>
                            </div>
                            <div className='variants'>
                                <div className="flex items-center mb-[0.5rem]">
                                    <p className='me-2'>Selected Color:</p>
                                    <ul className="flex flex-row justify-center items-center">
                                        {data?.variants.map((variant, index) => (
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
                                </div>

                                <select
                                    className="select select-bordered w-full select-xs mt-2"
                                    onChange={handleSizeChange}
                                >
                                    {data?.variants.map((variant, index) => (
                                        <option key={index}>{variant.size}</option>
                                    ))}
                                </select>

                            </div>

                            <p className='my-4' dangerouslySetInnerHTML={{ __html: data?.shortDetails }} ></p>


                            <div className="flex items-center space-x-2">
                                <button
                                    className="border-2 rounded-[50%] hover:bg-gray-100  h-[2rem] w-[2rem] felx items-center justify-center"
                                    onClick={() => handleDecrease()}
                                >
                                    <FontAwesomeIcon icon={faMinus} />
                                </button>
                                <span className='px-[1.5rem] py-1 border-2 rounded-lg bg-gray-100 font-black'>{quantity}</span>
                                <button
                                    className="border-2 rounded-[50%] hover:bg-gray-100  h-[2rem] w-[2rem] felx items-center justify-center"
                                    onClick={() => handleIncrease()}
                                >
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                            </div>
                            {data && <button
                                onClick={() => handleAddToCart(data)}
                                className="px-6 py-2 transition ease-in duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none"
                            >
                                Add to cart
                            </button>

                            }

                        </div>
                    </div>

                    <div className='my-4' dangerouslySetInnerHTML={{ __html: data?.longDetails }}></div>
                </div>
            </div>
        </div>
    );
};

export default ViewProduct;