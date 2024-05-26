import React, { useContext } from 'react';
import { useForm } from "react-hook-form"
import { AuthContext } from '../../contexts/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';


const UpdateProfile = () => {
    const {updateUserProfile} = useContext(AuthContext)
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()

          // redirecting to home page or specifig page
          const location = useLocation();
          const navigate = useNavigate();
          const from = location.state?.from?.pathname || "/";

      const onSubmit = (data) => {
        const name = data.name;
        const photoURL = data.photoURL;
        updateUserProfile(name, photoURL).then(() => {
            // Profile updated!
            // ...
            alert("Profile updated successfully")
            navigate(from,{replace:true})
          }).catch((error) => {
            // An error occurred
            // ...
          });
          
      }

    return (
   <div className='flex items-center justify-center h-screen'>
     <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <h3 className='text-2xl font-semibold'>Update your profile</h3>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input {...register("name")} type="text" placeholder="Your Name" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Upload Photo</span>
          </label>
          <input type="text" {...register("photoURL")} placeholder="photoURL" className="input input-bordered" required />
          {/* TODO: uploading image will be later */}
          {/* <input type="file" className="file-input w-full max-w-xs" /> */}

        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary bg-green border-none text-white">Update</button>
        </div>
      </form>
    </div>
   </div>
  
    );
};

export default UpdateProfile;