import React from 'react';
import AdminDashboard from '../AdminDashboard/AdminDashboard';
import useAuth from '../../../Hooks/useAuth';
import DonorDashboard from '../DonorDashboard/DonorDashboard';

const MainDashboard = () => {
    const { role } = useAuth()
    //console.log(role);

    return (
        <div>
            {role === 'admin' && <AdminDashboard />}
            {role === 'donor' && <DonorDashboard />}
            {/* {role === 'volunteer' && <VolunteerDashboard />} */}
        </div>
    );
};

export default MainDashboard;



