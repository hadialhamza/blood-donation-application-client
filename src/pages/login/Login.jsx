import React from "react";
import Container from "../../components/container/Container";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

const Login = () => {
  const onSubmit = (data) => {
    console.log(data);
  };

  const { register, handleSubmit } = useForm();
  return (
    <Container>
      <div className="h-screen">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto mt-20">
          <div className="card-body">
            <h2 className="text-3xl text-center font-bold">Login</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="fieldset">
              <label className="label">Email</label>
              <input
                type="email"
                className="input"
                placeholder="Email"
                {...register("email", { required: true })}
              />
              <label className="label">Password</label>
              <input
                type="password"
                className="input"
                placeholder="Password"
                {...register("password", { required: true })}
              />
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="btn btn-neutral mt-4">Login</button>
            </form>
            <p>Already have and account? <Link to="/register" className="text-blue-500 underline">Register</Link></p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Login;
