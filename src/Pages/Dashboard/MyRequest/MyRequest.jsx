import React, { useEffect, useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import { useAxios } from '../../../Hooks/useAxios';

const MyRequest = () => {
    const axiosinstance=useAxios()
    const {user}=useAuth()
    const [myRequest,setMyRequest]=useState([])

    useEffect(()=>{
        axiosinstance.get(`/my-request?email=${user?.email}`)
        .then(res=>{
            // console.log(res.data);
            setMyRequest(res.data)
        })
    },[axiosinstance, user?.email])

    console.log(myRequest);
    

    return (
        <div>
            <h1 className='text-center py-8 text-2xl font-bold'>My Donation Requests</h1>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <h1>Index</h1>
                            </th>
                            <th>recipient name</th>
                            <th>Location</th>
                            <th>Blood Group</th>
                            <th>Donation Date</th>
                            <th>Hospital Name</th>
                            
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            myRequest?.map((request, index) => <tr key={index}>
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    <div>
                                        <div className="font-bold">{request?.recipientName}</div>
                                        <div className="font-bold">{request?.email}</div>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <div className="font-bold">{request?.upazila} ,{request?.district}</div>

                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <div className="font-bold">{request?.blood}</div>
                                    </div>
                                </td>
                                <td>
                                    {request?.donationDate}
                                    <div>{request?.donationTime}</div>
                                </td>
                                <td>
                                    {request?.hospital}
                                </td>
                                <th>
                                    <button className="btn btn-ghost btn-xs">View</button>
                                </th>
                            </tr>)
                        }

                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default MyRequest;