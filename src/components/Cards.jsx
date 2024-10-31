import React, { useContext, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";

const Cards = ({ item }) => {
  const { name, image, price, _id, recipe } = item; // Destructure all relevant properties
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const { user } = useContext(AuthContext); // Access user from AuthContext

  const navigate = useNavigate();
  const location = useLocation();

  // Toggle favorite icon
  const handleHeartClick = () => setIsHeartFilled((prev) => !prev);

  // Add item to cart function
  const handleAddToCart = async () => {
    if (user && user.email) {
      const cartItem = { menuItemId: _id, name, quantity: 1, image, price, email: user.email };
      try {
        const response = await axios.post("https://food-delivery-server-olive.vercel.app/carts", cartItem);
        if (response.data) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Food added to the cart.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } catch (error) {
        console.error("Error adding item to cart:", error.response?.data?.message || error.message);
        Swal.fire({
          position: "center",
          icon: "warning",
          title: error.response?.data?.message || "An error occurred",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
      // User is not logged in
      Swal.fire({
        title: "Please login to order the food",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login now!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  return (
    <div className="card md:my-5 mr-5 shadow-xl relative">
      <div
        className={`rating gap-1 absolute top-2 right-2 p-4 heartStar bg-green ${
          isHeartFilled ? "text-rose-500" : "text-white"
        }`}
        onClick={handleHeartClick}
      >
        <FaHeart className="h-5 w-5 cursor-pointer" />
      </div>
      <Link to='/menu'>
        <figure>
          <img
            src={image}
            alt={`${name}`}
            className="md:h-72 hover:rotate-[60deg] transition-all duration-500"
          />
        </figure>
      </Link>
      <div className="card-body">
        <Link to='/menu'>
          <h2 className="card-title ">{name}</h2>
        </Link>
        <p>{recipe}</p>
        <div className="card-actions justify-between items-center mt-2">
          <h5 className="font-semibold">
            <span className="text-sm text-red">$</span>
            {price}
          </h5>
          <button className="btn bg-green text-white" onClick={handleAddToCart}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
