import React, { useEffect, useState } from "react";
import Cards from "../../components/Cards";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [filteredItem, setFilteredItem] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");

  useEffect(() => {
    //fetching data from backend server
    const fetchData = async () => {
      try {
        const response = await fetch("/menu.json");
        const data = await response.json();
        // console.log(data);
        setMenu(data);
        setFilteredItem(data);
      } catch (err) {
        console.log("Error fetching data from backend server", err);
      }
    };

    //call the function
    fetchData();
  }, []);

  //filtering data based on categories
  const FilteredItem = (category) => {
    const Filtered = (category = "all"
      ? menu
      : menu.filter((item) => item.category === category));

    setFilteredItem(Filtered);
    setSelectedCategory(category);
  };

  //   show all data
  const showaAll = () => {
    setFilteredItem(menu);
    setSelectedCategory("all");
  };

  //sorting based om A-Z, Z-A, Low-High pricing
  const handleSortChange = (option) => {
    setSortOption(option);

    let sortedItems = [...filteredItem];

    //logic
    switch (option) {
      case "A-Z":
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        sortedItems.sort((a, b) => b.name.localeCompare(a.name));

        break;
      case "low-to-high":
        sortedItems.sort((a, b) => a.price.localeCompare(b.name));
        break;
      case "high-to-low":
        sortedItems.sort((a, b) => b.price.localeCompare(a.name));
        break;
      default:
        //code break
        break;
    }

    setFilteredItem(sortedItems);
  };

  return (
    <div>
      {/* menu  */}
      <div className="max-w-screen-2xl container mx-auto xl:px-24 ">
        <div className="py-48 flex flex-col justify-center items-center gap-8">
          <div className="px-4 space-y-7 text-center">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              For the Love of Delicious <span className="text-green">Food</span>
            </h2>
            <p className="text-xl text-[#4A4A4A]">
              Where Each Plate Weaves a Story of Culinary <br />
              Mastery and Passionate Craftsmanship
            </p>
            <button className="btn bg-green px-8 py-3 font-semibold text-white rounded-full shadow-lg">
              Order Now
            </button>
          </div>
        </div>
      </div>

      {/* menu shop categories  */}
      <div className="section-container">
        {/* filtering and sorting  */}

        <div>filtering and sorting</div>
        {/* products card */}
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
            {
                filteredItem.map((item) =>(
                    <Cards key={item._id} item={item}/>
                ))
            }
        </div>
      </div>
    </div>
  );
};

export default Menu;
