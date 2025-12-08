import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useAuth } from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import useAxios from "../../../hooks/useAxios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useLocations from "../../../hooks/useLocations";

const CreateDonationRequest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  // const api = useAxios();
  const navigate = useNavigate();

  // Location State
  const { districts, upazilas } = useLocations();

  const { register, handleSubmit, control } = useForm();
  const selectedDistrict = useWatch({ control, name: "district" });



  // Filter Upazilas
  const currentDistrict = districts.find((d) => d.name === selectedDistrict);
  const filteredUpazilas = currentDistrict
    ? upazilas.filter((u) => u.district_id === currentDistrict.id)
    : [];

  const onSubmit = async (data) => {
    // Construct the full request object
    const requestData = {
      requesterName: user?.displayName,
      requesterEmail: user?.email,
      recipientName: data.recipientName,
      recipientDistrict: data.district,
      recipientUpazila: data.upazila,
      hospitalName: data.hospitalName,
      fullAddress: data.fullAddress,
      bloodGroup: data.bloodGroup,
      donationDate: data.donationDate,
      donationTime: data.donationTime,
      requestMessage: data.requestMessage,
      status: "pending",
    };

    try {
      const res = await axiosSecure.post("/donation-request", requestData);
      if (res.data.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "Donation request created successfully",
          icon: "success",
          confirmButtonText: "Ok",
        });
        navigate("/dashboard/my-donation-requests");
      }
    } catch (error) {
      console.error(error);
      // Handle the "Blocked" error specifically
      if (error.response && error.response.status === 403) {
        Swal.fire(
          "Error",
          "You are blocked and cannot create requests.",
          "error"
        );
      } else {
        Swal.fire("Error", "Something went wrong", "error");
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Create Donation Request
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="card-body bg-base-100 shadow-xl rounded-xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Requester Info (Read Only) */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Requester Name</span>
            </label>
            <input
              type="text"
              value={user?.displayName}
              readOnly
              className="input input-bordered bg-gray-100"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Requester Email</span>
            </label>
            <input
              type="email"
              value={user?.email}
              readOnly
              className="input input-bordered bg-gray-100"
            />
          </div>

          {/* Recipient Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Recipient Name</span>
            </label>
            <input
              type="text"
              placeholder="Recipient Name"
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
              defaultValue=""
              {...register("bloodGroup", { required: true })}
            >
              <option value="" disabled>
                Select Group
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

          {/* District & Upazila */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Recipient District</span>
            </label>
            <select
              className="select select-bordered"
              defaultValue=""
              {...register("district", { required: true })}
            >
              <option value="" disabled>
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
          <div className="form-control">
            <label className="label">
              <span className="label-text">Recipient Upazila</span>
            </label>
            <select
              className="select select-bordered"
              defaultValue=""
              {...register("upazila", { required: true })}
            >
              <option value="" disabled>
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

          {/* Hospital & Address */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Hospital Name</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Dhaka Medical College"
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
              placeholder="e.g. Ward 12, Room 404"
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

          {/* Request Message (Full Width) */}
          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text">Request Message</span>
            </label>
            <textarea
              className="textarea textarea-bordered h-24"
              placeholder="Why do you need blood?"
              {...register("requestMessage", { required: true })}
            ></textarea>
          </div>
        </div>

        <div className="form-control mt-6">
          <button className="btn btn-primary">Request Donation</button>
        </div>
      </form>
    </div>
  );
};

export default CreateDonationRequest;
