import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React from 'react';
import Swal from 'sweetalert2';
import useAuth from '../hooks/useAuth';

const Carts = () => {
    const { carts, cartsIsLoading, cartsMultate } = useAuth();
    const handleIncrease = (id, quantity) => {
        if (quantity) {
            axios.put(`https://jobtaskt-server.vercel.app/carts/${id}`, { quantity: quantity + 1 })
                .then(res => {
                    cartsMultate();
                })
                .catch(error => {
                    console.error('Error updating quantity:', error);
                });
        }
    };

    const handleDecrease = (id, quantity) => {
        if (quantity > 1) {
            axios.put(`https://jobtaskt-server.vercel.app/carts/${id}`, { quantity: quantity - 1 })
                .then(res => {
                    cartsMultate();
                })
                .catch(error => {
                    console.error('Error updating quantity:', error);
                });
        }
    };
    const handleRemove = (id) => {
        Swal.fire({
            icon: "warning",
            title: "Do you want to save the changes?",
            showCancelButton: true,
            confirmButtonText: "yes",
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axios.delete(`https://jobtaskt-server.vercel.app/carts/${id}`)
                    .then(res => {
                        if (res.data.deletedCount === 1) {
                            cartsMultate()
                            Swal.fire("deleted!", "", "success");
                        }
                    })

            } else if (result.isDenied) {
                Swal.fire("Something Went wrong", "", "info");
            }
        });

    }

    const totalCartItems = carts?.reduce((total, cart) => total + cart?.quantity, 0);
    const totalPrice = carts?.reduce((total, cart) => total + (cart?.product?.price * cart?.quantity), 0);
    return (
        <div>
            <div className="container">
                <div class="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="col-span-9">
                        <div className="my-2">
                            {
                                carts?.map(cart => (
                                    <div className="my-2 border-2 p-2 rounded-lg flex items-center justify-between">
                                        <div className="flex items-center gap-2 ">
                                            <div className="a">
                                                {
                                                    cart?.product?.images && <img className='w-20' src={cart?.product.images[0]} alt="" />
                                                }
                                            </div>

                                            <div className="a">
                                                <p className='font-bold'>
                                                    {cart?.product?.title}
                                                </p>
                                                <p className='font-bold'>
                                                    {cart?.product?.price}
                                                </p>
                                                <p>
                                                    {cart?.selectedColor}
                                                </p>
                                                <p className='font-bold'>
                                                    {cart?.selectedSize}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4 items-center">
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    className="border-2 rounded-[50%] hover:bg-gray-100  h-[2rem] w-[2rem] felx items-center justify-center"
                                                    onClick={() => handleDecrease(cart?._id, cart?.quantity)}
                                                >
                                                    <FontAwesomeIcon icon={faMinus} />
                                                </button>
                                                <span className='px-[1.5rem] py-1 border-2 rounded-lg bg-gray-100 font-black'>{cart?.quantity}</span>
                                                <button
                                                    className="border-2 rounded-[50%] hover:bg-gray-100  h-[2rem] w-[2rem] felx items-center justify-center"
                                                    onClick={() => handleIncrease(cart?._id, cart?.quantity)}
                                                >
                                                    <FontAwesomeIcon icon={faPlus} />
                                                </button>
                                            </div>
                                            <button onClick={() => handleRemove(cart?._id)} className="btn btn-error">Remove</button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="col-span-3">
                        <h2 className="font-bold text-xl mb-2">Cart Summary</h2>

                        <div className="flex items-center justify-between">
                            <p className='font-bold'>Total Cart Items: </p>
                            <p className='font-bold'>{totalCartItems}</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className='font-bold'>Total Price: </p>
                            <p className='font-bold'>$ {totalPrice?.toFixed(2)}</p>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Carts;