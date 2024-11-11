import React from "react";
import { footerData } from "./data";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  // const t = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer>
      <div className="pb-4">
        <div className="container-fluid">
          <div className="row g-1">
            <div className="col-12 col-sm-6 text-center text-sm-start">
              <p>
                &copy; {currentYear} {footerData.name},{" "}
                {footerData.copyWriteText}
              </p>
            </div>

            <div className="col-12 col-sm-6 text-center text-sm-end">
              <a className="scrolltotop sm-heading link-hover" href="#">
                Back to Top
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
