import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Cards = ({ item }) => {

    const [isHeartFilled, setIsHeartFilled] = useState(false)

    const handleHeartClick = ()=>{
        setIsHeartFilled(!isHeartFilled)
    }
  return (
    <div to={`/menu/${item._id}`} className="card md:my-5 mr-5 shadow-xl relative">
        <div className={`rating gap-1 absolute top-2 right-2 p-4 heartStar bg-green ${isHeartFilled ? "text-rose-500" : "text-white"}`}
        onClick={handleHeartClick}
        >
            <FaHeart className="h-5 w-5 cursor-pointer"/>
        </div>
      <Link to={`/menu/${item._id}`}>
        <figure>
          <img
            src={item.image}
            alt="Shoes"
            className="md:h-72 hover:rotate-[60deg] transition-all duration-500"
          />
        </figure>
      </Link>
      <div className="card-body">
        <Link to={`/menu/${item._id}`}><h2 className="card-title ">{item.name}</h2></Link>
        <p>{item.recipe}</p>
        <div className="card-actions justify-between items-center mt-2">
          <h5 className="font-semibold">
            <span className="text-sm text-red">$</span>
            {item.price}
          </h5>
          <button className="btn bg-green text-white">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
