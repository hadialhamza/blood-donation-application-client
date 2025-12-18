import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
import { uploadImage } from "../../../utils/uploadImage";
import LocationSelector from "@/components/form/LocationSelector";
import FormSelect from "@/components/form/FormSelect";
import Container from "@/components/shared/container/Container";
import { BLOOD_GROUPS } from "@/data/Data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm();
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

  if (isUserLoading) return <Loading />;

  return (
    <Container className="p-6 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8 mt-4">
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
            <span className="text-transparent bg-clip-text bg-linear-to-r from-red-600 to-rose-600">
              Profile Information
            </span>
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Keep your information up-to-date to help us connect you better with
            donation opportunities
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="border-red-100 dark:border-red-900 shadow-lg h-fit">
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="relative">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-linear-to-r from-purple-600 to-violet-600 text-white">
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
                        <AvatarFallback className="text-4xl font-bold bg-linear-to-r from-red-600 to-rose-600 text-white">
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

          <Card className="lg:col-span-2 border-red-100 dark:border-red-900 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <User className="w-5 h-5 text-red-600" />
                Edit Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(handleUpdate)} className="space-y-6">
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

                {/* Email */}
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
                  <LocationSelector
                    control={control}
                    errors={errors}
                    defaultDistrict={userData.district}
                    defaultUpazila={userData.upazila}
                  />
                </div>

                {/* Blood Group */}
                <FormSelect
                  name="bloodGroup"
                  label="Blood Group"
                  icon={Droplets}
                  placeholder="Select Blood Group"
                  control={control}
                  rules={{ required: true }}
                  options={BLOOD_GROUPS}
                />

                {/* Action Buttons */}
                <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      type="submit"
                      className="flex-1 bg-linear-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white h-12"
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
    </Container>
  );
};

export default ProfileUpdate;
