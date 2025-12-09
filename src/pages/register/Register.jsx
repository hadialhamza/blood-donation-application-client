import React from "react";
import { useForm, useWatch, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import Container from "../../components/container/Container";
import { uploadImage } from "../../utils/uploadImage";
import { TbFidgetSpinner } from "react-icons/tb";
import { useAuth } from "../../hooks/useAuth";
import useLocations from "../../hooks/useLocations";
import useAxios from "../../hooks/useAxios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Register = () => {
  const api = useAxios();
  const { createUser, updateUser, loading, setLoading } = useAuth();
  const navigate = useNavigate();
  const { districts, upazilas, isLoading: isLocationsLoading } = useLocations();

  // React Hook Form
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  // Watch the district field to filter upazilas
  const selectedDistrict = useWatch({ control, name: "district" });
  const password = useWatch({ control, name: "password" });

  // Filter Upazilas based on selected District
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
      // Start Loading
      setLoading(true);

      // 1. Upload Image to ImgBB
      const imageUrl = await uploadImage(imageFile);
      console.log(imageUrl);

      // 2. Create User in Firebase
      await createUser(email, password);

      // 3. Update Firebase Profile
      await updateUser(name, imageUrl);

      // 4. Save Full User Profile to MongoDB
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
      <div className="flex justify-center mt-20">
        <TbFidgetSpinner className="animate-spin text-4xl text-red-600" />
      </div>
    );
  }

  return (
    <Container>
      <div className="flex justify-center items-center min-h-screen py-10 bg-slate-50 dark:bg-zinc-950">
        <Card className="w-full max-w-lg shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">
              Create Account
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <span className="text-red-500 text-xs">
                    {errors.name.message}
                  </span>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <span className="text-red-500 text-xs">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Avatar Upload */}
              <div className="space-y-2">
                <Label htmlFor="image">Profile Picture</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  className="cursor-pointer file:cursor-pointer"
                  {...register("image", { required: "Image is required" })}
                />
                {errors.image && (
                  <span className="text-red-500 text-xs">
                    {errors.image.message}
                  </span>
                )}
              </div>

              {/* Blood Group Selector */}
              <div className="space-y-2">
                <Label>Blood Group</Label>
                <Controller
                  control={control}
                  name="bloodGroup"
                  rules={{ required: "Blood Group is required" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Blood Group" />
                      </SelectTrigger>
                      <SelectContent>
                        {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                          (bg) => (
                            <SelectItem key={bg} value={bg}>
                              {bg}
                            </SelectItem>
                          )
                        )}
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

              {/* District & Upazila Row */}
              <div className="flex gap-4">
                {/* District Selector */}
                <div className="space-y-2 w-1/2">
                  <Label>District</Label>
                  <Controller
                    control={control}
                    name="district"
                    rules={{ required: "District is required" }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select District" />
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

                {/* Upazila Selector */}
                <div className="space-y-2 w-1/2">
                  <Label>Upazila</Label>
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
                        <SelectTrigger>
                          <SelectValue placeholder="Select Upazila" />
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

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="******"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                {errors.password && (
                  <span className="text-red-500 text-xs">
                    {errors.password.message}
                  </span>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="******"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                />
                {errors.confirmPassword && (
                  <span className="text-red-500 text-xs">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button className="w-full" type="submit" disabled={loading}>
                  {loading ? (
                    <TbFidgetSpinner className="animate-spin text-2xl" />
                  ) : (
                    "Register"
                  )}
                </Button>
              </div>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or
                </span>
              </div>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-bold hover:underline">
                Login here
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
};

export default Register;
