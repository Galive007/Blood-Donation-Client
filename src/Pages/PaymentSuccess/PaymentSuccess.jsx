import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { useAxios } from '../../Hooks/useAxios';

const PaymentSuccess = () => {

    const [searchParams]=useSearchParams()
    const sessionId=searchParams.get('session_id')

    const axiosInstance=useAxios()

    useEffect(()=>{
        axiosInstance.post(`/success-payment?session_id=${sessionId}`)
        .then(res=>{
            console.log('Payment recorded:', res.data);
        })
        .catch(err => {
            console.error('Payment recording failed:', err.response?.data || err.message);
        });
    },[axiosInstance, sessionId])
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <h1>Payment Successfully Done</h1>
        </div>
    );
};

export default PaymentSuccess;