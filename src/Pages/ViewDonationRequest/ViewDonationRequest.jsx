import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useAxiosSecure } from '../../Hooks/useAxiosSecure';
import Loading from '../../Components/Loading';
import { MapPin, Calendar, Clock, Hospital } from 'lucide-react';

const ViewDonationRequest = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const [request, setRequest] = useState(null);

    useEffect(() => {
        axiosSecure.get(`/requests/${id}`)
            .then(res => setRequest(res.data))
            .catch(err => console.error(err));
    }, [axiosSecure, id]);

    if (!request) {
        return <Loading />;
    }

    const statusColor = {
        pending: "badge-warning",
        inprogress: "badge-info",
        done: "badge-success"
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <div className="card bg-base-100 shadow-md border border-base-300">
                <div className="card-body">

                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-3xl font-bold text-red-600">
                            {request.blood}
                        </span>
                        <span className={`badge ${statusColor[request.donation_status]}`}>
                            {request.donation_status}
                        </span>
                    </div>

                    {/* Recipient */}
                    <h2 className="text-xl font-semibold mb-2">
                        Recipient: {request.recipientName}
                    </h2>

                    {/* Hospital */}
                    {request.hospital && (
                        <div className="flex items-center gap-2 text-gray-600 mb-1">
                            <Hospital size={16} />
                            <span>{request.hospital}</span>
                        </div>
                    )}

                    {/* Location */}
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <MapPin size={16} />
                        <span>{request.upazila}, {request.district}</span>
                    </div>

                    {/* Date & Time */}
                    <div className="flex items-center gap-4 text-gray-600 mt-2">
                        <div className="flex items-center gap-1">
                            <Calendar size={16} />
                            {request.donationDate}
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock size={16} />
                            {request.donationTime}
                        </div>
                    </div>

                    {/* Optional Actions */}
                    <div className="card-actions justify-end mt-4">
                        {/* You can add buttons here if needed */}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ViewDonationRequest;
