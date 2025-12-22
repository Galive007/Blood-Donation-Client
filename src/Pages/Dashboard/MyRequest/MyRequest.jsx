import React, { useEffect, useState } from 'react';
import { useAxiosSecure } from '../../../Hooks/useAxiosSecure';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import Loading from '../../../Components/Loading';

const MyRequest = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [myRequest, setMyRequest] = useState([]);
    const [totalRequest, setTotalRequest] = useState(0);
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const fetchRequests = async () => {
        try {
            const res = await axiosSecure.get(
                `/my-request?page=${currentPage - 1}&size=${itemsPerPage}`
            );
            setMyRequest(res.data.request);
            setTotalRequest(res.data.totalRequest);
            setLoading(false);
        } catch (error) {
            Swal.fire('Error', 'Failed to load requests', error);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, [currentPage]);

    const numberOfPages = Math.ceil(totalRequest / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()].map(p => p + 1);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This request will be deleted!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosSecure.delete(`/requests/${id}`);
                Swal.fire('Deleted!', 'Request removed', 'success');
                fetchRequests();
            }
        });
    };

    const statusBadge = (status) => {
        switch (status) {
            case 'pending':
                return 'badge badge-warning';
            case 'inprogress':
                return 'badge badge-info';
            case 'done':
                return 'badge badge-success';
            case 'canceled':
                return 'badge badge-error';
            default:
                return 'badge';
        }
    };

    if (loading) return <Loading></Loading>;

    return (
        <div className="p-4">
            <h1 className="text-center py-6 text-2xl font-bold">
                My Donation Requests
            </h1>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Recipient</th>
                            <th>Location</th>
                            <th>Blood</th>
                            <th>Date</th>
                            <th>Hospital</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {myRequest.map((request, index) => (
                            <tr key={request._id}>
                                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                <td>{request.recipientName}</td>
                                <td>{request.upazila}, {request.district}</td>
                                <td>{request.blood}</td>
                                <td>
                                    {request.donationDate}
                                    <div className="text-sm">{request.donationTime}</div>
                                </td>
                                <td>{request.hospital}</td>
                                <td>
                                    <span className={statusBadge(request.donation_status)}>
                                        {request.donation_status}
                                    </span>
                                </td>
                                <td className="flex gap-2 flex-wrap">
                                    <button
                                        onClick={() => navigate(`/dashboard/view-request/${request._id}`)}
                                        className="btn btn-ghost btn-xs"
                                    >
                                        View
                                    </button>

                                    {(request.donation_status === 'pending' ||
                                        request.donation_status === 'inprogress') && (
                                        <button
                                            onClick={() => navigate(`/dashboard/edit-request/${request._id}`)}
                                            className="btn btn-warning btn-xs"
                                        >
                                            Edit
                                        </button>
                                    )}

                                    {request.donation_status === 'pending' && (
                                        <button
                                            onClick={() => handleDelete(request._id)}
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
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-6">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="btn btn-sm"
                >
                    Prev
                </button>

                {pages.map(page => (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`btn btn-sm ${page === currentPage ? 'btn-primary' : ''}`}
                    >
                        {page}
                    </button>
                ))}

                <button
                    disabled={currentPage === numberOfPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="btn btn-sm"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default MyRequest;
