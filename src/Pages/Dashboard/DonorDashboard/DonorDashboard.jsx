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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosSecure.get('/donor/recent-requests')
            .then(res => setRecentRequests(res.data || []))
            .finally(() => setLoading(false));
    }, [axiosSecure]);

    const updateStatus = (id, status) => {
        axiosSecure.patch(`/requests/${id}/status`, { status })
            .then(() => {
                Swal.fire('Success', `Marked as ${status}`, 'success');
                setRecentRequests(prev =>
                    prev.map(r =>
                        r._id === id ? { ...r, donation_status: status } : r
                    )
                );
            })
            .catch(err =>
                Swal.fire('Error', err.response?.data?.message || 'Failed', 'error')
            );
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This request will be deleted',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it'
        }).then(result => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/requests/${id}`)
                    .then(() => {
                        Swal.fire('Deleted!', '', 'success');
                        setRecentRequests(prev => prev.filter(r => r._id !== id));
                    });
            }
        });
    };

    if (loading) return <p className="p-6">Loading...</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">
                Welcome Back, {user?.displayName} 👋
            </h1>

            {recentRequests.length === 0 ? (
                <p className="text-gray-500">No recent requests</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Recipient</th>
                                <th>Location</th>
                                <th>Blood</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {recentRequests.map((r, i) => (
                                <tr key={r._id}>
                                    <td>{i + 1}</td>
                                    <td>{r.recipientName}</td>
                                    <td>{r.district}, {r.upazila}</td>
                                    <td>{r.blood}</td>
                                    <td>{r.donationDate} {r.donationTime}</td>
                                    <td>
                                        <span className="badge badge-outline">
                                            {r.donation_status}
                                        </span>
                                    </td>

                                    <td className="flex gap-2 flex-wrap">
                                        {/* INPROGRESS ONLY */}
                                        {r.donation_status === 'inprogress' && (
                                            <>
                                                <button
                                                    onClick={() => updateStatus(r._id, 'done')}
                                                    className="btn btn-success btn-xs"
                                                >
                                                    Done
                                                </button>

                                                <button
                                                    onClick={() => updateStatus(r._id, 'canceled')}
                                                    className="btn btn-error btn-xs"
                                                >
                                                    Cancel
                                                </button>

                                                <button
                                                    onClick={() => navigate(`/dashboard/edit-request/${r._id}`)}
                                                    className="btn btn-warning btn-xs"
                                                >
                                                    Edit
                                                </button>
                                            </>
                                        )}

                                        {/* VIEW ALWAYS */}
                                        <button
                                            onClick={() => navigate(`/dashboard/view-request/${r._id}`)}
                                            className="btn btn-primary btn-xs"
                                        >
                                            View
                                        </button>

                                        {/* DELETE ONLY PENDING */}
                                        {r.donation_status === 'pending' && (
                                            <button
                                                onClick={() => handleDelete(r._id)}
                                                className="btn btn-error btn-xs"
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="mt-4">
                        <button
                            onClick={() => navigate('/dashboard/my-request')}
                            className="btn btn-outline"
                        >
                            View All Requests
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DonorDashboard;
