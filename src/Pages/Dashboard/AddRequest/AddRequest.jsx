import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import useAuth from '../../../Hooks/useAuth';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useAxiosSecure } from '../../../Hooks/useAxiosSecure';
import Loading from '../../../Components/Loading';

const AddRequest = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [dbUser, setDbUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);

    const [upazilas, setUpazilas] = useState([]);
    const [districts, setDistricts] = useState([]);

    useEffect(() => {
        axios.get('/upazilas.json').then(res => setUpazilas(res.data.upazilas));
        axios.get('/districts.json').then(res => setDistricts(res.data.districts));
    }, []);

    useEffect(() => {
        if (user?.email) {
            axiosSecure.get('/users/me')
                .then(res => setDbUser(res.data))
                .finally(() => setLoadingUser(false));
        }
    }, [user, axiosSecure]);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        await axiosSecure.post('/add-requests', data)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire("Success", "Request Successful", "success");
                    reset();
                }
            })
            .catch(err => {
                if (err.response?.status === 403) {
                    Swal.fire("Blocked", "You are blocked by admin", "error");
                } else {
                    Swal.fire("Error", "Something went wrong", "error");
                }
            });
    };

    if (loadingUser) {
        return <Loading></Loading>;
    }

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h2 className="text-2xl font-bold text-center mb-6">Blood Donation Request</h2>

            {dbUser?.status === 'blocked' && (
                <p className="text-red-600 text-center mb-4">
                    You are blocked by admin and cannot create donation requests.
                </p>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input readOnly {...register("displayName")} value={user?.displayName} className="input w-full input-bordered" />
                <input readOnly {...register("email")} value={user?.email} className="input w-full input-bordered" />

                <input {...register("recipientName", { required: true })} placeholder="Recipient Name" className="input w-full input-bordered" />
                <select {...register("blood", { required: true })} className="select w-full select-bordered">
                    <option value="">Select Blood</option>
                    <option>A+</option><option>A-</option><option>B+</option><option>B-</option>
                    <option>AB+</option><option>AB-</option><option>O+</option><option>O-</option>
                </select>

                <select {...register("district", { required: true })} className="select w-full select-bordered">
                    <option value="">Select District</option>
                    {districts.map(d => <option key={d.id}>{d.name}</option>)}
                </select>

                <select {...register("upazila", { required: true })} className="select w-full select-bordered">
                    <option value="">Select Upazila</option>
                    {upazilas.map(u => <option key={u.id}>{u.name}</option>)}
                </select>

                <input {...register("hospital", { required: true })} placeholder="Hospital" className="input input-bordered w-full md:col-span-2" />
                <input {...register("address", { required: true })} placeholder="Full Address" className="input input-bordered w-full md:col-span-2" />

                <input type="date" {...register("donationDate", { required: true })} className="input w-full input-bordered" />
                <input type="time" {...register("donationTime", { required: true })} className="input w-full input-bordered" />

                <textarea {...register("message", { required: true })} className="textarea textarea-bordered
                w-full md:col-span-2" />

                <button
                    disabled={dbUser?.status === 'blocked'}
                    className="btn btn-primary md:col-span-2"
                >
                    Request Blood
                </button>
            </form>
        </div>
    );
};

export default AddRequest;
