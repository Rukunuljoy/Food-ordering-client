import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate,  } from "react-router-dom";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthProvider";
import axios from "axios";

const Modal = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const {signUpWithGmail, login} = useContext(AuthContext)
    const [errorMessage,setErrorMessage] = useState("")

      // redirecting to home page or specifig page
      const location = useLocation();
      const navigate = useNavigate();
      const from = location.state?.from?.pathname || "/";

  const onSubmit = data => {
    const email = data.email;
    const password = data.password;
    // console.log(email, password);
    login(email, password).then((result)=>{
      const user = result.user;
      const userInfo = {
        name: data.displayName,
        email: data.email,
      };
      axios.post("food-delivery-server-gray.vercel.app/users", userInfo).then((response) => {
        console.log(response);
        alert("Login successful")
        document.getElementById("my_modal_5").close();
        navigate(from, { replace: true });
      });
    }).catch((error)=>{
      const errorMessage = error.errorMessage;
      setErrorMessage("provide a correct email and password")
    })
    reset();
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
        axios.post("food-delivery-server-gray.vercel.app/users", userInfo).then((response) => {
          console.log(response);
          alert("Account creation successful");
          document.getElementById("my_modal_5").close();
          navigate(from, { replace: true });
        });
      })
      .catch((error) => console.log(error));
  };


  return (
    <dialog id="my_modal_5" className="modal modal-middle sm:modal-middle">
      <div className="modal-box">
        <div className="modal-action flex flex-col mt-0">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body" method="dialog">
            <h3 className="font-bold text-xl">Please Login!</h3>
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
            {errors.exampleRequired && <span className="text-red text-xs">This field is required</span>}
            {
              errorMessage ? <p className="text-red text-xs">{errorMessage}</p> : ""
            }


            {/* login btn  */}
            <div className="form-control mt-6">
              <input
                type="submit"
                value="login"
                className="btn bg-green text-white"
              />
            </div>
            <p className="text-center my-2">
              New here?{" "}
              <Link to="/signup" className="font-bold underline text-red ml-1">
                Create a New Account
              </Link>
            </p>
            <button 
            htmlFor="my_modal_5"
            onClick={() => document.getElementById('my_modal_5').close()}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>


          {/* social sign in  */}
          <div className="text-center space-x-3 mb-5">
            <button className="btn btn-circle hover:bg-green hover:text-white" onClick={handleLogin}>
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
      </div>
    </dialog>
  );
};

export default Modal;
