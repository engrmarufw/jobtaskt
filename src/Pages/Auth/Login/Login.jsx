import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Login = () => {
    const { loginwithemailpass } = useAuth()
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target);
        const email = formData.get("email");
        const password = formData.get("password");
        const user = {
            email,
            password
        }

        loginwithemailpass(user)
            .then(message => {
                navigate(from, { replace: true });
                window.location.reload()
            })
            .catch(error => {
                console.error(error);
            });


    }
    return (
        <div className='flex items-center justify-center h-screen'>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <h2 className="text-xl font-bold text-center my-4">Welcome</h2>


                <form onSubmit={handleSubmit} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input name='email' type="text" placeholder="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input name='password' type="password" placeholder="password" className="input input-bordered" required />

                    </div>
                    <div className="form-control mt-6">
                        <input type="submit" value="Login" className='btn btn-primary' />
                    </div>
                    <p>Don't have any account?   <Link className="label-text-alt link link-hover" to='/registration'>Register</Link></p>
                </form>
            </div>
        </div>
    );
};

export default Login;