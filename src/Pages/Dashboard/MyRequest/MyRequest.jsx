import React, { useEffect, useState } from 'react';
import { useAxiosSecure } from '../../../Hooks/useAxiosSecure';

const MyRequest = () => {

    const axiosSecure = useAxiosSecure()
    const [myRequest, setMyRequest] = useState([])
    const [totalRequest, setTotalRequest] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        axiosSecure.get(`/my-request?page=${currentPage - 1}&size=${itemsPerPage}`)
            .then(res => {
                // console.log(res.data);
                setMyRequest(res.data.request)
                setTotalRequest(res.data.totalRequest)
                
            })
    }, [axiosSecure, currentPage, itemsPerPage])

    
    const numberOfPages = Math.ceil(totalRequest / itemsPerPage)
    const pages = [...Array(numberOfPages).keys()].map(e => e + 1)

    // console.log(myRequest, totalRequest, numberOfPages, pages);
    const handlePrev=()=>{
        if(currentPage>1){
            setCurrentPage(currentPage-1)
        }
    }
    const handleNext=()=>{
        if(currentPage<pages.length){
            setCurrentPage(currentPage+1)
        }
    }

    return (
        <div>
            <h1 className='text-center py-8 text-2xl font-bold'>My Donation Requests</h1>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <h1>Index</h1>
                            </th>
                            <th>recipient name</th>
                            <th>Location</th>
                            <th>Blood Group</th>
                            <th>Donation Date</th>
                            <th>Hospital Name</th>

                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            myRequest?.map((request, index) => <tr key={index}>
                                <th>
                                    {(currentPage - 1) * itemsPerPage + index + 1}
                                </th>
                                <td>
                                    <div>
                                        <div className="font-bold">{request?.recipientName}</div>
                                        <div className="font-bold">{request?.email}</div>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <div className="font-bold">{request?.upazila} ,{request?.district}</div>

                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <div className="font-bold">{request?.blood}</div>
                                    </div>
                                </td>
                                <td>
                                    {request?.donationDate}
                                    <div>{request?.donationTime}</div>
                                </td>
                                <td>
                                    {request?.hospital}
                                </td>
                                <th>
                                    <button className="btn btn-ghost btn-xs">View</button>
                                </th>
                            </tr>)
                        }

                    </tbody>

                </table>
            </div>
            <div className='flex justify-center items-center gap-5 mt-5'>
                <button onClick={handlePrev} className="btn">Prev</button>
                {
                    pages.map((page,index) =>
                        <button key={index}
                        className={`btn ${page===currentPage?'bg-[#435585] text-white':''}`}
                        onClick={()=>setCurrentPage(page)}>
                            {page}
                        </button>
                    )
                }
                <button onClick={handleNext} className="btn">Next</button>
            </div>
        </div>
    );
};

export default MyRequest;