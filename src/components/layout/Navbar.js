import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Icon, Navbar as Nav, NavItem, Switch } from "react-materialize";

function Navbar({ title }) {
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      setDarkTheme(true);
    }
  }, []);

  return (
    <header>
      <Nav
        alignLinks="right"
        brand={<a href={document.domain}>{title}</a>}
        menuIcon={<Icon>menu</Icon>}
        options={{
          draggable: true,
          edge: "left",
          inDuration: 250,
          onCloseEnd: null,
          onCloseStart: null,
          onOpenEnd: null,
          onOpenStart: null,
          outDuration: 200,
          preventScrolling: true,
        }}
        centerChildren
      >
        <NavItem>
          <Switch
            id="theme-switch"
            checked={darkTheme}
            offLabel={
              <Icon className="yellow-text" left>
                wb_sunny
              </Icon>
            }
            onChange={(ev) => {
              if (ev.target.checked) {
                setDarkTheme(true);
                document.body.classList.replace("light", "dark");
                localStorage.setItem("theme", "dark");
              } else {
                setDarkTheme(false);
                document.body.classList.replace("dark", "light");
                localStorage.setItem("theme", "light");
              }
            }}
            onLabel={
              <Icon className="yellow-text text-lighten-4" right>
                brightness_6
              </Icon>
            }
          />
        </NavItem>
      </Nav>
    </header>
  );
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Navbar;
