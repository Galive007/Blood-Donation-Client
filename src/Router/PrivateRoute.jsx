import React from 'react';
import useAuth from '../Hooks/useAuth';

import { Navigate, useLocation } from 'react-router';
import Loading from '../Components/Loading';

const PrivateRoute = ({ children }) => {
    const location = useLocation()
    // console.log(location);

    const { user, loading, roleLoading, userStatus } = useAuth()
    // console.log(userStatus);
    
    if (loading || roleLoading) {
        return <Loading></Loading>
    }
    if (!user || !userStatus == 'active') {
        return <Navigate state={location.pathname} to='/login'></Navigate>
    }

    return children
};

export default PrivateRoute;