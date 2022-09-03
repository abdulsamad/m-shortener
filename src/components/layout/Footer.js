import React from "react";
import { Footer as Foot, Icon } from "react-materialize";

function Footer() {
  return (
    <Foot className="footer z-depth-2" copyrights="&copy; 2020">
      <h5 className="white-text">
        URL Shortner v{process.env.REACT_APP_VERSION}
      </h5>
      <p className="grey-text text-lighten-4 valign-wrapper">
        Made with &nbsp; <Icon className="red-text">favorite</Icon>
        &nbsp; by &nbsp;
        {process.env.REACT_APP_AUTHOR}
      </p>
    </Foot>
  );
}

export default Footer;
