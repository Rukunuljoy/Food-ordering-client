import React, { useEffect, useState } from "react";
import Cards from "../../components/Cards";
import { FaFilter } from "react-icons/fa";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [filteredItem, setFilteredItem] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [ItemsPerPage] = useState(8);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://food-delivery-server-olive.vercel.app/menu"); // Corrected URL
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setMenu(data);
        setFilteredItem(data);
      } catch (err) {
        console.log("Error fetching data from backend server", err);
      }
    };

    fetchData();
  }, []);

  const FilteredItems = (category) => {
    if (category === "all") {
      setFilteredItem(menu);
    } else {
      const filtered = menu.filter((item) => item.category === category);
      setFilteredItem(filtered);
    }
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const showAll = () => {
    setFilteredItem(menu);
    setSelectedCategory("all");
    setCurrentPage(1);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    let sortedItems = [...filteredItem];
    switch (option) {
      case "A-Z":
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "low-to-high":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    setFilteredItem(sortedItems);
    setCurrentPage(1);
  };

  // Pagination logic
  const indexOfLastPage = currentPage * ItemsPerPage;
  const indexOfFirstPage = indexOfLastPage - ItemsPerPage;
  const currentItem = filteredItem.slice(indexOfFirstPage, indexOfLastPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {/* Menu  */}
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

      {/* Menu shop categories */}
      <div className="section-container">
        <div className="flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8">
          {/* Category buttons */}
          <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap">
            <button onClick={showAll} className={selectedCategory === "all" ? "active" : ""}>All</button>
            <button onClick={() => FilteredItems("salad")} className={selectedCategory === "salad" ? "active" : ""}>Salad</button>
            <button onClick={() => FilteredItems("pizza")} className={selectedCategory === "pizza" ? "active" : ""}>Pizza</button>
            <button onClick={() => FilteredItems("soup")} className={selectedCategory === "soup" ? "active" : ""}>Soups</button>
            <button onClick={() => FilteredItems("dessert")} className={selectedCategory === "dessert" ? "active" : ""}>Desserts</button>
            <button onClick={() => FilteredItems("drinks")} className={selectedCategory === "drinks" ? "active" : ""}>Drinks</button>
          </div>

          {/* Sorting options */}
          <div className="flex justify-end mb-4 rounded-r-none">
            <div className="bg-black p-2">
              <FaFilter className="h-4 w-4 text-white" />
            </div>
            <select
              name="sort"
              id="sort"
              onChange={(e) => handleSortChange(e.target.value)}
              value={sortOption}
              className="bg-black text-white px-2 py-1 rounded-sm"
            >
              <option value="default">Default</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
              <option value="low-to-high">Low to High</option>
              <option value="high-to-low">High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Cards */}
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
          {currentItem.map((item) => (
            <Cards key={item._id} item={item} />
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center my-8">
        {Array.from({ length: Math.ceil(filteredItem.length / ItemsPerPage) }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded-full ${currentPage === index + 1 ? "bg-green text-white" : "bg-gray-200"}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Menu;
