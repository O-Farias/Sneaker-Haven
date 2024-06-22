import React from "react";
import {
  FaReact,
  FaBootstrap,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import "../index.css";

const Footer = () => {
  return (
    <footer className="bg-light text-lg-start">
      <div className="container p-4">
        <div className="row">
          <div className="col text-start">
            <a
              href="https://www.instagram.com/_fariasm/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram
                className="social-icon"
                style={{ color: "#E4405F" }}
              />
            </a>
            <a
              href="https://www.linkedin.com/in/mateus-farias-b6ab77247/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin
                className="social-icon"
                style={{ color: "#0A66C2" }}
              />
            </a>
            <a
              href="https://github.com/O-Farias"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="social-icon" style={{ color: "#171515" }} />
            </a>
          </div>
          <div className="col-6 text-center">
            &copy; Sneaker haven 2024, todos os direitos reservados.
          </div>
          <div className="col text-end">
            Feito com <FaReact style={{ fontSize: "24px" }} /> e{" "}
            <FaBootstrap style={{ fontSize: "24px" }} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
