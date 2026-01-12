import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdBloodtype } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import BloodLineLogo from "@/components/shared/logo/BloodLineLogo";

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
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-xl rounded-2xl overflow-hidden w-full max-w-6xl flex flex-col md:flex-row border border-slate-100 dark:border-gray-800">
        <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <div className="mb-8 text-center md:text-left">
              <BloodLineLogo />
            </div>
            <div className="mb-8 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome Back! 👋
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Please enter your details to sign in.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="h-11 bg-slate-50 dark:bg-gray-800 border-slate-200 dark:border-gray-700 focus:ring-2 focus:ring-red-500 transition-all"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
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
                    className="h-11 bg-slate-50 dark:bg-gray-800 border-slate-200 dark:border-gray-700 pr-10 focus:ring-2 focus:ring-red-500 transition-all"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
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
                className="w-full h-11 bg-red-600 hover:bg-red-700 text-white font-semibold transition-all shadow-md hover:shadow-lg"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="animate-spin text-xl" />
                ) : (
                  "Sign In"
                )}
              </Button>
              <div className="flex gap-4 mb-4">
                <Button
                  type="button"
                  onClick={() => handleDemoLogin("admin")}
                  className="flex-1 bg-zinc-800 hover:bg-zinc-900 text-white"
                >
                  Demo Admin
                </Button>
                <Button
                  type="button"
                  onClick={() => handleDemoLogin("user")}
                  className="flex-1 bg-red-100 hover:bg-red-200 text-red-600 border border-red-200"
                >
                  Demo User
                </Button>
              </div>
            </form>

            <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
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
