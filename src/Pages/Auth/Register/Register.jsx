import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import axios from 'axios';
import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2';

const Register = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const [upazilas,setUpazilas]=useState([])
    const [districts,setDistricts]=useState([])


    useEffect(()=>{
        axios.get('/upazilas.json')
        .then(res=>{
            //console.log(res.data.name);
            setUpazilas(res.data.upazilas)
        })

        axios.get('/districts.json')
        .then(res=>{
            //console.log(res.data.name);
            setDistricts(res.data.districts)
        })
    },[])



    //console.log(upazilas,districts);
    


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const password = watch('password');
    const confirmPassword = watch('confirmPassword');


    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    const { registerUser, updateUserProfile } = useAuth()


    const getPasswordStrength = () => {
        if (!password) return '';
        if (password.length < 8) return 'Weak';
        if (
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password)
        ) {
            return 'Strong';
        }
        return 'Medium';
    };

    const handleRegistration = async(data) => {
        if (data.password !== data.confirmPassword) {
            Swal.fire('Error', 'Passwords do not match', 'error');
            return;
        }
        const { confirmPassword, ...restData } = data;
        //console.log(confirmPassword);

        const profileImage = restData.photo[0];
        const { email, password, name, blood,district,upazila } = restData;
        
        //console.log(district);
        await registerUser(email, password)
            .then(() => {
                //console.log(result.user);
                //1. store the image in form data
                const imageFormData = new FormData()
                imageFormData.append('image', profileImage)

                // 2.send the photo to the store and get the url
                const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`
                axios.post(image_API_URL, imageFormData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })

                    .then(res => {
                        //console.log('after image upload', res.data.data.url);

                        const mainPhotoUrl = res.data.data.url

                        //console.log(formData);
                        // update user profile to firebase
                        const userProfile = {
                            displayName: name,
                            photoURL: mainPhotoUrl
                        }

                        updateUserProfile(userProfile)
                            .then(() => {
                                const userData = {
                                    email, password, name, mainPhotoUrl, blood,district,upazila
                                }
                                axios.post('https://blood-donation-one-phi.vercel.app/users', userData)
                                    .then(res => {
                                        //console.log(res.data);
                                        if (res.data.insertedId) {
                                            Swal.fire({
                                                title: "Good job!",
                                                text: "Registration Successful",
                                                icon: "success"
                                            });
                                            navigate(location.state?.from || '/');
                                        }
                                    })
                                    
                                //console.log('user profile updated done',res); 

                            })

                    })

            })
            .catch(error => {
                //console.log(error);
            })
    }

    return (
        <div className='min-h-screen flex items-center'>
            <div className='w-1/2 lg:w-1/3 mx-auto pr-3 md:pr-0'>
                <h1 className='text-2xl 
         font-extrabold'>Create an Account</h1>
                <p>Register with Blood Donate</p>

                <form onSubmit={handleSubmit(handleRegistration)}>
                    <fieldset className="fieldset">
                        {/* Name */}
                        <label className="label">Name</label>
                        <input type="text"
                            {...register('name', { required: 'Name is required' })} className="input w-full" placeholder="Your Name" />
                        {errors.name && <p className="text-red-600">{errors.name.message}</p>}

                        {/* image */}
                        <label className="label">Image</label>
                        <input type="file"
                            {...register('photo', { required: 'Image is required' })} className="file-input w-full" />
                        {errors.photo && <p className="text-red-600">{errors.photo.message}</p>}

                        {/* email */}
                        <label className="label">Email</label>
                        <input type="email"
                            {...register('email', { required: 'Email is required' })} className="input w-full" placeholder="Email" />
                        {errors.email && <p className="text-red-600">{errors.email.message}</p>}
                        
                        {/* blood */}
                        <label className="label">Blood Group</label>
                        <select
                            defaultValue=""
                            className="select w-full"
                            {...register('blood', { required: 'Blood Group is required' })}
                        >
                            <option value="" disabled>
                                Choose Blood Group
                            </option>
                            <option value="A+">A+</option>
                            <option value="A-">A−</option>
                            <option value="B+">B+</option>
                            <option value="B-">B−</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB−</option>
                            <option value="O+">O+</option>
                            <option value="O-">O−</option>
                        </select>
                        {errors.blood && <p className="text-red-600">{errors.blood.message}</p>}

                        {/* District */}
                        <label className="label">District</label>
                        <select className="select w-full"
                        {...register('district', { required: 'District required' })}
                        >
                            <option selected defaultValue=''>Select Your District</option>
                            {
                                districts.map(d=> <option value={d?.name} key={d.id}>{d?.name}</option>)
                            }
                        </select>
                        {errors.district && <p className="text-red-600">{errors.district.message}</p>}

                        {/* upazila */}
                        <label className="label">Upazila</label>
                        <select className="select w-full"
                        {...register('upazila', { required: 'Upazila required' })}
                        >
                            <option selected defaultValue=''>Select Your Upazila</option>
                            {
                                upazilas.map(u=> <option value={u?.name} key={u.id}>{u?.name}</option>)
                            }
                        </select>
                        {errors.upazila && <p className="text-red-600">{errors.upazila.message}</p>}

                        {/* Password */}
                        <label className="label">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 8,
                                        message:
                                            'Password must be at least 8 characters',
                                    },
                                    pattern: {
                                        value:
                                            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
                                        message:
                                            'Must include uppercase, lowercase, number & special character',
                                    },
                                })}
                                className="input w-full pr-10"
                                placeholder="Password"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-2 text-sm text-gray-500"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-red-600">
                                {errors.password.message}
                            </p>
                        )}

                        {password && (
                            <p
                                className={`text-sm mt-1 ${getPasswordStrength() === 'Strong'
                                    ? 'text-green-600'
                                    : getPasswordStrength() === 'Medium'
                                        ? 'text-yellow-600'
                                        : 'text-red-600'
                                    }`}
                            >
                                Password Strength: {getPasswordStrength()}
                            </p>
                        )}

                        {/* Confirm Password */}
                        <label className="label">Confirm Password</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                {...register('confirmPassword', {
                                    required: 'Confirm Password is required',
                                    validate: (value) =>
                                        value === password ||
                                        'Passwords do not match',
                                })}
                                className="input w-full pr-10"
                                placeholder="Confirm Password"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-2 text-sm text-gray-500"
                                onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                            >
                                {showConfirmPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-red-600">
                                {errors.confirmPassword.message}
                            </p>
                        )}

                        <p className='mt-3'>Already Have An Account.Please...... <Link className='underline hover:text-blue-600' to='/login' state={location.state}>Login</Link></p>
                        <button disabled={!password || password !== confirmPassword}
                            className={`btn mt-4 ${password === confirmPassword
                                ? 'btn-primary hover:bg-red-700 hover:text-white'
                                : 'btn-disabled'
                                }`} >Registration</button>
                    </fieldset>
                </form>
                <SocialLogin></SocialLogin>
            </div>
        </div>
    );
};

export default Register;