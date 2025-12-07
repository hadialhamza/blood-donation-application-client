import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import Container from "../../components/container/Container";
import { uploadImage } from "../../utils";
import { TbFidgetSpinner } from "react-icons/tb";
import { useAuth } from "../../hooks/useAuth";

const Register = () => {
  const { createUser, updateUser, loading, setLoading } = useAuth();
  const navigate = useNavigate();
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

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

  // Fetch Districts & Upazilas from Database
  useEffect(() => {
    axios
      .get("http://localhost:5000/districts")
      .then((res) => setDistricts(res?.data[0]?.data));

    axios
      .get("http://localhost:5000/upazilas")
      .then((res) => setUpazilas(res?.data[0]?.data));
  }, []);

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
      const imageData = await uploadImage(imageFile);
      const imageUrl = imageData?.data?.display_url;
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

      const dbResponse = await axios.post(
        "http://localhost:5000/users",
        userInfo
      );

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

  return (
    <Container>
      <div className="flex justify-center items-center min-h-screen py-10 bg-base-200">
        <div className="card w-full max-w-lg shadow-2xl bg-base-100">
          <div className="card-body">
            <h2 className="text-3xl font-bold text-center mb-6">
              Create Account
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="input input-bordered w-full"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </span>
                )}
              </div>

              {/* Email Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="input input-bordered w-full"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Avatar Upload */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Profile Picture</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="file-input file-input-bordered w-full"
                  {...register("image", { required: "Image is required" })}
                />
                {errors.image && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.image.message}
                  </span>
                )}
              </div>

              {/* Blood Group Selector */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Blood Group</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  defaultValue=""
                  {...register("bloodGroup", {
                    required: "Blood Group is required",
                  })}
                >
                  <option value="" disabled>
                    Select Blood Group
                  </option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
                {errors.bloodGroup && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.bloodGroup.message}
                  </span>
                )}
              </div>

              {/* District & Upazila Row */}
              <div className="flex gap-4">
                {/* District Selector */}
                <div className="form-control w-1/2">
                  <label className="label">
                    <span className="label-text">District</span>
                  </label>
                  <select
                    className="select select-bordered w-full"
                    defaultValue=""
                    {...register("district", {
                      required: "District is required",
                    })}
                  >
                    <option value="" disabled>
                      Select District
                    </option>
                    {/* Sort districts alphabetically */}
                    {districts
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((d) => (
                        <option key={d.id} value={d.name}>
                          {d.name}
                        </option>
                      ))}
                  </select>
                  {errors.district && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.district.message}
                    </span>
                  )}
                </div>

                {/* Upazila Selector (Filtered) */}
                <div className="form-control w-1/2">
                  <label className="label">
                    <span className="label-text">Upazila</span>
                  </label>
                  <select
                    className="select select-bordered w-full"
                    defaultValue=""
                    {...register("upazila", {
                      required: "Upazila is required",
                    })}
                    disabled={!selectedDistrict} // Disable until district is selected
                  >
                    <option value="" disabled>
                      Select Upazila
                    </option>
                    {/* Map filtered upazilas */}
                    {filteredUpazilas
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((u) => (
                        <option key={u.id} value={u.name}>
                          {u.name}
                        </option>
                      ))}
                  </select>
                  {errors.upazila && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.upazila.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Password Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="******"
                  className="input input-bordered w-full"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                {errors.password && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </span>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  placeholder="******"
                  className="input input-bordered w-full"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                />
                {errors.confirmPassword && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <div className="form-control mt-6">
                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <TbFidgetSpinner className="animate-spin text-2xl m-auto" />
                  ) : (
                    "Register"
                  )}
                </button>
              </div>
            </form>

            <div className="divider">OR</div>

            <p className="text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary font-bold">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Register;
