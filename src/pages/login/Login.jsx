import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { useAuth } from "../../hooks/useAuth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdBloodtype } from "react-icons/md";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import BloodLineLogo from "@/components/logo/BloodLineLogo";

const Login = () => {
  const { signIn, loading, setLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      // Sign In User
      await signIn(email, password);

      // Success Feedback & Redirect
      toast.success("Login Successful");
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    // Page Background: Light (slate-50) / Dark (gray-950)
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 flex justify-center items-center p-4 transition-colors duration-300">
      <title>Blood Line | Login</title>

      <div className="flex flex-col xl:flex-row w-full bg-white dark:bg-gray-900 rounded-3xl overflow-hidden max-w-[1400px] shadow-2xl border border-slate-100 dark:border-gray-800">
        {/* Left Side: Login Form */}
        <div className="w-full xl:w-1/2 p-8 lg:p-12 2xl:p-20 flex flex-col justify-center">
          <div className="max-w-[480px] mx-auto w-full">
            {/* Logo area */}
            <div className="mb-5">
              <BloodLineLogo />
            </div>

            {/* Heading */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                Welcome Back! 👋
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-2 text-base">
                Sign in to manage your donations or find donors.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-slate-700 dark:text-slate-300 font-medium"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="donor@example.com"
                  className="h-11 border-slate-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-red-500 focus:ring-red-500"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <span className="text-red-500 text-xs">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
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
                    placeholder="******"
                    className="h-11 border-slate-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-red-500 focus:ring-red-500 pr-10"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                    onClick={togglePasswordVisibility}
                  >
                    {isPasswordVisible ? (
                      <FaEyeSlash className="h-5 w-5" />
                    ) : (
                      <FaEye className="h-5 w-5" />
                    )}
                  </div>
                </div>
                {errors.password && (
                  <span className="text-red-500 text-xs">
                    {errors.password.message}
                  </span>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isRemebered"
                    className="h-4 w-4 rounded border-slate-300 text-red-600 focus:ring-red-500"
                  />
                  <label
                    htmlFor="isRemebered"
                    className="text-sm text-slate-600 dark:text-slate-400 cursor-pointer font-medium"
                  >
                    Remember me
                  </label>
                </div>
                <a
                  href="#"
                  className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium hover:underline"
                >
                  Forgot Password?
                </a>
              </div>

              {/* Submit Button */}
              <Button
                className="w-full h-11 text-base font-semibold bg-red-600 hover:bg-red-700 text-white dark:bg-red-600 dark:hover:bg-red-700 transition-all shadow-md hover:shadow-lg"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <TbFidgetSpinner className="animate-spin text-2xl" />
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="mt-8 text-center text-base text-slate-600 dark:text-slate-400">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-bold hover:underline"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side: Decorative Image & Testimonial */}
        <div className="hidden xl:block w-1/2 bg-red-600 dark:bg-red-900 relative overflow-hidden">
          {/* Background SVG shape - Adjusted Colors for Blood Theme */}
          <svg
            className="absolute top-0 right-0 pointer-events-none"
            width="100%"
            height="100%"
            viewBox="0 0 1208 1080"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_f_4801_13605)">
              <circle
                cx="604"
                cy="565"
                r="404"
                fill="url(#paint0_radial_4801_13605)"
              ></circle>
            </g>
            <defs>
              <filter
                id="filter0_f_4801_13605"
                x="0"
                y="-39"
                width="1208"
                height="1208"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                ></feBlend>
                <feGaussianBlur
                  stdDeviation="100"
                  result="effect1_foregroundBlur_4801_13605"
                ></feGaussianBlur>
              </filter>
              <radialGradient
                id="paint0_radial_4801_13605"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(805.322 373.168) rotate(134.675) scale(1098.13)"
              >
                <stop stopColor="#f43f5e" stopOpacity="0.6"></stop>{" "}
                {/* Rose-500 */}
                <stop offset="1" stopColor="#f43f5e" stopOpacity="0"></stop>
              </radialGradient>
            </defs>
          </svg>

          {/* Testimonial Content */}
          <div className="relative z-10 h-full flex flex-col justify-center p-16 text-white">
            {/* Quote Pattern */}
            <svg
              className="absolute -top-6 -right-6 hidden lg:block text-white opacity-10"
              width="209"
              height="162"
              viewBox="0 0 209 162"
              fill="currentColor"
            >
              <path d="M62 25H0V0H209V162H185C184.317 129.162 169.576 122.271 158.235 120.921H121.512C100.402 119.676 90.7287 104.351 90.7287 93.7286V57.8571C89.4326 35.64 71.0009 26.7357 62 25Z" />
            </svg>

            <div className="mb-6">
              <h2 className="text-5xl font-semibold leading-tight">
                Give Blood, <br /> Save a Life...
              </h2>
            </div>

            <div className="text-xl opacity-90 mb-10 leading-relaxed max-w-lg">
              "Connecting donors with those in need has never been easier. Blood
              Line is a lifesaver in every sense of the word. Join our community
              today."
            </div>

            {/* Testimonial Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 relative border border-white/20 max-w-md shadow-lg">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 bg-white rounded-full flex items-center justify-center text-xl font-bold text-red-600">
                  SJ
                </div>
                <div>
                  <h4 className="text-xl font-bold">Sarah Jenkins</h4>
                  <p className="text-sm opacity-80">Regular Donor</p>
                </div>
              </div>
              <p className="mt-6 text-lg leading-relaxed opacity-90 italic">
                "I was able to find a recipient in minutes. The platform is
                fast, secure, and reliable."
              </p>

              {/* Decorative Corner Icon */}
              <div className="absolute top-0 right-0 p-4 opacity-20">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M14.017 21L14.017 18C14.017 16.8954 13.1216 16 12.017 16H9.01735C8.46506 16 8.01735 15.5523 8.01735 15V9H14.017V22H14.017ZM21.017 21L21.017 18C21.017 16.8954 20.1216 16 19.017 16H16.017C15.4651 16 15.0174 15.5523 15.0174 15V9H21.017V22H21.017ZM7 9H2V2H7V9ZM21 9H16V2H21V9ZM7 21H2V12H7V21ZM21 21H16V12H21V21Z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
