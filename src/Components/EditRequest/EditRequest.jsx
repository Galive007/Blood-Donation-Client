import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { useAxiosSecure } from '../../Hooks/useAxiosSecure';
import Loading from '../Loading';

const EditRequest = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        recipientName: '',
        district: '',
        upazila: '',
        hospital: '',
        donationDate: '',
        donationTime: '',
        blood: ''
    });

    // ================= FETCH REQUEST =================
    useEffect(() => {
        if (!id) return;

        axiosSecure
            .get(`/requests/${id}`)
            .then(res => {
                const {
                    recipientName,
                    district,
                    upazila,
                    hospital,
                    donationDate,
                    donationTime,
                    blood
                } = res.data;

                setFormData({
                    recipientName,
                    district,
                    upazila,
                    hospital,
                    donationDate,
                    donationTime,
                    blood
                });
            })
            .catch(err => {
                Swal.fire(
                    'Error',
                    err.response?.data?.message || 'Failed to load request',
                    'error'
                );
                navigate('/dashboard/my-request');
            })
            .finally(() => setLoading(false));
    }, [id, axiosSecure, navigate]);

    // ================= HANDLE CHANGE =================
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // ================= HANDLE SUBMIT =================
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axiosSecure.patch(`/requests/${id}`, formData);

            Swal.fire({
                icon: 'success',
                title: 'Updated!',
                text: 'Donation request updated successfully',
                timer: 1500,
                showConfirmButton: false
            });

            navigate('/dashboard/my-request');
        } catch (error) {
            Swal.fire(
                'Error',
                error.response?.data?.message || 'Update failed',
                'error'
            );
        }
    };

    // ================= LOADING STATE =================
    if (loading) {
        return <Loading></Loading>;
    }

    // ================= UI =================
    return (
        <div className="max-w-xl mx-auto p-6 bg-base-100 shadow rounded">
            <h2 className="text-2xl font-bold mb-6 text-center">
                Edit Donation Request
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

                <input
                    type="text"
                    name="recipientName"
                    value={formData.recipientName}
                    onChange={handleChange}
                    placeholder="Recipient Name"
                    className="input input-bordered w-full"
                    required
                />

                <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    placeholder="District"
                    className="input input-bordered w-full"
                    required
                />

                <input
                    type="text"
                    name="upazila"
                    value={formData.upazila}
                    onChange={handleChange}
                    placeholder="Upazila"
                    className="input input-bordered w-full"
                    required
                />

                <input
                    type="text"
                    name="hospital"
                    value={formData.hospital}
                    onChange={handleChange}
                    placeholder="Hospital Name"
                    className="input input-bordered w-full"
                    required
                />

                <select
                    name="blood"
                    value={formData.blood}
                    onChange={handleChange}
                    className="select select-bordered w-full"
                    required
                >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                </select>

                <input
                    type="date"
                    name="donationDate"
                    value={formData.donationDate}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                />

                <input
                    type="time"
                    name="donationTime"
                    value={formData.donationTime}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                />

                <button
                    type="submit"
                    className="btn btn-primary w-full"
                >
                    Update Request
                </button>
            </form>
        </div>
    );
};

export default EditRequest;
