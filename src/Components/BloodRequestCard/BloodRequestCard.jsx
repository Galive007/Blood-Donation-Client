import { MapPin, Calendar, Clock, Hospital } from "lucide-react";
import { useNavigate } from "react-router";
import axios from "axios";

const BloodRequestCard = ({ request, role }) => {
  const navigate = useNavigate();
  const {
    _id,
    blood,
    recipientName,
    district,
    upazila,
    hospital,
    donationDate,
    donationTime,
    donation_status,
  } = request;

  const statusColor = {
    pending: "badge-warning",
    inprogress: "badge-info",
    done: "badge-success",
  };

  // Handle "Donate" action
  const handleDonate = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `/requests/${_id}/accept`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("You accepted this donation request!");
      navigate(`/requests/${_id}`); // navigate to details page after accept
    } catch (err) {
      console.error(err.response?.data || err);
      alert(err.response?.data?.message || "Failed to accept request");
    }
  };

  return (
    <div className="card bg-base-100 shadow-md border border-base-300 hover:shadow-xl transition">
      <div className="card-body">
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-red-600">{blood}</span>
          <span className={`badge ${statusColor[donation_status]}`}>
            {donation_status}
          </span>
        </div>

        {/* Recipient */}
        <h2 className="text-lg font-semibold mt-2">
          Recipient: {recipientName}
        </h2>

        {/* Hospital */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
          <Hospital size={16} />
          <span>{hospital}</span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin size={16} />
          <span>
            {upazila}, {district}
          </span>
        </div>

        {/* Date & Time */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            {donationDate}
          </div>
          <div className="flex items-center gap-1">
            <Clock size={16} />
            {donationTime}
          </div>
        </div>

        {/* Actions */}
        <div className="card-actions justify-end mt-4">
          <button
            className="btn btn-outline btn-sm"
            onClick={() => navigate(`/requests/${_id}`)}
          >
            View
          </button>

          {role === "donor" && donation_status === "pending" && (
            <button className="btn btn-primary btn-sm" onClick={handleDonate}>
              Donate
            </button>
          )}

          {(role === "admin" || role === "volunteer") && (
            <button
              className="btn btn-success btn-sm"
              onClick={() => navigate(`/requests/${_id}`)}
            >
              Update Status
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BloodRequestCard;
