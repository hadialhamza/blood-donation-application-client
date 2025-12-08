import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm, useWatch } from "react-hook-form";
import Swal from "sweetalert2"; // or toast
import { TbFidgetSpinner } from "react-icons/tb";
import { useAuth } from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { uploadImage } from "../../../utils/uploadImage";
// import useAxios from "../../../hooks/useAxios";
import useLocations from "../../../hooks/useLocations";

const Profile = () => {
  // const api = useAxios();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isEditing, setIsEditing] = useState(false);

  // State for Districts/Upazilas
  // State for Districts/Upazilas
  const { districts, upazilas, isLoading: isLocationsLoading } = useLocations();

  // 1. Fetch User Data from MongoDB
  const {
    data: profileData,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["profile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user?.email}`);
      return res.data;
    },
  });



  const { register, handleSubmit, setValue, control } = useForm();

  // Populate form when data loads
  useEffect(() => {
    if (profileData) {
      setValue("name", profileData.name);
      setValue("email", profileData.email);
      setValue("bloodGroup", profileData.bloodGroup);
      setValue("district", profileData.district);
      setValue("upazila", profileData.upazila);
    }
  }, [profileData, setValue]);

  // Filter Upazilas based on selection
  const selectedDistrict = useWatch({ control, name: "district" });
  const currentDistrict = districts.find((d) => d.name === selectedDistrict);
  const filteredUpazilas = currentDistrict
    ? upazilas.filter((u) => u.district_id === currentDistrict.id)
    : [];

  const onSubmit = async (data) => {
    try {
      // Handle Image Upload if a new file is selected
      let newAvatar = profileData.avatar;
      if (data.avatar && data.avatar[0]) {
        newAvatar = await uploadImage(data.avatar[0]);
        console.log(newAvatar);
      }

      const updatedInfo = {
        name: data.name,
        district: data.district,
        upazila: data.upazila,
        bloodGroup: data.bloodGroup,
        avatar: newAvatar,
      };

      const res = await axiosSecure.patch(`/user/${user?.email}`, updatedInfo);

      if (res.data.modifiedCount > 0) {
        refetch();
        setIsEditing(false); // Return to read-only mode
        Swal.fire("Success", "Profile Updated Successfully", "success");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to update profile", "error");
    }
  };

  if (isLoading || isLocationsLoading)
    return (
      <div className="flex justify-center mt-20">
        <TbFidgetSpinner className="animate-spin text-4xl" />
      </div>
    );

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-8 text-center">My Profile</h2>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          {/* Header with Avatar */}
          <div className="flex justify-center mb-6">
            <div className="avatar">
              <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={profileData?.avatar} alt="User Avatar" />
              </div>
            </div>
          </div>

          {/* Edit Button Logic */}
          <div className="flex justify-end mb-4">
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="btn btn-primary btn-sm"
              >
                Edit Profile
              </button>
            )}
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                disabled={!isEditing}
                className="input input-bordered"
                {...register("name")}
              />
            </div>

            {/* Email (Read Only ALWAYS) */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                readOnly
                className="input input-bordered bg-gray-100 cursor-not-allowed"
                {...register("email")}
              />
            </div>

            {/* District */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">District</span>
              </label>
              <select
                disabled={!isEditing}
                className="select select-bordered"
                {...register("district")}
              >
                {districts
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* Upazila */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Upazila</span>
              </label>
              <select
                disabled={!isEditing}
                className="select select-bordered"
                {...register("upazila")}
              >
                {filteredUpazilas
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((u) => (
                    <option key={u.id} value={u.name}>
                      {u.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* Blood Group */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Blood Group</span>
              </label>
              <select
                disabled={!isEditing}
                className="select select-bordered"
                {...register("bloodGroup")}
              >
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            {/* File Upload (Only visible when editing) */}
            {isEditing && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Update Profile Picture</span>
                </label>
                <input
                  type="file"
                  className="file-input file-input-bordered"
                  {...register("avatar")}
                />
              </div>
            )}

            {/* Save Button */}
            {isEditing && (
              <div className="col-span-full mt-4">
                <button className="btn btn-success w-full text-white">
                  Save Changes
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
