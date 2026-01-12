import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { Loader2, Shield, User } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdBloodtype } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import BloodLineLogo from "@/components/shared/logo/BloodLineLogo";
import { getAuthErrorMessage } from "../../utils/errorUtils";
import GoogleLogin from "@/components/shared/social/GoogleLogin";

const Login = () => {
  const { signIn, loading, setLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleDemoLogin = (role) => {
    if (role === "admin") {
      setValue("email", "admin@bloodline.com");
      setValue("password", "123456");
    } else if (role === "user") {
      setValue("email", "user@bloodline.com");
      setValue("password", "Abc@123");
    }
  };

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      await signIn(email, password);
      toast.success("Login Successful");
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      toast.error(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-xl rounded-2xl overflow-hidden w-full max-w-6xl flex flex-col md:flex-row border border-slate-100 dark:border-gray-800">
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <div className="mb-6 text-center md:text-left">
              <BloodLineLogo />
            </div>

            <div className="mb-6 text-center md:text-left">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                Welcome Back! 👋
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Please enter your details to sign in.
              </p>
            </div>

            {/* --- Demo Credentials Box --- */}
            <div className="mb-6 p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-800">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center mb-2">
                Quick Demo Access
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleDemoLogin("admin")}
                  className="flex items-center justify-center py-2 px-3 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:border-red-500/50 hover:bg-red-500/5 transition-all group gap-2"
                >
                  <Shield className="w-4 h-4 text-red-600 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                    Admin
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDemoLogin("user")}
                  className="flex items-center justify-center py-2 px-3 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all group gap-2"
                >
                  <User className="w-4 h-4 text-emerald-500 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                    User
                  </span>
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="h-10 text-sm bg-slate-50 dark:bg-gray-800 border-slate-200 dark:border-gray-700 focus:ring-2 focus:ring-red-500 transition-all"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <Link
                    to="/forgot-password"
                    className="text-xs text-red-600 hover:underline dark:text-red-400"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder="••••••••"
                    className="h-10 text-sm bg-slate-50 dark:bg-gray-800 border-slate-200 dark:border-gray-700 pr-10 focus:ring-2 focus:ring-red-500 transition-all"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    {isPasswordVisible ? (
                      <FaEyeSlash size={16} />
                    ) : (
                      <FaEye size={16} />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full h-10 bg-red-600 hover:bg-red-700 text-white font-semibold transition-all shadow-md hover:shadow-lg text-sm"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  "Sign In"
                )}
              </Button>
              <div className="mt-4">
                <GoogleLogin />
              </div>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-red-600 hover:underline dark:text-red-400"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>

        <div className="hidden md:flex w-1/2 bg-linear-to-br from-red-600 to-rose-700 relative overflow-hidden items-center justify-center text-white p-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

          <div className="relative z-10 max-w-md text-center">
            <div className="mb-6 inline-flex p-4 bg-white/20 backdrop-blur-md rounded-full shadow-lg border border-white/30">
              <MdBloodtype className="text-5xl text-white" />
            </div>
            <h2 className="text-4xl font-bold mb-6 leading-tight">
              Every Drop Counts
            </h2>
            <p className="text-lg text-red-50 opacity-90 leading-relaxed mb-8">
              "Join our community of heroes. Your donation can be the lifeline
              someone is desperately waiting for today."
            </p>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-left">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-sm font-medium uppercase tracking-wider text-red-100">
                  Live Impact
                </span>
              </div>
              <div className="text-3xl font-bold">12,450+</div>
              <div className="text-sm text-red-100 opacity-80">
                Lives saved this year
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
