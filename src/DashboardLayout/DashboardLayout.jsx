import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Aside from '../Components/Aside/Aside';
import Aside1 from '../Components/Aside/Aside1';

const DashboardLayout = () => {
    return (
        <div className='flex'>
            <Aside1></Aside1>
            {/* <Aside></Aside> */}
            <div className='flex-1 p-5'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashboardLayout;