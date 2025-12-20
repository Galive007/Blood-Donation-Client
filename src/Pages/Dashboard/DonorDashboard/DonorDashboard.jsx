import React, { useEffect, useState } from 'react';
import { useAxiosSecure } from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const DonorDashboard = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const [recentRequests, setRecentRequests] = useState([]);

    useEffect(() => {
        axiosSecure.get('/donor/recent-requests')
            .then(res => setRecentRequests(res.data))
            .catch(err => console.log(err));
    }, [axiosSecure]);

    const updateStatus = (id, newStatus) => {
        axiosSecure.patch(`/requests/${id}/status`, { status: newStatus })
            .then(res => {
                Swal.fire('Success', `Donation marked as ${newStatus}`, 'success');
                setRecentRequests(prev => prev.map(r => r._id === id ? { ...r, donation_status: newStatus } : r));
                console.log(res);
                
            })
            .catch(err => console.log(err));
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This will delete the donation request!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/requests/${id}`)
                    .then(() => {
                        Swal.fire('Deleted!', 'Donation request has been deleted.', 'success');
                        setRecentRequests(prev => prev.filter(r => r._id !== id));
                    });
            }
        });
    };

    const handleEdit = (id) => navigate(`/dashboard/edit-request/${id}`);
    const handleView = (id) => navigate(`/dashboard/view-request/${id}`);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Welcome Back, {user?.displayName} 👋</h1>

            {recentRequests.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Index</th>
                                <th>Recipient Name</th>
                                <th>Location</th>
                                <th>Blood Group</th>
                                <th>Donation Date/Time</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentRequests.map((r, index) => (
                                <tr key={r._id}>
                                    <td>{index + 1}</td>
                                    <td>{r.recipientName}</td>
                                    <td>{r.district}, {r.upazila}</td>
                                    <td>{r.blood}</td>
                                    <td>{r.donationDate} {r.donationTime}</td>
                                    <td>{r.donation_status}</td>
                                    <td className="flex gap-2">
                                        {r.donation_status === 'inprogress' && (
                                            <>
                                                <button onClick={() => updateStatus(r._id, 'done')} className="btn btn-success btn-xs">Done</button>
                                                <button onClick={() => updateStatus(r._id, 'canceled')} className="btn btn-error btn-xs">Cancel</button>
                                                <button onClick={() => handleEdit(r._id)} className="btn btn-warning btn-xs">Edit</button>
                                            </>
                                        )}
                                        <button onClick={() => handleView(r._id)} className="btn btn-primary btn-xs">View</button>
                                        {r.donation_status === 'pending' && (
                                            <button onClick={() => handleDelete(r._id)} className="btn btn-error btn-xs">Delete</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="mt-4">
                        <button onClick={() => navigate('/dashboard/my-request')} className="btn btn-outline">View All Requests</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DonorDashboard;
