
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { useAxios } from '../../Hooks/useAxios';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const axiosInstance = useAxios();

    const sessionId = searchParams.get('session_id');

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!sessionId) {
            setError(true);
            setLoading(false);
            return;
        }

        axiosInstance
            .post(`/success-payment?session_id=${sessionId}`)
            .then(() => {
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    }, [axiosInstance, sessionId]);

    /* ---------------- LOADING ---------------- */
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    /* ---------------- ERROR ---------------- */
    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-base-200">
                <div className="bg-base-100 p-8 rounded-xl shadow-lg text-center max-w-md">
                    <AlertCircle className="mx-auto text-error" size={64} />
                    <h2 className="text-2xl font-bold mt-4 text-error">
                        Payment Error
                    </h2>
                    <p className="text-gray-600 mt-2">
                        Payment completed, but confirmation failed.
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className="btn btn-error mt-6"
                    >
                        Go Home
                    </button>
                </div>
            </div>
        );
    }

    /* ---------------- SUCCESS ---------------- */
    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
            <div className="bg-base-100 max-w-md w-full p-8 rounded-2xl shadow-xl text-center">

                <CheckCircle size={80} className="mx-auto text-green-500" />

                <h1 className="text-3xl font-bold mt-4 text-green-600">
                    Payment Successful 🎉
                </h1>

                <p className="text-gray-600 mt-2">
                    Thank you for your donation.  
                    Your support helps save lives ❤️
                </p>

                <div className="mt-6 bg-base-200 p-4 rounded-lg">
                    <p className="text-sm font-semibold">Transaction ID</p>
                    <p className="text-xs break-all text-gray-500 mt-1">
                        {sessionId}
                    </p>
                </div>

                <div className="flex gap-4 mt-8">
                    <button
                        onClick={() => navigate('/')}
                        className="btn btn-outline btn-primary w-1/2"
                    >
                        Home
                    </button>

                    <button
                        onClick={() => navigate('/dashboard')}
                        className="btn btn-primary w-1/2"
                    >
                        Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;



// import React, { useEffect } from 'react';
// import { useSearchParams } from 'react-router';
// import { useAxios } from '../../Hooks/useAxios';

// const PaymentSuccess = () => {

//     const [searchParams]=useSearchParams()
//     const sessionId=searchParams.get('session_id')

//     const axiosInstance=useAxios()

//     useEffect(()=>{
//         axiosInstance.post(`/success-payment?session_id=${sessionId}`)
//         .then(res=>{
//             console.log('Payment recorded:', res.data);
//         })
//         .catch(err => {
//             console.error('Payment recording failed:', err.response?.data || err.message);
//         });
//     },[axiosInstance, sessionId])
//     return (
//         <div className='flex justify-center items-center min-h-screen'>
//             <h1>Payment Successfully Done</h1>
//         </div>
//     );
// };

// export default PaymentSuccess;