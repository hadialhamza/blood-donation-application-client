import React, { useEffect, useState } from "react";
import { useForm, useWatch, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

import LocationSelector from "@/components/form/LocationSelector";
import PageHeader from "@/components/shared/PageHeader";
import {
  User,
  MapPin,
  Clock,
  FileText,
  Edit3,
  Loader2,
} from "lucide-react";
import Loading from "@/components/shared/Loading";
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
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const UpdateDonationRequest = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Removed internal location state and filter logic
  const [requestData, setRequestData] = useState(null);

  const { register, handleSubmit, setValue, control, formState: { errors } } = useForm();
  // Removed manual Upazila filtering logic

  // 1. Fetch Existing Request Data
  useEffect(() => {
    axiosSecure.get(`/donation-request/${id}`).then((res) => {
      setRequestData(res.data);
      const data = res.data;
      // Pre-fill form fields
      setValue("recipientName", data.recipientName);
      setValue("bloodGroup", data.bloodGroup);
      setValue("district", data.recipientDistrict);
      setValue("upazila", data.recipientUpazila); // This will only show correctly if district is set
      setValue("hospitalName", data.hospitalName);
      setValue("fullAddress", data.fullAddress);
      setValue("donationDate", data.donationDate);
      setValue("donationTime", data.donationTime);
      setValue("requestMessage", data.requestMessage);
    });
  }, [id, axiosSecure, setValue]);

  // Filter Upazilas logic


  const onSubmit = async (data) => {
    setIsSubmitting(true);
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
        Swal.fire({
          title: "Updated!",
          text: "Request details have been updated successfully.",
          icon: "success",
          confirmButtonColor: "#DC2626",
        });
        navigate("/dashboard/my-donation-requests");
      } else {
        // Handle case where no changes were made but operation succeeded
        Swal.fire("No Changes", "You didn't change any information.", "info");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to update request", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!requestData) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 p-4 md:p-8">
      {/* Navigation */}
      <PageHeader
        title="Update Request"
        subtitle="Modify the details of your blood donation request."
        icon={Edit3}
      />

      <Card className="max-w-4xl mx-auto border-none shadow-2xl bg-white dark:bg-zinc-900 overflow-hidden">
        <CardContent className="p-6 md:p-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* 1. Recipient Info */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <User className="w-4 h-4" /> Recipient Details
              </h3>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="recipientName">Recipient Name</Label>
                  <Input
                    id="recipientName"
                    className="h-10 focus-visible:ring-amber-500"
                    {...register("recipientName", { required: true })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Blood Group</Label>
                  <Controller
                    name="bloodGroup"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="h-10 focus:ring-amber-500">
                          <SelectValue placeholder="Select Group" />
                        </SelectTrigger>
                        <SelectContent>
                          {[
                            "A+",
                            "A-",
                            "B+",
                            "B-",
                            "AB+",
                            "AB-",
                            "O+",
                            "O-",
                          ].map((bg) => (
                            <SelectItem key={bg} value={bg}>
                              {bg}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* 2. Location Info */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Location
              </h3>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Location Selector */}
                <LocationSelector
                  control={control}
                  errors={errors}
                  disabled={isSubmitting}
                />

                <div className="space-y-2">
                  <Label htmlFor="hospitalName">Hospital Name</Label>
                  <Input
                    id="hospitalName"
                    className="h-10 focus-visible:ring-amber-500"
                    {...register("hospitalName", { required: true })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fullAddress">Full Address</Label>
                  <Input
                    id="fullAddress"
                    className="h-10 focus-visible:ring-amber-500"
                    {...register("fullAddress", { required: true })}
                  />
                </div>
              </div>
            </div>

            {/* 3. Date & Time */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <Clock className="w-4 h-4" /> Schedule
              </h3>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="donationDate">Date</Label>
                  <Input
                    id="donationDate"
                    type="date"
                    className="h-10 focus-visible:ring-amber-500"
                    {...register("donationDate", { required: true })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="donationTime">Time</Label>
                  <Input
                    id="donationTime"
                    type="time"
                    className="h-10 focus-visible:ring-amber-500"
                    {...register("donationTime", { required: true })}
                  />
                </div>
              </div>
            </div>

            {/* 4. Message */}
            <div className="space-y-2">
              <Label
                htmlFor="requestMessage"
                className="flex items-center gap-2 font-semibold"
              >
                <FileText className="w-4 h-4 text-muted-foreground" /> Message
              </Label>
              <Textarea
                id="requestMessage"
                className="min-h-[100px] resize-none focus-visible:ring-amber-500"
                {...register("requestMessage", { required: true })}
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold h-12 text-lg rounded-xl shadow-lg transition-all"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin mr-2" /> Saving Changes...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateDonationRequest;
