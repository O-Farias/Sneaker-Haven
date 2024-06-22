import React from "react";
import {
  FaReact,
  FaBootstrap,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

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
              <FaInstagram style={{ color: "#E4405F", fontSize: "24px" }} />
            </a>
            <a
              href="https://www.linkedin.com/in/mateus-farias-b6ab77247/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin style={{ color: "#0A66C2", fontSize: "24px" }} />
            </a>
            <a
              href="https://github.com/O-Farias"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub style={{ color: "#171515", fontSize: "24px" }} />
            </a>
          </div>
          <div className="col-6 text-center">
            &copy; Sneaker haven 2024, todos os direitos reservados.
          </div>
          <div className="col text-end">
            Feito com <FaReact /> e <FaBootstrap />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
