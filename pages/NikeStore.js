import React, { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import Loader from "react-loader-spinner";
import Footer from "../Components/Footer.js";
import "tailwindcss/tailwind.css";

const NikeStore = () => {
  const [searchLists, setSearchLists] = useState();
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState([]);
  const [filterList, setFilterList] = useState([
    {
      name: "Lifestyle",
      value: "Lifestyle",
      alt: "xyz",
    },
    {
      name: "Athletics",
      value: "Athletics",
      alt: "yzx",
    },
    {
      name: "Basketball",
      value: "Basketball",
      alt: "zxy",
    },
  ]);

  useEffect = () => {
    filteringShoeCategoryFunction();
  };

  onFilterChange = (filter) => {
    // const { filterList, activeFilter } = this.state;
    if (filter === "ALL") {
      if (activeFilter.length === filterList.length) {
        // this.setState({ activeFilter: [] });
        setActiveFilter([]);
      } else {
        setActiveFilter(filterList.map((filter) => filter.value));
      }
    } else {
      if (activeFilter.includes(filter)) {
        const filterIndex = activeFilter.indexOf(filter);
        const newFilter = [...activeFilter];
        newFilter.splice(filterIndex, 1);
        setActiveFilter(newFilter);
      } else {
        setLoading(false);
        setActiveFilter([...activeFilter, filter]);
      }
    }
  };

  // filteringShoeCategoryFunction = () => {
  //   let allShoeCategories = searchLists.filter(
  //     (shoeCategorySelected) => {
  //       if (shoeCategorySelected.style === "Lifestyle") {
  //         // if (shoeCategorySelected.style.includes('Lifestyle')) {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     }
  //   );
  //   setLoading(false)

  //   // this.setState({
  //   //   selectedStyleCategory: allShoeCategories,
  //   // });
  // };

  // console.log(this.state.filterList)
  // console.log(this.state.selectedStyleCategory)

  if (loading) {
    return (
      <div className="loadScreen">
        <Loader type="Puff" color="purple" height={100} width={100} />
      </div>
    );
  }

  // const { filterList, activeFilter } = this.state;
  let filteredList;
  if (activeFilter.length === 0 || activeFilter.length === filterList.length) {
    setFilteredList(searchLists);
  } else {
    filteredList = searchLists.filter((item) =>
      activeFilter.includes(item.style)
    );
  }

  return (
    <main>
      <h1 className="text-4xl font-medium">
        Men's Trainers & Shoes ({Object.keys(searchLists).length})
      </h1>
      {/* Make this element sticky? */}
      <section className="flex">
        <form className="h-screen">
          <ProSidebar>
            <Menu>
              <SubMenu title="Type">
                <MenuItem icon="*">Dashboard</MenuItem>
                {/* <MenuItem icon={<FaGem />}>Dashboard</MenuItem> */}
                <MenuItem>
                  <label htmlFor="myInput">All Styles </label>
                  <input
                    alt="myInput"
                    type="checkbox"
                    onClick={() => this.onFilterChange("ALL")}
                    checked={activeFilter.length === filterList.length}
                  />
                </MenuItem>
                {filterList.map((filter) => (
                  <React.Fragment>
                    <MenuItem>
                      <label htmlFor={filter.alt}> {filter.name}</label>
                      <input
                        id={filter.alt}
                        type="checkbox"
                        checked={activeFilter.includes(filter.value)}
                        onClick={() => this.onFilterChange(filter.value)}
                      />
                    </MenuItem>
                  </React.Fragment>
                ))}
              </SubMenu>
              <SubMenu title="Price">
                <MenuItem>
                  $0 - $99 <input type="checkbox" />
                </MenuItem>
                <MenuItem>
                  $100 - $199 <input type="checkbox" />
                </MenuItem>
                <MenuItem>
                  $200 - $299 <input type="checkbox" />
                </MenuItem>
                <MenuItem>
                  $300 - $399 <input type="checkbox" />
                </MenuItem>
              </SubMenu>
            </Menu>
          </ProSidebar>
        </form>

        <ul className="flex flex-wrap">
          {filteredList.map((item) => (
            <li
              className="w-full lg:w-6/12 xl:w-4/12 w-full px-2"
              key={item.alt}
            >
              <div className="flex flex-col">
                <div className="w-full">
                  <img src={item.image} alt={item.Alt} />
                </div>
                <div className="flex shoeInfoContainer">
                  <div className="py-4">
                    <h4>{item.name}</h4>
                  </div>
                  <div className="pb-2">
                    <p>{item.style}</p>
                  </div>
                  <div className="">
                    <p>{item.color}</p>
                  </div>
                  <div className="py-4">
                    <h4>{item.price}</h4>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <Footer />
    </main>
  );
};

export default NikeStore;
