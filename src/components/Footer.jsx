import React from "react";
import {
  FaReact,
  FaBootstrap,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import "../index.css";

// Componente que renderiza o footer da página
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
            &copy; Sneaker Haven 2024, todos os direitos reservados.
          </div>
          <div className="col text-end">
            Feito com{" "}
            <a
              href="https://react.dev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaReact className="tech-icon" style={{ color: "#61DAFB" }} />
            </a>{" "}
            e{" "}
            <a
              href="https://getbootstrap.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaBootstrap className="tech-icon" style={{ color: "#7952B3" }} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
