import React from "react";

const Footer = () => {
  return (
    <footer className="kpmg-footer bottom-position">
      <section>
        <span style={{ fontStyle: "bold" }}>
          © {new Date().getFullYear()} All rights reserved @ KPMG
        </span>
      </section>
    </footer>
  );
};

export default Footer;
