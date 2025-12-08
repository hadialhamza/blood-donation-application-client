import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { FaMapMarkerAlt, FaCalendarAlt, FaClock } from "react-icons/fa";
import { TbFidgetSpinner } from "react-icons/tb";
import useAxios from "../../hooks/useAxios";

const PublicDonationRequests = () => {
  const api = useAxios();
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["public-requests"],
    queryFn: async () => {
      const res = await api.get("donation-requests");
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center mt-20">
        <TbFidgetSpinner className="animate-spin text-4xl text-red-600" />
      </div>
    );

  return (
    <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-4 text-red-600">
        Donation Requests
      </h2>
      <p className="text-center text-gray-500 mb-12">
        People around you who need blood urgently.
      </p>

      {requests.length === 0 ? (
        <div className="text-center text-xl font-semibold text-gray-400">
          No pending donation requests at the moment.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((req) => (
            <div
              key={req._id}
              className="card bg-base-100 shadow-xl border-t-4 border-red-500 hover:scale-105 transition-transform duration-200"
            >
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <h3 className="card-title text-xl">{req.recipientName}</h3>
                  <div className="badge badge-error text-white font-bold p-3">
                    {req.bloodGroup}
                  </div>
                </div>

                <div className="space-y-2 mt-4 text-gray-600">
                  <p className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-red-500" />
                    {req.recipientDistrict}, {req.recipientUpazila}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaCalendarAlt className="text-red-500" />
                    {req.donationDate}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaClock className="text-red-500" />
                    {req.donationTime}
                  </p>
                </div>

                <div className="card-actions justify-end mt-6">
                  <Link
                    to={`/donation-request-details/${req._id}`}
                    className="btn btn-primary btn-sm w-full"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PublicDonationRequests;
