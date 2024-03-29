import React, { useState, useRef } from "react";
import M from "materialize-css";
import {
  Button,
  CardPanel,
  Col,
  Icon,
  Row,
  Preloader,
} from "react-materialize";
import Copy from "../utils/Copy";
import axios from "axios";
import localForage from "localforage";

function Form() {
  const [shortenURL, setShortenURL] = useState("");
  const [titleFetched, setTitleFetched] = useState(null);
  const urlInput = useRef();
  const submitRef = useRef();

  const storeUrl = (url, shorturl, stats) => {
    const key = "linksCollection";
    const objStr = {
      url,
      shorturl,
      stats,
      id: shorturl.replace("https://is.gd/", ""),
      timestamp: Date.now(),
    };

    localForage
      .getItem(key)
      .then((res) => {
        // Add title to the link optional
        getTitle(url)
          .then((title) => {
            res
              ? localForage.setItem(key, [{ ...objStr, title }, ...res])
              : localForage.setItem(key, [{ ...objStr, title }]);

            setTitleFetched(true);
          })
          .catch(() => {
            res
              ? localForage.setItem(key, [objStr, ...res])
              : localForage.setItem(key, [objStr]);

            setTitleFetched(false);
          });
      })
      .catch((err) => {
        M.toast({
          html: `<i class='material-icons red-text'>error</i> &nbsp; ${err.message}`,
          classes: "error-toast",
        });
      });
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    setTitleFetched(null);

    const url = new URL(ev.target.elements.url.value);
    const stats = ev.target.elements.stats.checked;
    const isgdAPI = stats
      ? `https://is.gd/create.php?format=json&url=${url}&logstats=1`
      : `https://is.gd/create.php?format=json&url=${url}`;

    axios
      .get(isgdAPI, { timeout: 5000 })
      .then((res) => {
        const { shorturl } = res.data;

        setShortenURL(shorturl);
        storeUrl(url.href, shorturl, stats);
      })
      .catch((err) => {
        M.toast({
          html: `<i class='material-icons red-text'>error</i> &nbsp; ${err.message}`,
          classes: "error-toast",
        });
      });

    ev.target.elements.url.value = "";
  };

  const getTitle = (url) => {
    return axios
      .get(
        `https://api.linkpreview.net?key=${process.env.REACT_APP_LINK_PREVIEW_API_KEY}&q=${url}`,
        {
          timeout: 5000,
        }
      )
      .then(({ data: { title, description, image } }) => title);
  };

  const shareShortLink = () => {
    const shareData = {
      title: `Created with ${document.title}`,
      text: "Check this out!",
      url: shortenURL,
    };
    navigator.share(shareData);
  };

  const pasteLongURL = async () => {
    try {
      const text = await navigator.clipboard.readText();
      urlInput.current.value = text;
      urlInput.current.blur();
    } catch (err) {
      M.toast({
        html: `<i class='material-icons red-text'>error</i> &nbsp; Clipboard permission not granted.`,
        classes: "error-toast",
      });
    }
  };

  const onEnterKeyPress = (ev) => {
    const code = ev.keyCode ? ev.keyCode : ev.which;

    if (code === 13) {
      ev.preventDefault();
      submitRef.current.click();
    }
  };

  return (
    <section className="form-container">
      <CardPanel className="z-depth-2">
        <Row>
          <Col s={12}>
            <form onSubmit={onSubmit} className="form">
              <div className="input-field">
                <label className="active" htmlFor="url">
                  Enter a Long URL
                </label>
                <input
                  type="url"
                  name="url"
                  ref={urlInput}
                  placeholder="https://mylongurl.com/"
                  className="validate url"
                  onKeyDown={onEnterKeyPress}
                  required
                />
                <Button
                  className="paste-button hide"
                  waves="light"
                  style={{ padding: "0" }}
                  onClick={pasteLongURL}
                  flat
                >
                  <Icon>content_paste</Icon>
                </Button>
              </div>
              <Row>
                <Col s={12}>
                  <div className="switch">
                    <label>
                      <span>Show Stats</span>
                      <input type="checkbox" name="stats" />
                      <span className="lever"></span>
                    </label>
                  </div>
                </Col>
              </Row>
              <Button
                node="button"
                type="submit"
                style={{ marginRight: "5px" }}
                waves="light"
              >
                <Icon left>content_cut</Icon>
                <span ref={submitRef}>Shorten It</span>
              </Button>
            </form>
            {shortenURL && (
              <div>
                <div className="input-field">
                  <input
                    type="url"
                    className="shorten-url"
                    value={shortenURL}
                    disabled
                  />
                  <Button
                    flat
                    aria-hidden="true"
                    className="shorturl-title-preload"
                    style={{ padding: "0" }}
                    waves="light"
                  >
                    {titleFetched === null && (
                      <Preloader
                        active
                        color="blue"
                        tooltip="Fetching link title"
                        tooltipOptions={{ position: "top" }}
                        flashing={false}
                        size="small"
                      />
                    )}
                    {titleFetched === false && (
                      <Icon
                        tooltip="Fetching link title failed"
                        tooltipOptions={{ position: "top" }}
                        className="red-text"
                      >
                        highlight_off
                      </Icon>
                    )}
                    {titleFetched && (
                      <Icon
                        tooltip="Link title fetched"
                        tooltipOptions={{ position: "top" }}
                        className="green-text"
                      >
                        check_circle
                      </Icon>
                    )}
                  </Button>
                </div>
                {navigator.share && (
                  <Button
                    small
                    onClick={shareShortLink}
                    node="button"
                    style={{ marginRight: "5px" }}
                    waves="light"
                  >
                    <Icon left>share</Icon>
                    <span>Share</span>
                  </Button>
                )}
                <Copy
                  copyText={shortenURL}
                  classes="btn btn-small waves-effect waves-light"
                  btnText="Copy"
                  title="Copy ShortURL to Clipboard"
                />
              </div>
            )}
          </Col>
        </Row>
      </CardPanel>
    </section>
  );
}

export default Form;
