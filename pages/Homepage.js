import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "tailwindcss/tailwind.css";

const Homepage = (props) => {
  const { nikeShoes } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  useEffect(async () => {
    setIsLoading(true);
    const response = await axios.get(
      "https://newsapi.org/v2/everything?q=nike&pageSize=8&apiKey=db0bf3c8ac4842a0a4d506a38bea9735"
    );
    setArticles(response.data.articles);
    setIsLoading(false);
  }, []);

  console.log(nikeShoes);
  return (
    <React.Fragment>
      <main className="wrapper flexContent homepageContainer">
        <section className="carouselContainer">
          <Carousel
            autoPlay={true}
            infiniteLoop={true}
            showArrows={false}
            showStatus={false}
            showIndicators={false}
            showThumbs={false}
            interval={4000}
            swipeable={false}
            stopOnHover={false}
            dynamicHeight={false}
          >
            <div>
              <img src="./nikeSplashOne.jpg" />
              {/* <p className="legend">new nike running shoe</p> */}
            </div>
            <div>
              <img src="./nikeSplashTwo.jpg" />
              {/* <p className="legend">the new air jordan shoe</p> */}
            </div>
            <div>
              <img src="./nikeSplashThree.jpg" />
              {/* <p className="legend">fresh new looks in time for spring</p> */}
            </div>
          </Carousel>
        </section>

        {/* call in more than 2 items, make a carousel to flip between */}
        <h1>Trending Now</h1>
        <section className="flexContent nikeStoreContainer">
          {nikeShoes.slice(10, 14).map((singleShoe, index) => {
            return (
              <div key={index} className="flexContent shoeContainerNews">
                <div className="shoeImageContainer">
                  <img src={singleShoe.image} alt={singleShoe.alt} />
                </div>
                <div className="flexContent shoeInfoContainer">
                  <div className="shoeInfoText">
                    <h4>{singleShoe.name}</h4>
                  </div>
                  <div className="shoeInfoText">
                    <p>{singleShoe.style}</p>
                  </div>
                  <div className="shoeInfoText">
                    <p>{singleShoe.price}</p>
                  </div>
                  <div className="shoeInfoText">
                    <h4>{singleShoe.color}</h4>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        <section className="flexContent homepageContainer">
          <div className="carouselContainer hero">
            <img className="hero" src="./nikeShowHero.jpg" />
          </div>
        </section>

        <section className="flexContent">
          {/* <section className="flexContent newsWrapper"> */}
          <div className="newsHeader">
            <h1>Nike News</h1>
            <p>Your source for the latest NIKE, Inc. stories</p>
          </div>
          {articles.map((articleInfo, index) => {
            return (
              <a
                key={index}
                className="flexContent articleContainer"
                href={articleInfo.url}
                target="_blank"
                rel="noreferrer"
              >
                <div className="flexContent articleImageContainer">
                  <img src={articleInfo.urlToImage} alt={articleInfo.title} />
                </div>
                <div className="articleInfoContainer">
                  <h2>{articleInfo.title}</h2>
                  <p>{articleInfo.description}</p>
                </div>
              </a>
            );
          })}
          {/* <button className="searchForAPlant" onClick={this.sendDataToParent}>Shop</button> */}
        </section>
      </main>
    </React.Fragment>
  );
};

export default Homepage;
