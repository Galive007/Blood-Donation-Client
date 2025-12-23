import { MapPin, Calendar, Clock, Hospital } from "lucide-react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useAxiosSecure } from "../../Hooks/useAxiosSecure";

const BloodRequestCard = ({ request, role }) => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

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
    canceled: "badge-error",
  };

  const handleDonate = async () => {
    try {
      await axiosSecure.patch(`/requests/${_id}/accept`);

      Swal.fire({
        icon: "success",
        title: "Accepted!",
        text: "You have accepted this donation request.",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate(`/requests/${_id}`);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: error.response?.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <div className="card bg-base-100 shadow-md border hover:shadow-xl transition">
      <div className="card-body">
        {/* Header */}
        <div className="flex justify-between items-center">
          <span className="text-3xl font-bold text-red-600">{blood}</span>
          <span className={`badge ${statusColor[donation_status]}`}>
            {donation_status}
          </span>
        </div>

        <h2 className="text-lg font-semibold mt-2">
          Recipient: {recipientName}
        </h2>

        <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
          <Hospital size={16} />
          {hospital}
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin size={16} />
          {upazila}, {district}
        </div>

        <div className="flex gap-4 text-sm text-gray-600 mt-2">
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            {donationDate}
          </div>
          <div className="flex items-center gap-1">
            <Clock size={16} />
            {donationTime}
          </div>
        </div>

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
