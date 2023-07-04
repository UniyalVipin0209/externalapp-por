import React from "react";
import logo from "../../logo.svg";

const Header = () => {
  return (
    <header className="kpmg-header fixed-top">
      <section style={{ float: "left" }}>
        <span>
          <img
            src={logo}
            alt="KPMG"
            style={{ width: "120px", height: "40px" }}
          />
        </span>
      </section>
      <section className="header-content">
        <span>External Interface -KPMG</span>
      </section>
    </header>
  );
};

export default Header;
