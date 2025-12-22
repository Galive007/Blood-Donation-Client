import React, { useEffect, useState } from 'react';
// import { useAxiosSecure } from '../../../Hooks/useAxiosSecure';
import Loading from '../../../Components/Loading';
import BloodRequestCard from '../../../Components/BloodRequestCard/BloodRequestCard';
import useAuth from '../../../Hooks/useAuth';
import MyContainer from '../../../Components/MyContainer';
import { useAxios } from '../../../Hooks/useAxios';

const AllRequest = () => {
    const [loading, setLoading] = useState(true)
    const [allRequest, setAllRequest] = useState([])
    const axiosInstance=useAxios()
    const {role}=useAuth()
    // const axiosSecure = useAxiosSecure();
    useEffect(() => {
        axiosInstance.get('/all-requests')
            .then(res => {
                // console.log(res.data);
                setAllRequest(res.data)
                setLoading(false)
            })
            
    }, [axiosInstance])
    console.log(allRequest);
    if (loading) return <Loading></Loading>;

    return (
        <div className='py-8'>
            <MyContainer>
                <h1 className='text-center text-2xl font-bold'>All Requests</h1>
            <div className="grid grid-cols-1 pt-5 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    allRequest.map(req => (
                        <BloodRequestCard
                            key={req._id}
                            request={req}
                            role={role}
                        />
                    ))
                }
            </div>
            </MyContainer>
        </div>
    );
};

export default AllRequest;