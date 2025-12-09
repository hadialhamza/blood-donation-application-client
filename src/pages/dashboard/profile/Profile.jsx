import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { FaEdit, FaMapMarkerAlt, FaTint, FaEnvelope } from "react-icons/fa";
import { useAuth } from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch fresh data from DB to ensure we show the latest (Upazila/District might not be in Firebase 'user' object)
  const { data: dbUser = {} } = useQuery({
    queryKey: ["userProfile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user?.email}`);
      return res.data;
    },
  });

  return (
    <div className="p-8 flex justify-center items-center min-h-[80vh]">
      <div className="card w-full max-w-3xl bg-base-100 shadow-xl border border-gray-200 overflow-hidden">
        {/* Header Background */}
        <div className="bg-gradient-to-r from-red-500 to-red-700 h-48 relative">
          <div className="absolute -bottom-16 left-8">
            <div className="avatar">
              <div className="w-32 rounded-full ring ring-white ring-offset-base-100 ring-offset-2">
                <img src={dbUser.image || user?.photoURL} alt="Profile" />
              </div>
            </div>
          </div>
        </div>

        <div className="card-body mt-12">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold">{dbUser.name}</h2>
              <p className="text-gray-500 font-semibold">
                {dbUser.role || "Donor"}
              </p>
            </div>
            <Link to="/dashboard/profile/update">
              <button className="btn btn-outline btn-error gap-2">
                <FaEdit /> Edit Profile
              </button>
            </Link>
          </div>

          <div className="divider"></div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="p-3 bg-red-100 text-red-600 rounded-full">
                <FaEnvelope size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="font-medium text-gray-800">{dbUser.email}</p>
              </div>
            </div>

            {/* Blood Group */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="p-3 bg-red-100 text-red-600 rounded-full">
                <FaTint size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Blood Group</p>
                <p className="font-medium text-gray-800">{dbUser.bloodGroup}</p>
              </div>
            </div>

            {/* Location (District) */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="p-3 bg-red-100 text-red-600 rounded-full">
                <FaMapMarkerAlt size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">District</p>
                <p className="font-medium text-gray-800">{dbUser.district}</p>
              </div>
            </div>

            {/* Location (Upazila) */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="p-3 bg-red-100 text-red-600 rounded-full">
                <FaMapMarkerAlt size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Upazila</p>
                <p className="font-medium text-gray-800">{dbUser.upazila}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
