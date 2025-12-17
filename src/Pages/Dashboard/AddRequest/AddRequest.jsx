import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import useAuth from '../../../Hooks/useAuth';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddRequest = () => {
    const { user } = useAuth()
    // console.log(user);

    const [upazilas, setUpazilas] = useState([])
    const [districts, setDistricts] = useState([])


    useEffect(() => {
        axios.get('/upazilas.json')
            .then(res => {
                // console.log(res.data.name);
                setUpazilas(res.data.upazilas)
            })

        axios.get('/districts.json')
            .then(res => {
                // console.log(res.data.name);
                setDistricts(res.data.districts)
            })
    }, [])

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    const onSubmit = async (data) => {

        const { displayName,email, blood,hospital, district, upazila,message,recipientName,donationDate,donationTime } = data;
        
        const formData={
            displayName,
            email,
            blood,
            hospital, 
            district, 
            upazila,
            message,
            recipientName,
            donationDate,
            donationTime,
            donation_status:'pending'
        };
        console.log(formData);
        
        

    };


    return (
        <div>
            <div className="flex items-center justify-center p-4">
                <div className="w-full max-w-3xl rounded-xl p-6">
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        Blood Donation Request
                    </h2>


                    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Requester Name */}
                        <div>
                            <label className="label">Requester Name</label>
                            <input
                                type="text"
                                readOnly
                                {...register("displayName", { required: "Required" })}
                                value={user?.displayName}
                                className="input input-bordered w-full"
                            />
                        </div>


                        {/* Requester Email */}
                        <div>
                            <label className="label">Requester Email</label>
                            <input
                                type="email"
                                readOnly
                                {...register("email", { required: "Required" })}
                                value={user?.email}
                                className="input input-bordered w-full "
                            />
                        </div>

                        {/* Recipient Name */}
                        <div>
                            <label className="label">Recipient Name</label>
                            <input
                                {...register("recipientName", { required: "Required" })}
                                className="input input-bordered w-full"
                            />
                            {errors.recipientName && <p className="text-red-500 text-sm">Required</p>}
                        </div>


                        {/* Blood Group */}
                        <div>
                            <label className="label">Blood Group</label>
                            <select
                                {...register("blood", { required: "Required" })}
                                className="select select-bordered w-full"
                            >
                                <option value="">Select Blood Group</option>
                                <option>A+</option>
                                <option>A-</option>
                                <option>B+</option>
                                <option>B-</option>
                                <option>AB+</option>
                                <option>AB-</option>
                                <option>O+</option>
                                <option>O-</option>
                            </select>
                        </div>
                        {/* District */}
                        <div>
                            <label className="label">District</label>
                            <select
                                {...register("district", { required: "Required" })}
                                className="select select-bordered w-full"
                            >
                                <option value="">Select District</option>
                                {
                                    districts.map(d => <option value={d?.name} key={d.id}>{d?.name}</option>)
                                }
                            </select>
                        </div>


                        {errors.district && <p className="text-red-600">{errors.district.message}</p>}


                        {/* Upazila */}
                        <div>
                            <label className="label">Upazila</label>
                            <select
                                {...register("upazila", { required: "Required" })}
                                className="select select-bordered w-full"
                            >
                                <option selected defaultValue=''>Select Your Upazila</option>
                                {
                                    upazilas.map(u => <option value={u?.name} key={u.id}>{u?.name}</option>)
                                }
                            </select>
                        </div>


                        {errors.upazila && <p className="text-red-600">{errors.upazila.message}</p>}


                        {/* Hospital Name */}
                        <div className="md:col-span-2">
                            <label className="label">Hospital Name</label>
                            <input
                                {...register("hospital", { required: "Required" })}
                                placeholder="Dhaka Medical College Hospital"
                                className="input input-bordered w-full"
                            />
                        </div>


                        {/* Address */}
                        <div className="md:col-span-2">
                            <label className="label">Full Address</label>
                            <input
                                {...register("address", { required: "Required" })}
                                placeholder="Zahir Raihan Rd, Dhaka"
                                className="input input-bordered w-full"
                            />
                        </div>


                        {/* Donation Date */}
                        <div>
                            <label className="label">Donation Date</label>
                            <input
                                type="date"
                                {...register("donationDate", { required: "Required" })}
                                className="input input-bordered w-full"
                            />
                        </div>
                        {/* Donation Time */}
                        <div>
                            <label className="label">Donation Time</label>
                            <input
                                type="time"
                                {...register("donationTime", { required: "Required" })}
                                className="input input-bordered w-full"
                            />
                        </div>


                        {/* Request Message */}
                        <div className="md:col-span-2">
                            <label className="label">Request Message</label>
                            <textarea
                                {...register("message", { required: "Required" })}
                                rows="4"
                                placeholder="Explain why blood is needed"
                                className="textarea textarea-bordered w-full"
                            ></textarea>
                        </div>


                        {/* Submit Button */}
                        <div className="md:col-span-2">
                            <button className="btn btn-primary w-full mt-4">
                                Request Blood
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddRequest;