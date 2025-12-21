import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useAxiosSecure } from '../../Hooks/useAxiosSecure';


const ViewDonationRequest = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const [request, setRequest] = useState(null);

    useEffect(() => {
        axiosSecure.get(`/requests/${id}`)
            .then(res => setRequest(res.data));
    }, [axiosSecure, id]);

    console.log(request);
    
    if (!request) {
        return <p className="p-6">Loading...</p>;
    }

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Donation Request Details</h2>

            <div className="space-y-2">
                <p><strong>Recipient:</strong> {request.recipientName}</p>
                <p><strong>Blood Group:</strong> {request.blood}</p>
                <p><strong>Location:</strong> {request.district}, {request.upazila}</p>
                <p><strong>Date:</strong> {request.donationDate}</p>
                <p><strong>Time:</strong> {request.donationTime}</p>
                <p><strong>Status:</strong> {request.donation_status}</p>
            </div>
        </div>
    );
};

export default ViewDonationRequest;
