import React, { Component } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import Loader from "react-loader-spinner";
import Footer from "../Components/Footer.js";
import "tailwindcss/tailwind.css";

class NikeStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // allShoeInfoArray: this.props.nikeStoreProp,
      searchLists: this.props.nikeStoreProp,
      loading: true,
      filterList: [
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
      ],
      activeFilter: [],
    };
  }

  componentDidMount() {
    this.filteringShoeCategoryFunction();
    // this.onFilterChange();
  }

  // filterNikeStoreProp() {
  //     let ShoeInfoArray = this.props.nikeStoreProp.map((singleShoe) => {
  //         const returnedShoesInfo = {
  //             Name: singleShoe.name,
  //             Style: singleShoe.style,
  //             Price: singleShoe.price,
  //             Color: singleShoe.color,
  //             Image: singleShoe.image,
  //             Alt: singleShoe.alt
  //             };
  //         return returnedShoesInfo
  //     });
  //     this.setState({
  //         allShoeInfoArray: ShoeInfoArray,
  //         loading: false,
  //     });
  //     this.filteringShoeCategoryFunction();
  // };

  // // --- TEST --- //
  //     onBarClick = (obj) => {
  // console.log(obj)
  // let province = obj.activePayload[0].payload;
  // console.log(province)
  // const provinceCount = province.Cases
  // console.log(provinceCount)
  // };
  // // --- TEST OVER --- //

  onFilterChange(filter) {
    const { filterList, activeFilter } = this.state;
    if (filter === "ALL") {
      if (activeFilter.length === filterList.length) {
        this.setState({ activeFilter: [] });
      } else {
        this.setState({
          activeFilter: filterList.map((filter) => filter.value),
        });
      }
    } else {
      if (activeFilter.includes(filter)) {
        const filterIndex = activeFilter.indexOf(filter);
        const newFilter = [...activeFilter];
        newFilter.splice(filterIndex, 1);
        this.setState({ activeFilter: newFilter });
      } else {
        this.setState({ activeFilter: [...activeFilter, filter] });
      }
    }
  }

  filteringShoeCategoryFunction() {
    let allShoeCategories = this.state.searchLists.filter(
      (shoeCategorySelected) => {
        if (shoeCategorySelected.style === "Lifestyle") {
          // if (shoeCategorySelected.style.includes('Lifestyle')) {
          return true;
        } else {
          return false;
        }
      }
    );
    this.setState({
      selectedStyleCategory: allShoeCategories,
      loading: false,
    });
  }

  render() {
    // console.log(this.state.filterList)
    // console.log(this.state.selectedStyleCategory)

    if (this.state.loading) {
      return (
        <div className="loadScreen">
          <Loader type="Puff" color="purple" height={100} width={100} />
        </div>
      );
    }

    const { filterList, activeFilter } = this.state;
    let filteredList;
    if (
      activeFilter.length === 0 ||
      activeFilter.length === filterList.length
    ) {
      filteredList = this.state.searchLists;
    } else {
      filteredList = this.state.searchLists.filter((item) =>
        this.state.activeFilter.includes(item.style)
      );
    }

    return (
      <div>
        <h1 className="text-4xl font-medium">
          Men's Trainers & Shoes ({Object.keys(this.state.searchLists).length})
        </h1>
        <section className="flex">
          {/* Make this element sticky? */}
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
                  {this.state.filterList.map((filter) => (
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
              <li className="w-4/12 px-2" key={item.alt}>
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

          {/* {
                        this.state.searchLists.map( (singleShoeObject, index) => {
                                return (
                                    <ul key={index}>
                                        <li className="flexContent shoeContainer">
                                            <div className="shoeImageContainer">
                                                <img src={singleShoeObject.image} alt={singleShoeObject.Alt} />
                                            </div>
                                            <div className="flexContent shoeInfoContainer">
                                                <div className="shoeInfoText"><h4>{singleShoeObject.name}</h4></div>
                                                <div className="shoeInfoText"><p>{singleShoeObject.style}</p></div>
                                                <div className="shoeInfoText"><p>{singleShoeObject.price}</p></div>
                                                <div className="shoeInfoText"><h4>{singleShoeObject.color}</h4></div>
                                            </div>
                                        </li>
                                    </ul>
                                )
                        })
                    }  */}

          {/* {
                        this.state.selectedStyleCategory.map( (singleShoeObject, index) => {
                                return (
                                    <ul key={index}>
                                        <li className="flexContent shoeContainer">
                                            <div className="shoeImageContainer">
                                                <img src={singleShoeObject.image} alt={singleShoeObject.Alt} />
                                            </div>
                                            <div className="flexContent shoeInfoContainer">
                                                <div className="shoeInfoText"><h4>{singleShoeObject.name}</h4></div>
                                                <div className="shoeInfoText"><p>{singleShoeObject.style}</p></div>
                                                <div className="shoeInfoText"><p>{singleShoeObject.price}</p></div>
                                                <div className="shoeInfoText"><h4>{singleShoeObject.color}</h4></div>
                                            </div>
                                        </li>
                                    </ul>
                                )
                        })
                    }  */}
        </section>
        <Footer />
      </div>
    );
  }
}

export default NikeStore;
