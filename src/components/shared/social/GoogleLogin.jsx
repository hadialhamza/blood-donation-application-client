import React from "react";
import { useAuth } from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";

const GoogleLogin = () => {
  const { googleSignIn } = useAuth();
  const headers = useAxios();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await googleSignIn();
      const userInfo = {
        name: result.user?.displayName,
        email: result.user?.email,
        avatar: result.user?.photoURL,
        bloodGroup: "N/A",
        district: "N/A",
        upazila: "N/A",
        status: "active",
        role: "donor",
      };

      const dbResponse = await headers.post("/users", userInfo);

      if (dbResponse.data.insertedId) {
        toast.success("Account created successfully!");
      } else {
        toast.success("Login Successful!");
      }
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Google Login Failed");
    }
  };

  return (
    <div className="w-full">
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-slate-200 dark:border-zinc-700" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white dark:bg-gray-900/90 px-2 text-slate-500 font-medium">
            Or continue with
          </span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full h-11 bg-white dark:bg-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-700 border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-slate-200 font-medium transition-all"
        onClick={handleGoogleLogin}
      >
        <FcGoogle className="mr-2 h-5 w-5" />
        Sign In with Google
      </Button>
    </div>
  );
};

export default GoogleLogin;
