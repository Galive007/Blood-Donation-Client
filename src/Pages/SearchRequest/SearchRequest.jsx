import React, { useEffect, useState } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import MyContainer from '../../Components/MyContainer';
import { useAxios } from '../../Hooks/useAxios';
import Loading from '../../Components/Loading';
import BloodRequestCard from '../../Components/BloodRequestCard/BloodRequestCard';
import useAuth from '../../Hooks/useAuth';

const SearchRequest = () => {
    // const [loading, setLoading] = useState(true);
    const [upazilas, setUpazilas] = useState([])
    const [districts, setDistricts] = useState([])
    const [searchData, setSearchData] = useState([])
    const axiosInstance = useAxios()
    const {role}=useAuth()

    useEffect(() => {
        axios.get('/upazilas.json')
            .then(res => {
                //console.log(res.data.name);
                setUpazilas(res.data.upazilas)
            })

        axios.get('/districts.json')
            .then(res => {
                //console.log(res.data.name);
                setDistricts(res.data.districts)
            })

    }, [])

    const {
        register,
        handleSubmit,
    } = useForm();

    // 
    // reset,
    const onSubmit = async (data) => {
        const { blood, district, upazila } = data;
        //console.log(data);

        axiosInstance.get(`/search-requests?blood=${blood}&district=${district}&upazila=${upazila}`)
            .then(res => {
                //console.log(res.data)
                setSearchData(res.data)

            })

    }

    //console.log(searchData);




    return (
        <div>
            <MyContainer>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="my-8 text-center flex justify-center rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                            {/* Request Title */}
                            {/* <div>
                            <label className="label">Request Title</label>
                            <input
                                {...register("requestTitle")}
                                placeholder='Enter Request Title'
                                className="input input-bordered w-full"
                            />
                            {errors.requestTitle && <p className="text-red-500 text-sm">Required</p>}
                        </div> */}

                            {/* Blood Group */}
                            <div>
                                <label className="label">Blood Group</label>
                                <select
                                    {...register("blood")}
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
                                    {...register("district")}
                                    className="select select-bordered w-full"
                                >
                                    <option value="">Select District</option>
                                    {
                                        districts.map(d => <option value={d?.name} key={d.id}>{d?.name}</option>)
                                    }
                                </select>
                            </div>





                            {/* Upazila */}
                            <div>
                                <label className="label">Upazila</label>
                                <select
                                    {...register("upazila")}
                                    className="select select-bordered w-full"
                                >
                                    <option value=''>Select Your Upazila</option>
                                    {
                                        upazilas.map(u => <option value={u?.name} key={u.id}>{u?.name}</option>)
                                    }
                                </select>
                            </div>




                            {/* Reset Button */}
                            {/* <button

                                type="button"
                                className="col-span-1 md:col-span-1 p-2 bg-gray-100 hover:bg-gray-200 rounded-md flex items-center justify-center"
                            >
                                <ArrowPathIcon className="h-5 w-5 text-gray-600" />
                            </button> */}
                            {/* Submit */}
                            <button
                                type="submit"
                                className="h-12 bg-red-500 hover:bg-red-600 text-white rounded-md"
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </form>
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {
                            searchData.map(req => (
                                <BloodRequestCard
                                    key={req._id}
                                    request={req}
                                    role={role}
                                />
                            ))
                        }
                    </div>
                </div>
            </MyContainer>
        </div>
    );
};

export default SearchRequest;