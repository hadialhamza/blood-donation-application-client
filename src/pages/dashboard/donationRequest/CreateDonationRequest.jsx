import React, { useState } from "react";
import { useForm, useWatch, Controller } from "react-hook-form";
import { useAuth } from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useLocations from "../../../hooks/useLocations";
import {
  User,
  MapPin,
  Calendar,
  Clock,
  Droplet,
  Building2,
  FileText,
  ArrowLeft,
  HeartHandshake,
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
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const CreateDonationRequest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true);
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
          title: "Request Posted!",
          text: "We will notify nearby donors immediately.",
          icon: "success",
          confirmButtonColor: "#DC2626",
        });
        navigate("/dashboard/my-donation-requests");
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 403) {
        Swal.fire(
          "Blocked",
          "You are blocked and cannot create requests.",
          "error"
        );
      } else {
        Swal.fire("Error", "Something went wrong. Please try again.", "error");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLocationsLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 p-4 md:p-8">
      {/* Navigation & Header */}
      <div className="max-w-4xl mx-auto mb-6">
        <Button
          variant="ghost"
          className="pl-0 hover:bg-transparent hover:text-red-600 transition-colors mb-4"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
      </div>

      <Card className="max-w-4xl mx-auto border-none shadow-2xl bg-white dark:bg-zinc-900 overflow-hidden">
        {/* Decorative Top Bar */}
        <div className="bg-gradient-to-r from-red-600 to-rose-600 h-2 w-full"></div>

        <CardHeader className="text-center pt-8 pb-2">
          <div className="mx-auto bg-red-100 dark:bg-red-900/20 p-3 rounded-full w-fit mb-4 text-red-600">
            <HeartHandshake className="w-8 h-8" />
          </div>
          <CardTitle className="text-3xl font-bold text-zinc-900 dark:text-white">
            Create Donation Request
          </CardTitle>
          <CardDescription className="text-lg">
            Provide details to find a blood donor nearby.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6 md:p-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Section 1: Requester & Recipient */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <User className="w-4 h-4" /> Personal Information
              </h3>
              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Read Only Requester */}
                <div className="bg-slate-50 dark:bg-zinc-800/50 p-4 rounded-xl border border-slate-100 dark:border-zinc-800">
                  <Label className="text-xs text-muted-foreground uppercase">
                    Requester
                  </Label>
                  <div className="font-medium text-zinc-900 dark:text-white mt-1">
                    {user?.displayName}
                  </div>
                  <div className="text-sm text-zinc-500">{user?.email}</div>
                </div>

                {/* Recipient Input */}
                <div className="space-y-2">
                  <Label htmlFor="recipientName" className="font-semibold">
                    Recipient Name
                  </Label>
                  <Input
                    id="recipientName"
                    placeholder="Who needs the blood?"
                    className="h-11 focus-visible:ring-red-500"
                    {...register("recipientName", { required: true })}
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Medical Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <Droplet className="w-4 h-4" /> Medical Details
              </h3>
              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Blood Group */}
                <div className="space-y-2">
                  <Label className="font-semibold">Blood Group Needed</Label>
                  <Controller
                    name="bloodGroup"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="h-11 focus:ring-red-500">
                          <SelectValue placeholder="Select Blood Group" />
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
                            <SelectItem
                              key={bg}
                              value={bg}
                              className="font-bold"
                            >
                              {bg}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                {/* Hospital Name */}
                <div className="space-y-2">
                  <Label
                    htmlFor="hospitalName"
                    className="font-semibold flex items-center gap-2"
                  >
                    <Building2 className="w-4 h-4 text-muted-foreground" />{" "}
                    Hospital Name
                  </Label>
                  <Input
                    id="hospitalName"
                    placeholder="e.g. Dhaka Medical College"
                    className="h-11 focus-visible:ring-red-500"
                    {...register("hospitalName", { required: true })}
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Location & Timing */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Location & Timing
              </h3>
              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* District */}
                <div className="space-y-2">
                  <Label className="font-semibold">District</Label>
                  <Controller
                    name="district"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="h-11 focus:ring-red-500">
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
                  <Label className="font-semibold">Upazila</Label>
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
                        <SelectTrigger className="h-11 focus:ring-red-500">
                          <SelectValue
                            placeholder={
                              selectedDistrict
                                ? "Select Upazila"
                                : "Select District First"
                            }
                          />
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

                {/* Address */}
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="fullAddress" className="font-semibold">
                    Full Address / Ward / Bed No
                  </Label>
                  <Input
                    id="fullAddress"
                    placeholder="e.g. Ward 12, Room 404, 3rd Floor"
                    className="h-11 focus-visible:ring-red-500"
                    {...register("fullAddress", { required: true })}
                  />
                </div>

                {/* Date */}
                <div className="space-y-2">
                  <Label
                    htmlFor="donationDate"
                    className="font-semibold flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4 text-muted-foreground" /> Date
                  </Label>
                  <Input
                    id="donationDate"
                    type="date"
                    className="h-11 focus-visible:ring-red-500"
                    {...register("donationDate", { required: true })}
                  />
                </div>

                {/* Time */}
                <div className="space-y-2">
                  <Label
                    htmlFor="donationTime"
                    className="font-semibold flex items-center gap-2"
                  >
                    <Clock className="w-4 h-4 text-muted-foreground" /> Time
                  </Label>
                  <Input
                    id="donationTime"
                    type="time"
                    className="h-11 focus-visible:ring-red-500"
                    {...register("donationTime", { required: true })}
                  />
                </div>
              </div>
            </div>

            {/* Section 4: Message */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="requestMessage"
                  className="font-semibold flex items-center gap-2"
                >
                  <FileText className="w-4 h-4 text-muted-foreground" /> Why do
                  you need blood?
                </Label>
                <Textarea
                  id="requestMessage"
                  placeholder="Describe the urgency or specific requirements (e.g., patient condition)..."
                  className="min-h-[100px] resize-none focus-visible:ring-red-500"
                  {...register("requestMessage", { required: true })}
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold h-12 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin mr-2" /> Posting
                  Request...
                </>
              ) : (
                "Submit Donation Request"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateDonationRequest;
