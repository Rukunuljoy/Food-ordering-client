import React, { useContext, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";

const Cards = ({ item }) => {
  const { name, image, price, _id } = item;
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const { user } = useContext(AuthContext);
  // console.log(user);

  const navigate = useNavigate()
  const location = useLocation()

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  // add to cart handler
  const handleAddToCart = (item) => {
    // Destructure the item to get the necessary properties
    const { _id, name, image, price } = item;
  
    // Check if the user is logged in
    if (user && user.email) {
      // Construct the cart item object
      const cartItem = { menuItemId: _id, name, quantity: 1, image, price, email: user.email };
  
      // Make the POST request to add the item to the cart
      axios.post('https://food-delivery-server-olive.vercel.app/carts', cartItem)
        .then((response) => {
          // Check if the response is successful
          if (response.data) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Food added to the cart.',
              showConfirmButton: false,
              timer: 1500
            });
          }
        })
        .catch((error) => {
          // Handle the error response
          console.log(error.response.data.message);
          const errorMessage = error.response.data.message;
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: errorMessage,
            showConfirmButton: false,
            timer: 1500
          });
        });
    } else {
      // Show a warning if the user is not logged in
      Swal.fire({
        title: 'Please login to order the food',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Login now!'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login', { state: { from: location } });
        }
      });
    }
  };
  

  return (
    <div
      to={`/menu/${item._id}`}
      className="card md:my-5 mr-5 shadow-xl relative"
    >
      <div
        className={`rating gap-1 absolute top-2 right-2 p-4 heartStar bg-green ${
          isHeartFilled ? "text-rose-500" : "text-white"
        }`}
        onClick={handleHeartClick}
      >
        <FaHeart className="h-5 w-5 cursor-pointer" />
      </div>
      <Link to={`/menu/${item._id}`}>
        <figure>
          <img
            src={item.image}
            alt="images"
            className="md:h-72 hover:rotate-[60deg] transition-all duration-500"
          />
        </figure>
      </Link>
      <div className="card-body">
        <Link to={`/menu/${item._id}`}>
          <h2 className="card-title ">{item.name}</h2>
        </Link>
        <p>{item.recipe}</p>
        <div className="card-actions justify-between items-center mt-2">
          <h5 className="font-semibold">
            <span className="text-sm text-red">$</span>
            {item.price}
          </h5>
          <button
            className="btn bg-green text-white"
            onClick={() => handleAddToCart(item)}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
