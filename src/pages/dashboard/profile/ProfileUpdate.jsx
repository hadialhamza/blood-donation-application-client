import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm, useWatch } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { TbFidgetSpinner } from "react-icons/tb";
import { useAuth } from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useLocations from "../../../hooks/useLocations";
import { uploadImage } from "../../../utils/uploadImage";

const ProfileUpdate = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);

  // 1. Fetch User Data
  const {
    data: userData = {},
    refetch,
    isLoading: isUserLoading,
  } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user?.email}`);
      return res.data;
    },
  });

  // 2. Fetch Locations (Sequential loading handled in hook)
  const { districts, upazilas, isLoading: isLocationsLoading } = useLocations();

  const { register, handleSubmit, reset, control } = useForm();

  // 3. Populate form when data loads
  useEffect(() => {
    if (userData && !isUserLoading) {
      reset({
        name: userData.name,
        email: userData.email,
        district: userData.district,
        upazila: userData.upazila,
        bloodGroup: userData.bloodGroup,
        image: userData.image || userData.avatar, // Handle both field names if inconsistent
      });
    }
  }, [userData, isUserLoading, reset]);

  // 4. Watch District for Upazila Filtering
  const selectedDistrict = useWatch({ control, name: "district" });
  const currentDistrict = districts.find((d) => d.name === selectedDistrict);
  const filteredUpazilas = currentDistrict
    ? upazilas.filter((u) => u.district_id === currentDistrict.id)
    : [];

  const handleUpdate = async (data) => {
    setIsUpdating(true);
    try {
      // Handle Image Upload
      let imageUrl = userData.image || userData.avatar;
      if (data.imageFile && data.imageFile[0]) {
        imageUrl = await uploadImage(data.imageFile[0]);
      }

      const updatedInfo = {
        name: data.name,
        district: data.district,
        upazila: data.upazila,
        bloodGroup: data.bloodGroup,
        image: imageUrl,
        avatar: imageUrl, // Save to both fields to be safe/future-proof
      };

      const res = await axiosSecure.patch(`/user/${user?.email}`, updatedInfo);

      if (res.data.modifiedCount > 0) {
        await refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Profile Updated Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/profile");
      } else {
        // Fallback if no changes detected but success (e.g. only image update?)
        navigate("/dashboard/profile");
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Please try again.",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (isUserLoading || isLocationsLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <TbFidgetSpinner className="animate-spin text-4xl text-red-500" />
      </div>
    );
  }

  return (
    <div className="p-8 flex justify-center">
      <div className="card w-full max-w-2xl bg-base-100 shadow-xl border border-gray-100">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Update Profile
          </h2>

          <form
            onSubmit={handleSubmit(handleUpdate)}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full focus:input-error"
                {...register("name", { required: true })}
              />
            </div>

            {/* Email (Read Only) */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Email</span>
              </label>
              <input
                type="email"
                className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                readOnly
                {...register("email")}
              />
            </div>

            {/* Image Upload */}
            <div className="form-control md:col-span-2">
              <label className="label">
                <span className="label-text font-semibold">Profile Picture</span>
              </label>
              <div className="flex gap-4 items-center">
                <div className="avatar">
                  <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                      src={userData.image || userData.avatar || user?.photoURL}
                      alt="Current"
                    />
                  </div>
                </div>
                <input
                  type="file"
                  className="file-input file-input-bordered file-input-error w-full"
                  {...register("imageFile")}
                />
              </div>
            </div>

            {/* District */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">District</span>
              </label>
              <select
                className="select select-bordered w-full focus:select-error"
                {...register("district", { required: true })}
              >
                <option disabled value="">
                  Select District
                </option>
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
                <span className="label-text font-semibold">Upazila</span>
              </label>
              <select
                className="select select-bordered w-full focus:select-error"
                {...register("upazila", { required: true })}
              >
                <option disabled value="">
                  Select Upazila
                </option>
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
            <div className="form-control md:col-span-2">
              <label className="label">
                <span className="label-text font-semibold">Blood Group</span>
              </label>
              <select
                className="select select-bordered w-full focus:select-error"
                {...register("bloodGroup", { required: true })}
              >
                <option disabled value="">
                  Select Blood Group
                </option>
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

            <div className="form-control mt-6 md:col-span-2">
              <button
                type="submit"
                className="btn btn-error text-white font-bold"
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <TbFidgetSpinner className="animate-spin text-xl" />
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;
