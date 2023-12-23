import axios from 'axios';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Registration = () => {
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target);
        const name = formData.get("name");
        const email = formData.get("email");
        const password = formData.get("password");
        const user = {
            name,
            email,
            password
        }


        axios.post('https://jobtaskt-server.vercel.app/users', user)
            .then(res => {
                if (res.data === 'userexists') {
                    document.getElementById('my_modal_4').close()
                    Swal.fire(
                        'Done',
                        'User Already Exist With This Email Address',
                        'error'
                    )
                }
                else {
                    Swal.fire(
                        'Done',
                        'Welcome the world of Mcommarce',
                        'success'
                    )
                    navigate('/login')
                }
            })

    }
    return (
        <div className='flex items-center justify-center h-screen'>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form onSubmit={handleSubmit} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input name='name' type="name" placeholder="Name" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input name='email' type="email" placeholder="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input name='password' type="password" placeholder="password" className="input input-bordered" required />

                    </div>
                    <div className="form-control mt-6">
                        <input type="submit" value="Register" className='btn btn-primary' />
                    </div>
                    <p>Already have an account?   <Link className="label-text-alt link link-hover" to='/login'>Login</Link></p>

                </form>
            </div>
        </div>
    );
};

export default Registration;