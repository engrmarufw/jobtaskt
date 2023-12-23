import React from 'react';
import { Link } from 'react-router-dom';

const ManageProducts = () => {
    return (
        <div>
            <div className="a">
                <Link to='/dashboard/addnewproduct'><button className="btn">Add New Product</button></Link>
                <input type="text" placeholder="Type here" className="input w-full max-w-xs" />
            </div>
        </div>
    );
};

export default ManageProducts;