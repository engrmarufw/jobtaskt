import React from 'react';
import { NavLink } from 'react-router-dom';

const ActiveLink = ({ children, to }) => {
    return (
        <NavLink to={to} activeClassName="active">
            {children}
        </NavLink>
    );
};

export default ActiveLink;
