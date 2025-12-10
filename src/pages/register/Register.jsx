import React, { useState } from "react";
import { useForm, useWatch, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { uploadImage } from "../../utils/uploadImage";
import { TbFidgetSpinner } from "react-icons/tb";
import { useAuth } from "../../hooks/useAuth";
import useLocations from "../../hooks/useLocations";
import useAxios from "../../hooks/useAxios";
import { FaEye, FaEyeSlash, FaQuoteRight, FaHeart } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BloodLineLogo from "@/components/logo/BloodLineLogo";

const Register = () => {
  const { createUser, updateUser, loading, setLoading } = useAuth();
  const { districts, upazilas, isLoading: isLocationsLoading } = useLocations();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const api = useAxios();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const selectedDistrict = useWatch({ control, name: "district" });
  const password = useWatch({ control, name: "password" });

  const currentDistrict = districts.find(
    (district) => district.name === selectedDistrict
  );
  const filteredUpazilas = currentDistrict
    ? upazilas.filter((upazila) => upazila.district_id === currentDistrict.id)
    : [];

  const onSubmit = async (data) => {
    const { name, email, image, password, bloodGroup, district, upazila } =
      data;
    const imageFile = image[0];

    try {
      setLoading(true);
      const imageUrl = await uploadImage(imageFile);
      await createUser(email, password);
      await updateUser(name, imageUrl);
      const userInfo = {
        name,
        email,
        bloodGroup,
        district,
        upazila,
        avatar: imageUrl,
      };
      const dbResponse = await api.post("users", userInfo);
      if (dbResponse.data.insertedId) {
        toast.success("Registration Successful!");
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };
  if (isLocationsLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-slate-50 dark:bg-gray-950">
        <TbFidgetSpinner className="animate-spin text-5xl text-red-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 flex justify-center items-center p-4 transition-colors duration-300">
      {/* Left side content */}
      <div className="flex flex-col xl:flex-row w-full bg-white dark:bg-gray-900 rounded-3xl overflow-hidden max-w-[1400px] shadow-2xl border border-slate-100 dark:border-gray-800">
        <div className="hidden xl:block w-1/2 bg-red-600 dark:bg-red-900 relative overflow-hidden order-1 xl:order-1">
          <div className="relative z-10 h-full flex flex-col justify-center p-12 lg:p-16 text-white text-center">
            <FaQuoteRight className="absolute -top-6 -right-6 hidden lg:block text-white opacity-10 text-[10rem]" />
            <div className="mb-6">
              <h2 className="text-4xl lg:text-5xl font-semibold leading-tight">
                Be the Hero <br /> in Someone's Story
              </h2>
            </div>
            <div className="text-lg lg:text-xl opacity-90 mb-8 lg:mb-10 leading-relaxed mx-auto max-w-lg">
              "Your single donation can save up to three lives. Join our
              community of heroes and make a difference today."
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 lg:p-8 relative border border-white/20 max-w-md mx-auto shadow-lg">
              <div className="flex items-center justify-center gap-4 text-center">
                <div className="h-12 w-12 lg:h-14 lg:w-14 bg-white rounded-full flex items-center justify-center text-xl font-bold text-red-600">
                  10k
                </div>
                <div>
                  <h4 className="text-lg lg:text-xl font-bold">
                    Community Strong
                  </h4>
                  <p className="text-sm opacity-80">Active Donors Registered</p>
                </div>
              </div>
              <p className="mt-4 lg:mt-6 text-base lg:text-lg leading-relaxed opacity-90 italic">
                "Signing up was the best decision I made this year. The feeling
                of helping others is unmatched."
              </p>
              <FaHeart className="absolute top-0 right-0 p-3 opacity-50 text-4xl" />
            </div>
          </div>
        </div>
        {/* Registration Form */}
        <div className="w-full xl:w-1/2 p-8 lg:p-10 2xl:p-12 flex flex-col justify-center order-2 xl:order-2">
          <div className="max-w-[480px] mx-auto w-full">
            {/* Logo */}
            <div className="mb-4">
              <BloodLineLogo />
            </div>

            {/* Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                Create Account
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
                Join our mission to connect donors and save lives.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <div className="space-y-1">
                <Label
                  htmlFor="name"
                  className="text-slate-700 dark:text-slate-300 font-medium"
                >
                  Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter Your Name"
                  className="h-10 border-slate-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-red-500 focus:ring-red-500"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <span className="text-red-500 text-xs">
                    {errors.name.message}
                  </span>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1">
                <Label
                  htmlFor="email"
                  className="text-slate-700 dark:text-slate-300 font-medium"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter Your Email"
                  className="h-10 border-slate-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-red-500 focus:ring-red-500"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <span className="text-red-500 text-xs">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Profile Picture */}
              <div className="space-y-1">
                <Label
                  htmlFor="image"
                  className="text-slate-700 dark:text-slate-300 font-medium"
                >
                  Profile Picture
                </Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  className="h-10 pt-1.5 cursor-pointer border-slate-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-red-500 file:text-red-600"
                  {...register("image", { required: "Image is required" })}
                />
                {errors.image && (
                  <span className="text-red-500 text-xs">
                    {errors.image.message}
                  </span>
                )}
              </div>

              {/* Blood Group, District & Upazila */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <Label className="text-slate-700 dark:text-slate-300 font-medium">
                    Group
                  </Label>
                  <Controller
                    control={control}
                    name="bloodGroup"
                    rules={{ required: "Group is required" }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="h-10 border-slate-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                          <SelectValue placeholder="Blood Group" />{" "}
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
                  {errors.bloodGroup && (
                    <span className="text-red-500 text-xs">
                      {errors.bloodGroup.message}
                    </span>
                  )}
                </div>
                {/* District */}
                <div className="space-y-1">
                  <Label className="text-slate-700 dark:text-slate-300 font-medium">
                    District
                  </Label>
                  <Controller
                    control={control}
                    name="district"
                    rules={{ required: "District is required" }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="h-10 border-slate-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                          <SelectValue placeholder="Select District" />{" "}
                        </SelectTrigger>
                        <SelectContent className="max-h-[200px]">
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
                  {errors.district && (
                    <span className="text-red-500 text-xs">
                      {errors.district.message}
                    </span>
                  )}
                </div>

                {/* Upazila */}
                <div className="space-y-1">
                  <Label className="text-slate-700 dark:text-slate-300 font-medium">
                    Upazila
                  </Label>
                  <Controller
                    control={control}
                    name="upazila"
                    rules={{ required: "Upazila is required" }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={!selectedDistrict}
                      >
                        <SelectTrigger className="h-10 border-slate-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                          <SelectValue placeholder="Select Upazila" />{" "}
                          {/* Updated Placeholder */}
                        </SelectTrigger>
                        <SelectContent className="max-h-[200px]">
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
                  {errors.upazila && (
                    <span className="text-red-500 text-xs">
                      {errors.upazila.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Password*/}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label
                    htmlFor="password"
                    className="text-slate-700 dark:text-slate-300 font-medium"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={isPasswordVisible ? "text" : "password"}
                      placeholder="Enter Password (Min 6 chars)"
                      className="h-10 border-slate-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-red-500 focus:ring-red-500 pr-10"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                    />
                    <div
                      className="absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    >
                      {isPasswordVisible ? (
                        <FaEyeSlash className="h-4 w-4" />
                      ) : (
                        <FaEye className="h-4 w-4" />
                      )}
                    </div>
                  </div>
                  {errors.password && (
                    <span className="text-red-500 text-xs">
                      {errors.password.message}
                    </span>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-1">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-slate-700 dark:text-slate-300 font-medium"
                  >
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={isConfirmPasswordVisible ? "text" : "password"}
                      placeholder="Confirm Your Password"
                      className="h-10 border-slate-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-red-500 focus:ring-red-500 pr-10"
                      {...register("confirmPassword", {
                        required: "Please confirm your password",
                        validate: (value) =>
                          value === password || "Passwords do not match",
                      })}
                    />
                    <div
                      className="absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                      onClick={() =>
                        setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                      }
                    >
                      {isConfirmPasswordVisible ? (
                        <FaEyeSlash className="h-4 w-4" />
                      ) : (
                        <FaEye className="h-4 w-4" />
                      )}
                    </div>
                  </div>
                  {errors.confirmPassword && (
                    <span className="text-red-500 text-xs">
                      {errors.confirmPassword.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Submit */}
              <div className="pt-2">
                <Button
                  className="w-full h-10 text-base font-semibold bg-red-600 hover:bg-red-700 text-white dark:bg-red-600 dark:hover:bg-red-700 transition-all shadow-md hover:shadow-lg"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <TbFidgetSpinner className="animate-spin text-xl" />
                  ) : (
                    "Register as a Donor"
                  )}
                </Button>
              </div>
            </form>
            <div className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
              Already a lifesaver?{" "}
              <Link
                to="/login"
                className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-bold hover:underline"
              >
                Login here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
