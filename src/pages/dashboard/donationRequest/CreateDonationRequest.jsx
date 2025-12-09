import React, { useEffect, useState } from "react";
import { useForm, useWatch, Controller } from "react-hook-form";
import { useAuth } from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
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

const CreateDonationRequest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Location State
  const { districts, upazilas, isLoading: isLocationsLoading } = useLocations();

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

  if (isLocationsLoading) {
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
            Create Donation Request
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Requester Info (Read Only) */}
              <div className="space-y-2">
                <Label>Requester Name</Label>
                <Input
                  type="text"
                  value={user?.displayName || ""}
                  readOnly
                  className="bg-gray-100 dark:bg-gray-800"
                />
              </div>
              <div className="space-y-2">
                <Label>Requester Email</Label>
                <Input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className="bg-gray-100 dark:bg-gray-800"
                />
              </div>

              {/* Recipient Name */}
              <div className="space-y-2">
                <Label htmlFor="recipientName">Recipient Name</Label>
                <Input
                  id="recipientName"
                  placeholder="Recipient Name"
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                <Label>Recipient District</Label>
                <Controller
                  name="district"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                <Label>Recipient Upazila</Label>
                <Controller
                  name="upazila"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={!selectedDistrict}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={selectedDistrict ? "Select Upazila" : "Select District First"} />
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
                  placeholder="e.g. Dhaka Medical College"
                  {...register("hospitalName", { required: true })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fullAddress">Full Address</Label>
                <Input
                  id="fullAddress"
                  placeholder="e.g. Ward 12, Room 404"
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

              {/* Request Message (Full Width) */}
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="requestMessage">Request Message</Label>
                <Textarea
                  id="requestMessage"
                  placeholder="Why do you need blood?"
                  className="h-24"
                  {...register("requestMessage", { required: true })}
                />
              </div>
            </div>

            <Button type="submit" className="w-full">
              Request Donation
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateDonationRequest;
