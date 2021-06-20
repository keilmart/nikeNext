import React, { Component } from "react";
import shoeFirebaseCollection from "./api/firebase.js";
import Homepage from "./Homepage.js";
import NikeStore from "./NikeStore.js";
// import Footer from "./Components/Footer.jsx";
import "../styles/sass/app.scss";

class App extends Component {
  constructor() {
    super();
    this.state = {
      displayHomepage: true,
      displayNikeStore: false,
      nikeShoes: [],
    };
  }

  displayHomepageComponent = () => {
    this.setState({
      displayNikeStore: false,
      displayHomepage: true,
    });
  };

  displayNikeStoreComponent = () => {
    this.setState({
      displayNikeStore: true,
      displayHomepage: false,
    });
  };

  componentDidMount() {
    // The following event listener listens to my database for any change and pushes each object from my database into my plants array in the state, which allows me to utilize said data and loop through it.

    const shoeDataFromArray = [];
    const nikeShoesFireStoreData = [];

    shoeFirebaseCollection.on("value", (response) => {
      const nikeShoeItem = response.val();

      for (let singleNikeShoe in nikeShoeItem) {
        shoeDataFromArray.push(nikeShoeItem[singleNikeShoe]);
      }

      const multipleNikeShoeObject = shoeDataFromArray[0];

      Object.entries(multipleNikeShoeObject).map(([key, value]) => {
        const innerShoeObject = [key, value];
        const shoe = innerShoeObject[1];

        nikeShoesFireStoreData.push({
          alt: shoe.alt,
          color: shoe.color,
          image: shoe.image,
          name: shoe.name,
          price: shoe.price,
          style: shoe.style,
        });

        this.setState({
          nikeShoes: nikeShoesFireStoreData,
        });
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="navTopper">
          <div>hello</div>
        </div>
        <header className="flexContent wrapper">
          <div className="logoContainer">
            <img
              src="./nikeLogo.svg"
              alt="nike logo"
              onClick={this.displayHomepageComponent}
            ></img>
          </div>
          <div className="categoryMenu">
            <ul>
              <li onClick={this.displayHomepageComponent}>Clothes</li>
              <li onClick={this.displayNikeStoreComponent}>Shoes</li>
            </ul>
          </div>
          <nav className="topNav">
            <ul>
              <li onClick={this.displayNikeStoreComponent}>Shoes</li>
              <li onClick={this.displayNikeStoreComponent}>Trending</li>
              <li onClick={this.displayNikeStoreComponent}>News</li>
            </ul>
          </nav>
        </header>
        <div className="navBottom">
          <div>hello</div>
        </div>
        <main className="wrapper">
          {this.state.displayHomepage ? (
            <Homepage nikeStoreProp={this.state.nikeShoes} />
          ) : null}
          {this.state.displayNikeStore ? (
            <NikeStore nikeStoreProp={this.state.nikeShoes} />
          ) : null}
        </main>
        {/* {this.state.displayHomepage ? null : <Footer />} */}
      </React.Fragment>
    );
  }
}

export default App;
