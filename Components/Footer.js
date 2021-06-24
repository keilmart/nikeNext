import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <React.Fragment>
        <footer>
          <div className="footerContainer wrapper">
            <div className="footerTextContainer">
              {/* <div className="footerLogoContainer">
                                <img src={logo} alt=""></img>
                            </div> */}
              <div className="footerText">
                <h3>NIKE 2021 -Links to page go here-</h3>
              </div>
            </div>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}

export default Footer;
