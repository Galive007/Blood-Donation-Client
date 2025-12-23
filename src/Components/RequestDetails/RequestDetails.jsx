import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { useAxiosSecure } from '../../Hooks/useAxiosSecure';
import Loading from '../Loading';
import MyContainer from '../MyContainer';

const InfoItem = ({ label, value }) => (
  <div className="border rounded-lg p-3">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-semibold">{value || 'N/A'}</p>
  </div>
);

const RequestDetails = () => {
  const { id } = useParams()
  const [request, setRequest] = useState()
  const axiosSecure = useAxiosSecure()
  const [loading, setLoading] = useState(true)
  const navigate=useNavigate()

  useEffect(() => {
    axiosSecure.get(`/requests/${id}`)
      .then(res => {
        setRequest(res.data)
        setLoading(false)
      })
      .catch(err=>{
        navigate('/login')
      })
  }, [axiosSecure, id, navigate])
  console.log(request);
  console.log(id);

  if (loading) {
    return <Loading></Loading>
  }


  return (
    <div>
      <MyContainer>
        <div className="max-w-3xl mx-auto p-4 md:p-6">
          <div className="bg-base-100 shadow-lg rounded-xl p-6 space-y-6">

            {/* Header */}
            <div className="flex justify-between items-center border-b pb-4">
              <h2 className="text-2xl font-bold">Blood Request Details</h2>

              <span
                className={`badge badge-lg ${request.donation_status === 'pending'
                  ? 'badge-warning'
                  : request.donation_status === 'inprogress'
                    ? 'badge-info'
                    : request.donation_status === 'done'
                      ? 'badge-success'
                      : 'badge-error'
                  }`}
              >
                {request.donation_status}
              </span>
            </div>

            {/* Main Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoItem label="Recipient Name" value={request.recipientName} />
              <InfoItem label="Blood Group" value={request.blood} />
              <InfoItem label="Hospital" value={request.hospital} />
              <InfoItem label="Location" value={`${request.upazila}, ${request.district}`} />
              <InfoItem label="Donation Date" value={request.donationDate} />
              <InfoItem label="Donation Time" value={request.donationTime} />
            </div>

            {/* Donor Info */}
            {request.donorEmail && (
              <div className="bg-base-200 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Donor Information</h3>
                <p><b>Name:</b> {request.donorName}</p>
                <p><b>Email:</b> {request.donorEmail}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-4 border-t">
              <Link to={'/all-requests'} className="btn btn-outline btn-sm">
                Back
              </Link>

              {request.donation_status === 'pending' && (
                <button className="btn btn-success btn-sm">
                  Accept Request
                </button>
              )}

              {request.donation_status === 'inprogress' && (
                <>
                  <button className="btn btn-success btn-sm">
                    Mark as Done
                  </button>
                  <button className="btn btn-error btn-sm">
                    Cancel
                  </button>
                </>
              )}
            </div>

          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default RequestDetails;