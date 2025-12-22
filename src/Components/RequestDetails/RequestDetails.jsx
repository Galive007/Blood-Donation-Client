import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";

const RequestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`/requests/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRequest(response.data);
      } catch (error) {
        console.error(
          "Failed to fetch request:",
          error.response?.data || error
        );
      } finally {
        setLoading(false);
      }
    };
    fetchRequest();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!request) return <p>Request not found or access denied</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="card bg-base-100 shadow-md border border-base-300">
        <div className="card-body">
          <h1 className="text-2xl font-bold mb-4">Blood Request Details</h1>

          <p>
            <strong>Recipient:</strong> {request.recipientName}
          </p>
          <p>
            <strong>Blood Group:</strong> {request.blood}
          </p>
          <p>
            <strong>Hospital:</strong> {request.hospital}
          </p>
          <p>
            <strong>Location:</strong> {request.upazila}, {request.district}
          </p>
          <p>
            <strong>Date & Time:</strong> {request.donationDate} at{" "}
            {request.donationTime}
          </p>
          <p>
            <strong>Status:</strong> {request.donation_status}
          </p>

          {request.donation_status === "pending" && (
            <button
              className="btn btn-primary mt-4"
              onClick={async () => {
                try {
                  const token = localStorage.getItem("token");
                  await axios.patch(
                    `/requests/${id}/accept`,
                    {},
                    { headers: { Authorization: `Bearer ${token}` } }
                  );
                  alert("You accepted this donation request!");
                  navigate(0); // reload page to update status
                } catch (err) {
                  console.error(err.response?.data || err);
                  alert(err.response?.data?.message || "Failed to accept request");
                }
              }}
            >
              Donate
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestDetails;
