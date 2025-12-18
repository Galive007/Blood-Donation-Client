import React, { useEffect, useState } from 'react';
import { useAxios } from '../../../Hooks/useAxios';
import useAuth from '../../../Hooks/useAuth';

const ManageRequest = () => {
    const [requests, setRequests] = useState([])
    const axiosinstance = useAxios()
    const { user } = useAuth()
    // console.log(user);


    useEffect(() => {
        axiosinstance.get(`/donor/requests/${user?.email}`)
            .then(res => {
                setRequests(res.data)
            })
            .catch(err => {
                console.log(err);

            })
    }, [axiosinstance, user?.email])

    // console.log(requests);



    return (
        <div>
            <h1 className='text-center py-8 text-2xl font-bold'>Manage Request</h1>

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
                            requests?.map((request, index) => <tr key={index}>
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    <div>
                                        <div className="font-bold">{request?.recipientName}</div>
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

export default ManageRequest;