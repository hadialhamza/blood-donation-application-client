import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
// import { useAuth } from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import useAxios from "../../../hooks/useAxios";
import Swal from "sweetalert2";
import useLocations from "../../../hooks/useLocations";

const UpdateDonationRequest = () => {
  const { id } = useParams();
  // const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  // const api = useAxios();
  const navigate = useNavigate();

  // State for location dropdowns
  const { districts, upazilas, isLoading: isLocationsLoading } = useLocations();
  const [requestData, setRequestData] = useState(null);

  const { register, handleSubmit, setValue, control } = useForm();
  const selectedDistrict = useWatch({ control, name: "district" });



  // 2. Fetch Existing Request Data
  useEffect(() => {
    axiosSecure.get(`/donation-request/${id}`).then((res) => {
      setRequestData(res.data);
      // Pre-fill form fields
      const data = res.data;
      setValue("recipientName", data.recipientName);
      setValue("bloodGroup", data.bloodGroup);
      setValue("district", data.recipientDistrict);
      setValue("upazila", data.recipientUpazila);
      setValue("hospitalName", data.hospitalName);
      setValue("fullAddress", data.fullAddress);
      setValue("donationDate", data.donationDate);
      setValue("donationTime", data.donationTime);
      setValue("requestMessage", data.requestMessage);
    });
  }, [id, axiosSecure, setValue, setRequestData]);

  // Filter Upazilas
  const currentDistrict = districts.find((d) => d.name === selectedDistrict);
  const filteredUpazilas = currentDistrict
    ? upazilas.filter((u) => u.district_id === currentDistrict.id)
    : [];

  const onSubmit = async (data) => {
    const updatedData = {
      recipientName: data.recipientName,
      recipientDistrict: data.district,
      recipientUpazila: data.upazila,
      hospitalName: data.hospitalName,
      fullAddress: data.fullAddress,
      bloodGroup: data.bloodGroup,
      donationDate: data.donationDate,
      donationTime: data.donationTime,
      requestMessage: data.requestMessage,
    };

    try {
      const res = await axiosSecure.put(`/donation-request/${id}`, updatedData);
      if (res.data.modifiedCount > 0) {
        Swal.fire("Success", "Request updated successfully", "success");
        navigate("/dashboard/my-donation-requests");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to update request", "error");
    }
  };


  if (isLocationsLoading || !requestData) {
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Update Donation Request
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="card-body bg-base-100 shadow-xl rounded-xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recipient Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Recipient Name</span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              {...register("recipientName", { required: true })}
            />
          </div>

          {/* Blood Group */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Blood Group</span>
            </label>
            <select
              className="select select-bordered"
              {...register("bloodGroup", { required: true })}
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

          {/* District & Upazila */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">District</span>
            </label>
            <select
              className="select select-bordered"
              {...register("district", { required: true })}
            >
              {districts.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Upazila</span>
            </label>
            <select
              className="select select-bordered"
              {...register("upazila", { required: true })}
            >
              {filteredUpazilas.map((u) => (
                <option key={u.id} value={u.name}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>

          {/* Hospital & Address */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Hospital Name</span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              {...register("hospitalName", { required: true })}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Full Address</span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              {...register("fullAddress", { required: true })}
            />
          </div>

          {/* Date & Time */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Donation Date</span>
            </label>
            <input
              type="date"
              className="input input-bordered"
              {...register("donationDate", { required: true })}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Donation Time</span>
            </label>
            <input
              type="time"
              className="input input-bordered"
              {...register("donationTime", { required: true })}
            />
          </div>

          {/* Message */}
          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text">Request Message</span>
            </label>
            <textarea
              className="textarea textarea-bordered h-24"
              {...register("requestMessage", { required: true })}
            ></textarea>
          </div>
        </div>

        <div className="form-control mt-6">
          <button className="btn btn-primary">Update Request</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateDonationRequest;
