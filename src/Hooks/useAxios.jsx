import axios from "axios";



const axiosinstance= axios.create({
    baseURL:'http://localhost:5000'
})
// 'https://blood-donation-one-phi.vercel.app'
export const useAxios=()=>{

    return axiosinstance
}