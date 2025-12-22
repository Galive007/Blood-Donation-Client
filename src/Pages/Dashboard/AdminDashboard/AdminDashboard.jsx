import React, { useEffect, useState } from 'react';
import { Users, Droplet, DollarSign } from "lucide-react";
import { useAxiosSecure } from '../../../Hooks/useAxiosSecure';
import Loading from '../../../Components/Loading';


const AdminDashboard = () => {
    const [donors, setDonors] = useState([])
    const [requests, setAllRequest] = useState([])
    const axiosSecure = useAxiosSecure()
    const [totalFunds,setTotalFunds]=useState([])
    const [loading, setLoading] = useState(true);




    const stats = [
        {
            title: "Total Donors",
            value: donors,
            icon: Users,
            bg: "bg-indigo-500",
        },
        {
            title: "Total Funding",
            value: totalFunds,
            icon: DollarSign,
            bg: "bg-emerald-500",
        },
        {
            title: "Blood Requests",
            value: requests,
            icon: Droplet,
            bg: "bg-rose-500",
        },
    ];

    useEffect(() => {
        axiosSecure.get('/admin/dashboard-stats')
            .then(res => {
                setDonors(res.data.totalDonors);
                setAllRequest(res.data.totalBloodRequests);

            })
            .finally(() => setLoading(false));
    }, [axiosSecure])
    useEffect(() => {
        axiosSecure.get('/admin/total-funds')
            .then(res => {
                // console.log(res.data.totalFunds);
                setTotalFunds(res.data.totalFunds)
            })
            .finally(() => setLoading(false));
    }, [axiosSecure])

    if (loading) return <Loading></Loading>;
    return (
        <div>
            <div className='flex-row justify-center items-center'>
                <h1 className=''>MainDashboard</h1>
                <div className="p-6 space-y-8">
                    {/* ===== Welcome Section ===== */}
                    <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white p-6 shadow-lg">
                        <h1 className="text-2xl font-bold mb-1">
                            Welcome Back, Admin 👋
                        </h1>
                        <p className="text-sm opacity-90">
                            Here’s what’s happening in your blood donation platform today.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {stats.map(({ title, value, icon: Icon, bg }) => (
                            <div
                                key={title}
                                className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition-all"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">{title}</p>
                                        <h2 className="text-3xl font-bold text-gray-800 mt-1">
                                            {value}
                                        </h2>
                                    </div>

                                    <div
                                        className={`w-12 h-12 flex items-center justify-center rounded-xl text-white ${bg}`}
                                    >
                                        <Icon size={24} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;