import React from 'react';

const Items = [
    {
      id: 1,
      title: "Catering",
      des: "Delight your guests with our flavors and  presentation",
      img:"/images/home/services/icon1.png"
    },
    {
      id: 2,
      title: "Fast delivery",
      des: "We deliver your order promptly to your door",
      img:"/images/home/services/icon2.png"
    },
    {
      id: 3,
      title: "Online Ordering",
      des: "Explore menu & order with ease using our Online Ordering ",
      img:"/images/home/services/icon3.png"
    },
    {
      id: 4,
      title: "Gift Cards",
      des: "Give the gift of exceptional dining with Foodi Gift Cards",
      img:"/images/home/services/icon4.png"
    },
]

const OurServices = () => {
    return (
        <div className='section-container'>
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                 {/* //text  */}
        <div className="md:w-1/2">
          <div className="text-left">
            <p className="subtitle">Our Story & Services</p>
            <h2 className="title">Our Culinary Journey And Services</h2>
            <p className="my-5 text-secondary leading-[30px]">
            Rooted in passion, we curate unforgettable dining experiences and offer exceptional services, blending culinary artistry with warm hospitality.
            </p>
            <button className='btn bg-green rounded-full py-2 px-8'>Contact</button>
          </div>
        </div>
        <div className="md:w-1/2">
            <div className='grid sm:grid-cols-2 grid-cols-1 gap-8 items-center'>
            {
            Items.map((item, i)=>(
                (
                    <div
                      key={i}
                      className="shadow-lg rounded-md bg-white py-6 px-5 w-56 max-auto text-center cursor-pointer hover:-translate-y-4 duration-300 transition-all"
                    >
                         <div className="flex w-full mx-auto items-center justify-center">
              <img
                src={item.img}
                alt=""
                className="bg-[#C1F1C6] p-5 rounded-full w-28 h-28"
              />
            </div>
                      <div className="mt-5 space-y-1">
                        <h5 className='text-green'>{item.title}</h5>
                        <p>{item.des}</p>
                      </div>
                    </div>
                  )
            ))
         }
            </div>
         
        </div>
      </div>
        </div>
    );
};

export default OurServices;