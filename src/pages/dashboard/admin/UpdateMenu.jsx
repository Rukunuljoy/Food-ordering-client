import React from 'react';
import { useForm } from 'react-hook-form';
import { FaUtensils } from 'react-icons/fa';
import { useLoaderData, useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import LoadingSpinner from '../../../components/LoadingSpinner';

const UpdateMenu = () => {
    const {register,handleSubmit, reset} = useForm();
    const item = useLoaderData();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
  
    // image hosting key 
    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    // console.log(image_hosting_key)
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
    
    const onSubmit = async(data) => {
      // console.log(data)
      const imagesFile = {image: data.image[0]}
      const hostingImage = await axiosPublic.post(image_hosting_api, imagesFile, {
        headers: {
          'content-type' : "multipart/form-data"
        }
      });
      // console.log(hostingImage)
      if(hostingImage.data.success){
        const menuItem = {
          name: data.name,
          category: data.category,
          price: parseFloat(data.price),
          recipe:data.recipe,
          image:hostingImage.data.data.display_url
        }
        // console.log(menuItem)
        const postMenuItem = axiosSecure.patch(`/menu/${item._id}`, menuItem)
        // console.log(postMenuItem)
        if(postMenuItem){
          reset();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Item updated successfully",
            showConfirmButton: false,
            timer: 1500
          });
          navigate("/dashboard/manage-items");
        }
      }
    }
  
    // Check if item is loaded
    if (!item) {
      return <LoadingSpinner/>;
    }

    return (
        <div className="w-full md:w-[870px] px-4 mx-auto">
      <h2 className="text-2xl font-semibold my-4">
       Update A New <span className="text-green">Menu Item</span>
      </h2>

      {/* form here  */}
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full">
            <div className="label">
              <span className="label-text">
                Recipe Name<span className="text-red">*</span>
              </span>
            </div>
            <input
            defaultValue={item.name}
              type="text"
              {...register("name", { required: true })}
              placeholder="Recipe Name"
              className="input input-bordered w-full"
            />
          </div>
          {/* 2nd rows  */}
          <div className="flex items-center my-6 gap-6">
            {/* categories  */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">
                  Category<span className="text-red">*</span>{" "}
                </span>
              </label>
              <select 
               {...register("category", { required: true })}
               defaultValue={item.category}
              className="select select-bordered">
                <option disabled defaultValue='default'>
                  Select a Category
                </option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="dessert">Dessert</option>
                <option value="drinks">Drinks</option>
                <option value="popular">Popular</option>
              </select>
            </div>

            {/* prices */}
            <div className="form-control w-full">
              <div className="label">
                <span className="label-text">
                  Prices<span className="text-red">*</span>
                </span>
              </div>
              <input
               {...register("price", { required: true })}
               defaultValue={item.price}
                type="number"
                placeholder="Recipe Name"
                className="input input-bordered w-full"
              />
            </div>
          </div>
          {/* 3rd row  */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Recipe Details</span>
            </label>
            <textarea
            defaultValue={item.recipe}
             {...register("recipe", { required: true })}
              className="textarea textarea-bordered h-24"
              placeholder="Tell Us something about your recipe"
            ></textarea>
          </div>

          {/* 4th row  */}
          <div className="form-control w-full my-6 max-w-xs">
            <input
              type="file"
              {...register("image", { required: true })}
              className="file-input w-full max-w-xs"
            />
          </div>

          <button className="btn bg-green text-white px-6">Update Item <FaUtensils/></button>
        </form>
      </div>
    </div>
    );
};

export default UpdateMenu;
