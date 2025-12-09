import React, { useEffect, useState } from "react";
import { useForm, useWatch, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
// import { useAuth } from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import useAxios from "../../../hooks/useAxios";
import Swal from "sweetalert2";
import useLocations from "../../../hooks/useLocations";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TbFidgetSpinner } from "react-icons/tb";

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
        <TbFidgetSpinner className="animate-spin text-4xl text-red-600" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Update Donation Request
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Recipient Name */}
              <div className="space-y-2">
                <Label htmlFor="recipientName">Recipient Name</Label>
                <Input
                  id="recipientName"
                  type="text"
                  {...register("recipientName", { required: true })}
                />
              </div>

              {/* Blood Group */}
              <div className="space-y-2">
                <Label>Blood Group</Label>
                <Controller
                  name="bloodGroup"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Group" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="O-">O-</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              {/* District */}
              <div className="space-y-2">
                <Label>District</Label>
                <Controller
                  name="district"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select District" />
                      </SelectTrigger>
                      <SelectContent>
                        {districts
                          .sort((a, b) => a.name.localeCompare(b.name))
                          .map((d) => (
                            <SelectItem key={d.id} value={d.name}>
                              {d.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              {/* Upazila */}
              <div className="space-y-2">
                <Label>Upazila</Label>
                <Controller
                  name="upazila"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Upazila" />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredUpazilas
                          .sort((a, b) => a.name.localeCompare(b.name))
                          .map((u) => (
                            <SelectItem key={u.id} value={u.name}>
                              {u.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              {/* Hospital & Address */}
              <div className="space-y-2">
                <Label htmlFor="hospitalName">Hospital Name</Label>
                <Input
                  id="hospitalName"
                  type="text"
                  {...register("hospitalName", { required: true })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fullAddress">Full Address</Label>
                <Input
                  id="fullAddress"
                  type="text"
                  {...register("fullAddress", { required: true })}
                />
              </div>

              {/* Date & Time */}
              <div className="space-y-2">
                <Label htmlFor="donationDate">Donation Date</Label>
                <Input
                  id="donationDate"
                  type="date"
                  {...register("donationDate", { required: true })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="donationTime">Donation Time</Label>
                <Input
                  id="donationTime"
                  type="time"
                  {...register("donationTime", { required: true })}
                />
              </div>

              {/* Message */}
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="requestMessage">Request Message</Label>
                <Textarea
                  id="requestMessage"
                  className="h-24"
                  {...register("requestMessage", { required: true })}
                />
              </div>
            </div>

            <Button type="submit" className="w-full">
              Update Request
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateDonationRequest;
