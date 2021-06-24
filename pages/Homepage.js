import React, { Component } from "react";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "tailwindcss/tailwind.css";

class Homepage extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      isLoading: true,
      // errors: null
    };
  }

  componentDidMount() {
    this.getArticles();
  }

  // sendDataToParent = () => {
  //     this.props.searchShoesProp();
  // }

  async getArticles() {
    await axios
      .get(
        "https://newsapi.org/v2/everything?q=nike&pageSize=8&apiKey=db0bf3c8ac4842a0a4d506a38bea9735"
      )
      .then((response) =>
        response.data.articles.map((article) => ({
          date: `${article.publishedAt}`,
          author: `${article.author}`,
          title: `${article.title}`,
          url: `${article.url}`,
          description: `${article.description}`,
          image: `${article.urlToImage}`,
        }))
      )

      .then((articles) => {
        this.setState({
          articles,
          isLoading: false,
        });
      })

      .catch((error) => this.setState({ error, isLoading: false }));
  }

  render() {
    // console.log(this.state.articles)
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

          <h1>Trending Now</h1>

          <section className="flexContent nikeStoreContainer">
            {this.props.nikeStoreProp.slice(10, 12).map((singleShoe, index) => {
              return (
                <div key={index} className="flexContent shoeContainerNews">
                  {/* <div key={index} className="flexContent shoeContainerNews" href={LINK TO SHOE PAGE HERE, OR UNIQUE SHOE IF POSSIBLE} target="_blank"rel="noreferrer"></div> */}
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
              // }
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
            {this.state.articles.map((articleInfo, index) => {
              return (
                <a
                  key={index}
                  className="flexContent articleContainer"
                  href={articleInfo.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="flexContent articleImageContainer">
                    <img src={articleInfo.image} alt={articleInfo.title} />
                  </div>
                  <div className="articleInfoContainer">
                    <h2>{articleInfo.title}</h2>
                    {/* <h2>{articleInfo.author}</h2> */}
                    {/* <h4>{articleInfo.date}</h4> */}
                    {/* <a href={articleInfo.url} target="_blank" rel="noreferrer"><h4>Link Here</h4></a> */}
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
  }
}

export default Homepage;
