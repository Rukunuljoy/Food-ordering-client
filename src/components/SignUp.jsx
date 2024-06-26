import React, { useContext } from "react";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Modal from "./Modal";
import { AuthContext } from "../contexts/AuthProvider";
import { useLocation } from "react-router-dom";
import axios from "axios";
import useAxiosPublic from "../hooks/useAxiosPublic";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, updateUserProfile, signUpWithGmail } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  // redirecting to home page or specifig page
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = data => {
    const email = data.email;
    const password = data.password;
    // console.log(email, password);
    createUser(email, password).then((result)=>{
      const user = result.user;
      updateUserProfile(data.email, data.photoURL).then(() => {
        const userInfo = {
          name: data.name,
          email: data.email,
        }
        axiosPublic.post("/users", userInfo).then((response) => {
          console.log(response);
          alert("Account creation successful");
          document.getElementById("my_modal_5").close();
          navigate(from, { replace: true });
        });
      });
    }).catch((error)=>{
     console.log("provide a currect login error", error)
    })
  };

  // google signin
  const handleLogin = () => {
    signUpWithGmail()
      .then((result) => {
        const user = result.user;
        const userInfo = {
          name: result?.user.displayName,
          email: result?.user.email,
        };
        axiosPublic.post("/users", userInfo).then((response) => {
          console.log(response);
          alert("Account creation successful");
          document.getElementById("my_modal_5").close();
          navigate(from, { replace: true });
        });
      })
      .catch((error) => console.log(error));
  };

  // const onSubmit = data => console.log(data);
  return (
    <div className="max-w-md bg-white w-full mx-auto shadow-lg flex items-center justify-center my-20">
      <div className="modal-action flex flex-col justify-center mt-0">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card-body"
          method="dialog"
        >
          <h3 className="font-bold text-xl">Create A Account!</h3>
          {/* Name  */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="name"
              placeholder="name"
              className="input input-bordered"
              {...register("name")}
            />
          </div>
          {/* email  */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              {...register("email")}
            />
          </div>
          {/* password  */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              {...register("password")}
            />
            <label className="label mt-1">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>

          {/* error; text */}
          {errors.exampleRequired && <span>This field is required</span>}

          {/* login btn  */}
          <div className="form-control mt-6">
            <input
              type="submit"
              value="Sign Up"
              className="btn bg-green text-white"
            />
          </div>
          <p className="text-center my-2">
            Have an account?{" "}
            <button
              onClick={() => document.getElementById("my_modal_5").showModal()}
              className="font-bold underline text-red ml-1"
            >
              Login
            </button>
          </p>
          <Link
            to="/"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </Link>
        </form>

        {/* social sign in  */}
        <div className="text-center space-x-3 mb-5">
          <button
            className="btn btn-circle hover:bg-green hover:text-white"
            onClick={handleLogin}
          >
            <FaGoogle />
          </button>
          <button className="btn btn-circle hover:bg-green hover:text-white">
            <FaFacebook />
          </button>
          <button className="btn btn-circle hover:bg-green hover:text-white">
            <FaGithub />
          </button>
        </div>
      </div>
      <Modal />
    </div>
  );
};

export default SignUp;
