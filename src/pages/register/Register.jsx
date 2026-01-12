import React, { useState } from "react";
import { useForm, useWatch, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { uploadImage } from "../../utils/uploadImage";
import { useAuth } from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { FaEye, FaEyeSlash, FaQuoteRight, FaHeart } from "react-icons/fa";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import BloodLineLogo from "@/components/shared/logo/BloodLineLogo";
import LocationSelector from "@/components/form/LocationSelector";
import FormSelect from "@/components/form/FormSelect";
import { BLOOD_GROUPS } from "@/data/Data";
import Container from "@/components/shared/container/Container";
import { PasswordStrengthMeter } from "@/components/form/PasswordStrengthMeter";
import { getAuthErrorMessage } from "../../utils/errorUtils";
import GoogleLogin from "@/components/shared/social/GoogleLogin";

const Register = () => {
  const { createUser, updateUser, loading, setLoading } = useAuth();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const api = useAxios();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const password = useWatch({ control, name: "password" });
  const confirmPassword = useWatch({ control, name: "confirmPassword" });
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
      console.error(err);
      toast.error(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className="min-h-screen w-full flex items-center justify-center py-4 mt-15 md:mt-8">
        <div className="bg-white/90 dark:bg-gray-900/90 rounded-2xl overflow-hidden w-full max-w-6xl flex flex-col md:flex-row border border-slate-100 dark:border-gray-800">
          <div className="hidden xl:flex w-1/2 bg-red-600 dark:bg-red-900 relative overflow-hidden flex-col justify-center items-center p-4 text-white text-center">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <svg
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
              >
                <pattern
                  id="pattern"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="20" cy="20" r="2" fill="currentColor" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#pattern)" />
              </svg>
            </div>

            <div className="relative z-10 max-w-md">
              <div className="">
                <FaQuoteRight className="text-6xl text-white opacity-20 mx-auto mb-4" />
                <h2 className="text-4xl font-bold mb-6 leading-tight">
                  Be the Hero <br /> in Someone's Story
                </h2>
                <p className="text-xl opacity-90 leading-relaxed font-light">
                  "Your single donation can save up to three lives. Join our
                  community of heroes and make a difference today."
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg mt-8 flex items-center gap-4 text-left">
                <div className="bg-white text-red-600 rounded-full h-12 w-12 flex items-center justify-center font-bold text-lg shrink-0">
                  10k
                </div>
                <div>
                  <h4 className="font-bold text-lg">Community Strong</h4>
                  <p className="text-sm opacity-80">Active Donors Registered</p>
                </div>
                <FaHeart className="ml-auto text-3xl opacity-50" />
              </div>
            </div>
          </div>

          <div className="w-full xl:w-1/2 p-6 md:p-8 flex flex-col justify-center h-full overflow-y-auto">
            <div className="max-w-xl mx-auto w-full">
              <div className="mb-6 text-center md:text-left">
                <BloodLineLogo />
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-4 mb-1">
                  Create Account
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Join our mission to connect donors and save lives.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      className="h-10 text-sm bg-slate-50 dark:bg-gray-800 border-slate-200 dark:border-gray-700 focus:ring-red-500"
                      {...register("name", { required: "Name is required" })}
                    />
                    {errors.name && (
                      <span className="text-red-500 text-xs">
                        {errors.name.message}
                      </span>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      className="h-10 text-sm bg-slate-50 dark:bg-gray-800 border-slate-200 dark:border-gray-700 focus:ring-red-500"
                      {...register("email", { required: "Email is required" })}
                    />
                    {errors.email && (
                      <span className="text-red-500 text-xs">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Profile Picture */}
                  <div className="space-y-1.5">
                    <Label htmlFor="image" className="text-sm font-medium">
                      Profile Picture
                    </Label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      className="h-10 text-sm cursor-pointer bg-slate-50 dark:bg-gray-800 border-slate-200 dark:border-gray-700 focus:ring-red-500 file:bg-red-100 file:text-red-700 file:border-0 file:rounded-md file:px-2 file:py-1 file:mr-3 file:text-xs file:font-semibold hover:file:bg-red-200"
                      {...register("image", { required: "Image is required" })}
                    />
                    {errors.image && (
                      <span className="text-red-500 text-xs">
                        {errors.image.message}
                      </span>
                    )}
                  </div>

                  {/* Blood Group */}
                  <div className="space-y-1.5">
                    <FormSelect
                      name="bloodGroup"
                      control={control}
                      label="Blood Group"
                      placeholder="Select Group"
                      options={BLOOD_GROUPS}
                      rules={{ required: "Blood Group is required" }}
                      className="h-10 text-sm"
                    />
                  </div>
                </div>

                {/* District and Upazila */}
                <LocationSelector
                  control={control}
                  errors={errors}
                  className="gap-4"
                />

                {/* Passwords Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5 relative">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={isPasswordVisible ? "text" : "password"}
                        placeholder="******"
                        className="h-10 text-sm bg-slate-50 dark:bg-gray-800 border-slate-200 dark:border-gray-700 pr-10 focus:ring-red-500"
                        {...register("password", {
                          required: "Password is required",
                          validate: {
                            minLength: (v) => v.length >= 6 || "Min 6 chars",
                            hasUpper: (v) =>
                              /[A-Z]/.test(v) || "Need uppercase",
                            hasLower: (v) =>
                              /[a-z]/.test(v) || "Need lowercase",
                            hasSpecial: (v) =>
                              /[!@#$%^&*(),.?":{}|<>]/.test(v) ||
                              "Need special char",
                          },
                        })}
                      />
                      <button
                        type="button"
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-600"
                      >
                        {isPasswordVisible ? (
                          <FaEyeSlash size={16} />
                        ) : (
                          <FaEye size={16} />
                        )}
                      </button>
                    </div>
                    <PasswordStrengthMeter password={password} />
                    {errors.password && (
                      <span className="text-red-500 text-xs font-semibold block mt-1">
                        {errors.password.message}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="confirmPassword"
                      className="text-sm font-medium"
                    >
                      Confirm
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={isConfirmPasswordVisible ? "text" : "password"}
                        placeholder="******"
                        className={`h-10 text-sm bg-slate-50 dark:bg-gray-800 border-slate-200 dark:border-gray-700 pr-10 focus:ring-red-500 ${
                          confirmPassword && confirmPassword !== password
                            ? "border-red-500 focus:ring-red-500"
                            : confirmPassword && confirmPassword === password
                            ? "border-green-500 focus:ring-green-500"
                            : ""
                        }`}
                        {...register("confirmPassword", {
                          required: "Confirm password",
                          validate: (val) =>
                            val === password || "Passwords do not match",
                        })}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-600"
                      >
                        {isConfirmPasswordVisible ? (
                          <FaEyeSlash size={16} />
                        ) : (
                          <FaEye size={16} />
                        )}
                      </button>
                    </div>
                    {confirmPassword && confirmPassword !== password && (
                      <p className="text-red-500 text-xs mt-1 font-medium flex items-center gap-1">
                        Password does not match
                      </p>
                    )}
                    {confirmPassword && confirmPassword === password && (
                      <p className="text-green-500 text-xs mt-1 font-medium flex items-center gap-1">
                        Passwords match
                      </p>
                    )}
                  </div>
                </div>

                <Button
                  className="w-full h-10 mt-2 bg-red-600 hover:bg-red-700 text-white font-semibold shadow-md transition-all hover:shadow-lg text-sm"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    "Register as Donor"
                  )}
                </Button>
                <div className="mt-4">
                  <GoogleLogin />
                </div>
              </form>

              <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                Already a lifesaver?{" "}
                <Link
                  to="/login"
                  className="font-bold text-red-600 hover:underline dark:text-red-400"
                >
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Register;
