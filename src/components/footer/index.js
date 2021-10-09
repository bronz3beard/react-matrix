import React from "react";
import "./footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <div>
          <div>
            <div>
              <p
                style={{
                  textAlign: "center",
                  margin: `${1}rem ${0} ${1}rem ${0}`,
                }}
              >
                Copyright &copy; 2021 All Rights Reserved by
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.eg-web-design.com/"
                  style={{ textDecoration: "none" }}
                >
                  <span className="copyRight"> Exempli.Gratia. web design</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
