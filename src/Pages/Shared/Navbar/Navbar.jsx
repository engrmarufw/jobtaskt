import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import ActiveLink from '../ActiveLink/ActiveLink';

const Navbar = () => {
    const { currentUser, logOut, carts, cartsIsLoading, cartsMultate } = useAuth()
    const handleLogout = () => {
        logOut()
    }
    return (
        <div>
            <div className="drawer">
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    {/* Navbar */}
                    <div className="w-full navbar bg-base-300">
                        <div className="flex-none lg:hidden">
                            <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                            </label>
                        </div>
                        <div className="flex-1 px-2 mx-2"><Link to="/">M-Commerece</Link></div>
                        <div className="flex-none  hidden lg:block">
                            <ul className="menu menu-horizontal items-center gap-4">
                                <li><ActiveLink to="/">Products</ActiveLink></li>
                                {
                                    currentUser?.email && <li><ActiveLink to="/addnewproduct">Add New Product</ActiveLink></li>
                                }

                                <li><ActiveLink to="/carts"><FontAwesomeIcon className='text-xl' icon={faCartShopping} />  <div className="badge absolute top-0 right-0 bg-blue-500 text-white w-5 h-5 flex items-center justify-center rounded-full">
                                    {
                                        cartsIsLoading ? '0' : carts?.length
                                    }
                                </div></ActiveLink></li>

                                {
                                    currentUser?.email ? <div className="">
                                        <li> <a onClick={handleLogout} className="bg-blue-400 font-bold text-white hover:bg-blue-500">Logout</a></li>
                                    </div> : <div className="">
                                        <li> <Link to="/login" className="bg-blue-400 font-bold text-white hover:bg-blue-500">Login</Link></li>
                                    </div>
                                }
                            </ul>

                        </div>
                    </div>


                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-base-200">
                        <li><ActiveLink to="/">Home</ActiveLink></li>
                        <li><ActiveLink to="/login">Login</ActiveLink></li>
                        <li><ActiveLink to="/registration">Register</ActiveLink></li>
                        {
                            currentUser?.email && <li><ActiveLink to="/dashboard">Dashboard</ActiveLink></li>
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;