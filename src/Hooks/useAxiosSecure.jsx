import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";


const axiosSecure=axios.create({
    baseURL:'https://blood-donation-one-phi.vercel.app'
})


export const useAxiosSecure=()=>{
    const {user}=useAuth()
    

    useEffect(()=>{
        const reqInterceptor=axiosSecure.interceptors.request.use(config=>{
            config.headers.Authorization=`Bearer ${user?.accessToken}`
            return config
        })

        const resInterceptor=axiosSecure.interceptors.response.use((response)=>{
            return response
        },(error)=>{
            // console.log(error);
            return Promise.reject(error)
        })

        return ()=>{
            axiosSecure.interceptors.request.eject(reqInterceptor)
            axiosSecure.interceptors.response.eject(resInterceptor)
        }
    },[user])

    return axiosSecure
}