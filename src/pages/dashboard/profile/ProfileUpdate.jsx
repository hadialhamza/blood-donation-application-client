import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm, useWatch, Controller } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { TbFidgetSpinner } from "react-icons/tb";
import { useAuth } from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useLocations from "../../../hooks/useLocations";
import { uploadImage } from "../../../utils/uploadImage";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
      <Card className="w-full max-w-2xl shadow-xl border-gray-100">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-800">
            Update Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(handleUpdate)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="font-semibold">Name</Label>
                <Input
                  id="name"
                  type="text"
                  {...register("name", { required: true })}
                />
              </div>

              {/* Email (Read Only) */}
              <div className="space-y-2">
                <Label htmlFor="email" className="font-semibold">Email</Label>
                <Input
                  id="email"
                  type="email"
                  className="bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
                  readOnly
                  {...register("email")}
                />
              </div>

              {/* Image Upload */}
              <div className="md:col-span-2 space-y-2">
                <Label className="font-semibold">Profile Picture</Label>
                <div className="flex gap-4 items-center">
                  <Avatar className="h-16 w-16 border-2 border-primary">
                    <AvatarImage src={userData.image || userData.avatar || user?.photoURL} />
                    <AvatarFallback>{(userData.name || user?.displayName)?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <Input
                    type="file"
                    className="w-full"
                    {...register("imageFile")}
                  />
                </div>
              </div>

              {/* District */}
              <div className="space-y-2">
                <Label className="font-semibold">District</Label>
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
                <Label className="font-semibold">Upazila</Label>
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

              {/* Blood Group */}
              <div className="md:col-span-2 space-y-2">
                <Label className="font-semibold">Blood Group</Label>
                <Controller
                  name="bloodGroup"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Blood Group" />
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

              <div className="md:col-span-2 pt-4">
                <Button
                  type="submit"
                  className="w-full font-bold bg-red-600 hover:bg-red-700"
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <TbFidgetSpinner className="animate-spin text-xl mr-2" />
                  ) : null}
                  {isUpdating ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileUpdate;
