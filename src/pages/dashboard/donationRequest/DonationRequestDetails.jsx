import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useAuth } from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const DonationRequestDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);

  useEffect(() => {
    axiosSecure
      .get(`/donation-request/${id}`)
      .then((res) => setRequest(res.data));
  }, [id, axiosSecure]);

  // Handle Donation
  const handleDonate = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosSecure.put(`/donation-request/donate/${id}`, {
        donorName: user.displayName,
        donorEmail: user.email,
      });

      if (res.data.modifiedCount > 0) {
        Swal.fire("Thank You!", "Your donation is now in progress.", "success");
        document.getElementById("donate_modal").close();
        navigate("/dashboard/my-donation-requests");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  if (!request) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-8 text-center text-red-600">
        Donation Request Details
      </h2>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-bold">Patient Details</h3>
              <p>
                <span className="font-semibold">Recipient Name:</span>{" "}
                {request.recipientName}
              </p>
              <p>
                <span className="font-semibold">Blood Group:</span>{" "}
                <span className="badge badge-error text-white">
                  {request.bloodGroup}
                </span>
              </p>
              <p>
                <span className="font-semibold">Location:</span>{" "}
                {request.recipientDistrict}, {request.recipientUpazila}
              </p>
              <p>
                <span className="font-semibold">Hospital:</span>{" "}
                {request.hospitalName}
              </p>
              <p>
                <span className="font-semibold">Address:</span>{" "}
                {request.fullAddress}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold">Donation Details</h3>
              <p>
                <span className="font-semibold">Date:</span>{" "}
                {request.donationDate}
              </p>
              <p>
                <span className="font-semibold">Time:</span>{" "}
                {request.donationTime}
              </p>
              <p>
                <span className="font-semibold">Status:</span> {request.status}
              </p>
              <p>
                <span className="font-semibold">Message:</span>{" "}
                {request.requestMessage}
              </p>
            </div>
          </div>

          <div className="divider"></div>

          {/* Donate Button */}
          {request.status === "pending" && (
            <div className="card-actions justify-center">
              <button
                className="btn btn-primary btn-lg w-full md:w-auto"
                onClick={() =>
                  document.getElementById("donate_modal").showModal()
                }
              >
                Donate Now
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Donation Modal */}
      <dialog id="donate_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Confirm Donation</h3>
          <form onSubmit={handleDonate}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Donor Name</span>
              </label>
              <input
                type="text"
                value={user?.displayName}
                readOnly
                className="input input-bordered bg-gray-100"
              />
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Donor Email</span>
              </label>
              <input
                type="text"
                value={user?.email}
                readOnly
                className="input input-bordered bg-gray-100"
              />
            </div>

            <div className="modal-action">
              <button
                type="button"
                className="btn"
                onClick={() => document.getElementById("donate_modal").close()}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Confirm Donate
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default DonationRequestDetails;
