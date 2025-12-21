import axios from "axios";



const axiosinstance= axios.create({
    baseURL:'https://blood-donation-one-phi.vercel.app'
})

export const useAxios=()=>{

    return axiosinstance
}