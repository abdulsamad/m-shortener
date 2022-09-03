import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Icon } from "react-materialize";
import M from "materialize-css";

function Copy({ copyText, classes, btnText, title }) {
  const copyShortLink = (text) => {
    const textarea = document.createElement("textarea");
    M.Toast.dismissAll();
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);

    M.toast({
      html: `<i class='material-icons green-text'>check_circle</i> &nbsp; Link Copied`,
      classes: "copy-toast",
    });
  };

  return (
    <Fragment>
      <a
        href="#!"
        className={classes}
        onClick={() => copyShortLink(copyText)}
        title={title}
      >
        <Icon left>content_copy</Icon> {btnText}
      </a>
    </Fragment>
  );
}

Copy.propTypes = {
  copyText: PropTypes.string.isRequired,
  classes: PropTypes.string.isRequired,
  btnText: PropTypes.string,
  title: PropTypes.string.isRequired,
};

Copy.defaultProps = {
  btnText: "Copy",
};

export default Copy;
