import React, { useEffect, useState } from "react";
import { useForm, useWatch, Controller } from "react-hook-form";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router";
import {
  User,
  Mail,
  MapPin,
  Droplets,
  Camera,
  Save,
  X,
  Upload,
  Shield,
  AlertCircle,
  CheckCircle,
  Loader2,
} from "lucide-react";
import Loading from "@/components/shared/Loading";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const ProfileUpdate = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const [userData, setUserData] = useState({});
  const [isUserLoading, setIsUserLoading] = useState(true);

  // Initialize form first to make reset available
  const { register, handleSubmit, reset, control, watch } = useForm();
  const imageFile = watch("imageFile");

  // 1. Fetch User Data
  useEffect(() => {
    if (user?.email) {
      setIsUserLoading(true);
      axiosSecure
        .get(`/user/${user?.email}`)
        .then((res) => {
          setUserData(res.data);
          const data = res.data;
          // Pre-fill form fields
          reset({
            name: data.name,
            email: data.email,
            district: data.district,
            upazila: data.upazila,
            bloodGroup: data.bloodGroup,
            phone: data.phone || "",
            image: data.image || data.avatar,
          });
          setPreviewImage(data.image || data.avatar || user?.photoURL);
          setIsUserLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setIsUserLoading(false);
        });
    }
  }, [user?.email, user?.photoURL, axiosSecure, reset]);

  const refetch = () => {
    if (user?.email) {
      axiosSecure.get(`/user/${user?.email}`).then((res) => {
        setUserData(res.data);
      });
    }
  };

  // 2. Fetch Locations
  const { districts, allUpazilas, isLoading: isLocationsLoading } = useLocations();

  // Handle image preview
  useEffect(() => {
    if (imageFile && imageFile[0]) {
      const file = imageFile[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, [imageFile]);

  // 4. Watch District for Upazila Filtering
  const selectedDistrict = useWatch({ control, name: "district" });
  const currentDistrict = districts.find((d) => d.name === selectedDistrict);
  const filteredUpazilas = currentDistrict
    ? allUpazilas.filter((u) => u.district_id === currentDistrict.id)
    : [];

  const handleUpdate = async (data) => {
    setIsUpdating(true);
    try {
      // Handle Image Upload
      let imageUrl = userData.image || userData.avatar || user?.photoURL;
      if (data.imageFile && data.imageFile[0]) {
        imageUrl = await uploadImage(data.imageFile[0]);
      }

      const updatedInfo = {
        name: data.name,
        phone: data.phone,
        district: data.district,
        upazila: data.upazila,
        bloodGroup: data.bloodGroup,
        image: imageUrl,
        avatar: imageUrl,
      };

      const res = await axiosSecure.patch(`/user/${user?.email}`, updatedInfo);

      if (res.data.modifiedCount > 0) {
        await refetch();
        Swal.fire({
          title: "Success!",
          text: "Profile updated successfully",
          icon: "success",
          confirmButtonColor: "#ef4444",
          background: "#f0f9ff",
          timer: 2000,
        });
        navigate("/dashboard/profile");
      } else {
        navigate("/dashboard/profile");
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Failed to update profile. Please try again.",
        icon: "error",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (isUserLoading || isLocationsLoading) return <Loading />;

  return (
    <div className="p-6 bg-gradient-to-b from-white to-red-50 dark:from-zinc-950 dark:to-red-950/10 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-red-600 dark:text-red-400">
              Profile Update
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white">
            Update Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-600">
              Profile Information
            </span>
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Keep your information up-to-date to help us connect you better with
            donation opportunities
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Profile Preview */}
          <Card className="border-red-100 dark:border-red-900 shadow-lg">
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="relative">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-purple-600 to-violet-600 text-white">
                      <Shield className="w-3 h-3 mr-1" />
                      Preview
                    </Badge>
                  </div>
                  <div className="pt-4 flex flex-col items-center">
                    <div className="relative mb-4">
                      <Avatar className="h-32 w-32 border-4 border-white dark:border-zinc-800 shadow-xl">
                        <AvatarImage
                          src={previewImage}
                          alt="Preview"
                          className="object-cover"
                        />
                        <AvatarFallback className="text-4xl font-bold bg-gradient-to-r from-red-600 to-rose-600 text-white">
                          {userData.name?.charAt(0) ||
                            user?.displayName?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute bottom-0 right-0 p-2 bg-red-600 rounded-full text-white shadow-lg">
                        <Camera className="w-4 h-4" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white text-center">
                      {watch("name") || userData.name}
                    </h3>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm text-center">
                      {userData.role || "Donor"}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                      <Mail className="w-4 h-4 text-red-600 dark:text-red-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Email
                      </p>
                      <p className="font-medium truncate">{userData.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                      <Droplets className="w-4 h-4 text-red-600 dark:text-red-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Blood Group
                      </p>
                      <p className="font-bold text-red-600 dark:text-red-400">
                        {watch("bloodGroup") ||
                          userData.bloodGroup ||
                          "Not set"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                      <MapPin className="w-4 h-4 text-red-600 dark:text-red-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Location
                      </p>
                      <p className="font-medium">
                        {watch("upazila") || userData.upazila || "Not set"},{" "}
                        {watch("district") || userData.district || "Not set"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
                        Keep Your Information Updated
                      </p>
                      <p className="text-xs text-amber-600 dark:text-amber-400/80 mt-1">
                        Accurate information helps us connect you with urgent
                        blood requests in your area.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Column: Update Form */}
          <Card className="lg:col-span-2 border-red-100 dark:border-red-900 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <User className="w-5 h-5 text-red-600" />
                Edit Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(handleUpdate)} className="space-y-6">
                {/* Profile Image Upload */}
                <div className="space-y-4">
                  <Label className="text-sm font-medium">Profile Picture</Label>
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="relative">
                      <Avatar className="h-24 w-24 border-4 border-white dark:border-zinc-800 shadow-md">
                        <AvatarImage src={previewImage} alt="Current" />
                        <AvatarFallback className="text-2xl">
                          {(userData.name || user?.displayName)?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <label
                        htmlFor="imageFile"
                        className="absolute -bottom-2 -right-2 cursor-pointer"
                      >
                        <div className="p-2 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-colors">
                          <Upload className="w-4 h-4" />
                        </div>
                      </label>
                      <input
                        id="imageFile"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        {...register("imageFile")}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">
                        Upload a new profile picture (JPG, PNG, max 2MB)
                      </p>
                      <p className="text-xs text-zinc-400 dark:text-zinc-500">
                        Recommended: Square image, at least 400x400 pixels
                      </p>
                    </div>
                  </div>
                </div>

                {/* Name & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="text-sm font-medium flex items-center gap-2"
                    >
                      <User className="w-4 h-4" />
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      className="h-12"
                      {...register("name", { required: true })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="phone"
                      className="text-sm font-medium flex items-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+880 1XXX XXX XXX"
                      className="h-12"
                      {...register("phone")}
                    />
                  </div>
                </div>

                {/* Email (Read Only) */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </Label>
                  <div className="relative">
                    <Input
                      type="email"
                      className="h-12 bg-zinc-50 dark:bg-zinc-900/50 pr-10"
                      readOnly
                      {...register("email")}
                    />
                    <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Email cannot be changed for security reasons
                  </p>
                </div>

                {/* Location */}
                <div className="space-y-4">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Location Information
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-xs font-medium">District</Label>
                      <Controller
                        name="district"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="h-12">
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

                    <div className="space-y-2">
                      <Label className="text-xs font-medium">Upazila</Label>
                      <Controller
                        name="upazila"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                            disabled={!selectedDistrict}
                          >
                            <SelectTrigger className="h-12">
                              <SelectValue
                                placeholder={
                                  selectedDistrict
                                    ? "Select Upazila"
                                    : "Select district first"
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
                      {!selectedDistrict && (
                        <p className="text-xs text-amber-600 dark:text-amber-400">
                          Please select a district first
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Blood Group */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <Droplets className="w-4 h-4" />
                    Blood Group
                  </Label>
                  <Controller
                    name="bloodGroup"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select Blood Group" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A+">A+ (Most Common)</SelectItem>
                          <SelectItem value="A-">A-</SelectItem>
                          <SelectItem value="B+">B+</SelectItem>
                          <SelectItem value="B-">B-</SelectItem>
                          <SelectItem value="AB+">
                            AB+ (Universal Recipient)
                          </SelectItem>
                          <SelectItem value="AB-">AB-</SelectItem>
                          <SelectItem value="O+">O+</SelectItem>
                          <SelectItem value="O-">
                            O- (Universal Donor)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    This helps match you with compatible blood requests
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white h-12"
                      disabled={isUpdating}
                    >
                      {isUpdating ? (
                        <>
                          <Loader2 className="animate-spin text-xl mr-2" />
                          Saving Changes...
                        </>
                      ) : (
                        <>
                          <Save className="w-5 h-5 mr-2" />
                          Save Changes
                        </>
                      )}
                    </Button>

                    <Link to="/dashboard/profile" className="flex-1">
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full h-12 border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <X className="w-5 h-5 mr-2" />
                        Cancel
                      </Button>
                    </Link>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;
