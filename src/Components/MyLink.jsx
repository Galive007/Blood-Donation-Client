import React from 'react';
import { NavLink } from 'react-router';

const MyLink = ({ to, children, className }) => {
    return (

        <NavLink to={to} className={({ isActive }) => isActive ? "text-primary font-bold text-xl" : `${className}`}>{children}</NavLink>

    );
};
export default MyLink;