import React, { useState, useEffect } from "react";
import shoeFirebaseCollection from "./api/firebase.js";
import Homepage from "./Homepage.js";
import NikeStore from "./NikeStore.js";
import Footer from "../Components/Footer.js";
import "../styles/sass/app.scss";

const App = () => {
  const [displayHomePage, setDisplayHomePage] = useState(true);
  const [displayNikeStore, setDisplayNikeStore] = useState(false);
  const [nikeShoes, setNikeShoes] = useState([]);

  // The following event listener listens to my database for any change and pushes each object from my database into my plants array in the state, which allows me to utilize said data and loop through it.

  useEffect(() => {
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
        setNikeShoes(nikeShoesFireStoreData);
      });
    });
  }, []);

  {
    console.log(nikeShoes);
  }

  const displayHomepageComponent = () => {
    setDisplayHomePage(true);
    setDisplayNikeStore(false);
  };

  const displayNikeStoreComponent = () => {
    setDisplayHomePage(false);
    setDisplayNikeStore(true);
  };

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
            onClick={displayHomepageComponent}
          ></img>
        </div>
        <div className="categoryMenu">
          <ul>
            <li onClick={displayHomepageComponent}>Clothes</li>
            <li onClick={displayNikeStoreComponent}>Shoes</li>
          </ul>
        </div>
        <nav className="topNav">
          <ul>
            <li onClick={displayNikeStoreComponent}>Shoes</li>
            <li onClick={displayNikeStoreComponent}>Trending</li>
            <li onClick={displayNikeStoreComponent}>News</li>
          </ul>
        </nav>
      </header>
      <div className="navBottom">
        <div>hello</div>
      </div>
      <main className="wrapper">
        {displayHomePage ? <Homepage nikeShoes={nikeShoes} /> : null}
        {displayNikeStore ? <NikeStore nikeShoes={nikeShoes} /> : null}
      </main>
      {/* {displayHomepage ? null : <Footer />} */}
    </React.Fragment>
  );
};

export default App;
