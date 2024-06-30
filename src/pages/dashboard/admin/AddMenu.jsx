import React from "react";
import { FaUtensils } from "react-icons/fa";

const AddMenu = () => {
  return (
    <div className="w-full md:w-[870px] px-4 mx-auto">
      <h2 className="text-2xl font-semibold my-4">
        Upload A New <span className="text-green">Menu Item</span>
      </h2>

      {/* form here  */}
      <div>
        <form>
          <div className="form-control w-full">
            <div className="label">
              <span className="label-text">
                Recipe Name<span className="text-red">*</span>
              </span>
            </div>
            <input
              type="text"
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
              <select className="select select-bordered">
                <option disabled selected>
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
              className="textarea textarea-bordered h-24"
              placeholder="Tell Us something about your recipe"
            ></textarea>
          </div>

          {/* 4th row  */}
          <div className="form-control w-full my-6 max-w-xs">
            <input
              type="file"
              className="file-input w-full max-w-xs"
            />
          </div>

          <button className="btn bg-green text-white px-6">Add Item <FaUtensils/></button>
        </form>
      </div>
    </div>
  );
};

export default AddMenu;
