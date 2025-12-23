import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import { useLocation, useNavigate } from 'react-router';
import { FcGoogle } from 'react-icons/fc';



const SocialLogin = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { googleSignIn } = useAuth()
    
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(() => {
                //console.log(result.user);
                navigate(location.state || '/')
            })
            .catch(error => {
                //console.log(error);

            })
    }
    return (
        <div className='text-center *:my-1'>
            <div>OR</div>
            {/* Google */}
            <button onClick={handleGoogleSignIn} className="btn bg-[#E9ECF1] hover:bg-red-700 hover:text-white border-[#e5e5e5] text-red-600 text-lg">
                <FcGoogle />
                Login with Google
            </button>
        </div>
    );
};

export default SocialLogin;