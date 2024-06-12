import React, { useContext, useState } from "react";
import useCart from "../../hooks/useCart";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthProvider";


const CartPage = () => {
  const [cart, refetch] = useCart();
  const {user} = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);

  const calculatorPrice = (item) => {
    return item.price * item.quantity;
  }
  
  const handleIncrease = (item) =>{
    // console.log(item._id)
    fetch(`http://localhost:5000/carts/${item._id}`,{
      method:"PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({quantity: item.quantity + 1})
    }).then((res) =>res.json()).then((data) =>{
      const updatedCart = cartItems.map((cartItem)=>{
        if(cartItem._id === item.id){
          return {
            ...cartItem,
            quantity: cartItem.quantity + 1,
          }
        }
        return cartItem;
      })
      setCartItems(updatedCart)
      refetch();
    })
  }

  const handleDecrease = (item) =>{
    // console.log(item._id)
    if(item.quantity > 1) {
      fetch(`http://localhost:5000/carts/${item._id}`,{
        method:"PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({quantity: item.quantity - 1})
      }).then((res) =>res.json()).then((data) =>{
        const updatedCart = cartItems.map((cartItem)=>{
          if(cartItem._id === item.id){
            return {
              ...cartItem,
              quantity: cartItem.quantity - 1,
            }
          }
          return cartItem;
        })
        setCartItems(updatedCart)
        refetch();
      })
    }else{
      alert("Item can't be Zero")
    }
  }

  const handleDelete = item =>{
    Swal.fire({
      title: "Are you Sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        refetch();
        fetch(`http://localhost:5000/carts/${item._id}`,{
          method: 'DELETE',
        }).then((res) =>res.json()).then(data=>{
          if (data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          }
        })
      }
    });
  }

  const cartSubTotal = cart.reduce((total, item)=> {
    return total + calculatorPrice(item)
  }, 0)

  const orderTotal = cartSubTotal;

  return (
    <div className="section-container">
      {/* banner  */}
      <div className="bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
        <div className="py-36 flex flex-col justify-center items-center gap-8">
          <div className=" space-y-7 px-4">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Items Added to the <span className="text-green">Food</span>
            </h2>
          </div>
        </div>
      </div>

      {/* tables for add to cart  */}
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="bg-green text-white rounded-sm">
              <tr>
                <th>#</th>
                <th>Food</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Price</th> 
                <th>Action</th> 
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {
                cart.map((item, i)=>(
                  <tr key={i} >
                    <td>{i+1}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={item.image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="font-medium">
                      {item.name}
                    </td>
                    <td>
                      <button className="btn btn-xs" onClick={() => handleDecrease(item)}>-</button>
                      <input type="number" value={item.quantity} onChange={()=>console.log(item.quantity)} className="w-10 mx-2 text-center overflow-hidden appearance-none"/>
                      <button className="btn btn-xs" onClick={()=>handleIncrease(item)}>+</button>
                    </td>
                    <td>${calculatorPrice(item).toFixed(2)}</td>
                    <td>
                      <button className="btn btn-ghost text-red btn-xs" onClick={()=> handleDelete(item)}><FaTrash/></button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>

      {/* customer detials  */}
      <div className="my-12 flex flex-col md:flex-row justify-between items-center">
        <div className="md:w-1/2 space-y-3">
          <h3 className="font-medium">Customer Details</h3>
          <p>Name: {user?.name}</p>
          <p>Email: {user?.email}</p>
          <p>User_id: {user?.uid}</p>
        </div>
        <div className="md:w-1/2 space-y-3">
        <h3 className="font-medium">Shopping Details</h3>
              <p>Total Items: {cart.length}</p>
              <p>Total Price: ${orderTotal.toFixed(2)}</p>
              <button className="btn bg-green text-white">Proceed Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
