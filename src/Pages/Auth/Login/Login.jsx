import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';

const Login = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }, getValues } = useForm()

    const { signinUser, forgetPassword } = useAuth()


    const handleLogin = (data) => {

        signinUser(data.email, data.password)
            .then(() => {

                navigate(location?.state || '/')
            })
            .catch(error => {
                console.log(error);
            })
    }
    const handleForget = () => {
        // console.log('clicked');
        const email = getValues('email')

        if (!email) {
            alert('please enter your email first')
        }
        forgetPassword(email)
            .then(() => {
                alert("Password reset link sent to your email");
            })
            .catch(err => console.log(err));
    }

    return (
        <div className=' min-h-screen flex items-center'>
            <div className='w-1/2 lg:w-1/3 mx-auto'>
                <h1 className='text-2xl md:text-3xl lg:text-4xl font-extrabold'>Welcome Back</h1>
                <p>Login with Blood Donate</p>
                <div>
                    <form onSubmit={handleSubmit(handleLogin)}>

                        <fieldset className="fieldset">
                            <label className="label">Email</label>
                            <input type="email" {...register('email', { required: true })} className="input w-full" placeholder="Email" />

                            <label className="label">Password</label>
                            <input type="password" {...register('password', {
                                required: true,
                                minLength: 6,
                                pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/
                            })} className="input w-full" placeholder="Password" />
                            {errors.password?.type === 'required' && <p className='text-red-600'>Password Is Required.</p>}
                            {errors.password?.type === 'minLength' && <p className='text-red-600'>Password must be at least 6 characters.</p>}
                            {errors.password?.type === 'pattern' && <p className='text-red-600'>Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character.</p>}
                            <div><a className="link link-hover" onClick={handleForget}>Forgot password?</a></div>
                            <p>New To Blood Donate.Please.....<Link className='underline hover:text-blue-600' to='/register' state={location.state}>Registration</Link></p>
                            <button className="btn mt-4 text-primary hover:bg-red-700 hover:text-white">Login</button>
                        </fieldset>
                    </form>
                    <SocialLogin></SocialLogin>
                </div>
            </div>
        </div>
    );
};

export default Login;