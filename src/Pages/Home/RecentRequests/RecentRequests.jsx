import React, { useEffect, useState } from 'react';
import MyContainer from '../../../Components/MyContainer';
import { useAxios } from '../../../Hooks/useAxios';

const RecentRequests = () => {
    const [latestRequests, setLatestRequests] = useState([]);
    const axiosInstance = useAxios();

    useEffect(() => {
        axiosInstance.get('/recent-request')
            .then(res => setLatestRequests(res.data || []))
            .catch(err => console.error(err));
    }, [axiosInstance]);

    return (
        <section className="py-16">
            <MyContainer>
                <h2 className="text-3xl font-bold text-center mb-10">
                    Recent Blood Requests
                </h2>

                <div className="grid md:grid-cols-3 gap-6">
                    {latestRequests.map(request => (
                        <div key={request._id} className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h3 className="card-title text-primary">
                                    {request.blood} Blood Needed
                                </h3>
                                <p>📍 {request.hospital}</p>
                                <p>⏰ {request.message}</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary btn-sm">
                                        Donate Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </MyContainer>
        </section>
    );
};

export default RecentRequests;
