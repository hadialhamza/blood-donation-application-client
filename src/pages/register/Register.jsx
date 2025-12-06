import React from "react";
import Container from "../../components/container/Container";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { uploadImage } from "../../utils";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    const { name, email, image, password } = data;
    const imageFile = image[0];

    const imageUrl = await uploadImage(imageFile);

    console.log(name, email, imageUrl, password);
  };
  return (
    <Container>
      <div className="h-screen">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto mt-20">
          <div className="card-body">
            <h2 className="text-3xl text-center font-bold">Register</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="fieldset">
              {/* Name */}
              <label className="label">Name</label>
              <input
                type="text"
                className="input"
                placeholder="Enter your name"
                {...register("name", { required: true })}
              />

              {/* Email */}
              <label className="label">Email</label>
              <input
                type="email"
                className="input"
                placeholder="Enter your email"
                {...register("email", { required: true })}
              />

              {/* Image */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  Select Profile Image
                </legend>
                <input
                  type="file"
                  className="file-input"
                  accept="image/*"
                  {...register("image")}
                />
                <label className="label">Max size 2MB</label>
              </fieldset>

              {/* Password */}
              <label className="label">Password</label>
              <input
                type="password"
                className="input"
                placeholder="Enter your password"
                {...register("password", { required: true })}
              />
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="btn btn-neutral mt-4">Register</button>
            </form>
            <p className="text-center mt-4">
              Already have an account?{" "}
              <Link to="/login" className="link link-hover text-blue-500">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Register;
