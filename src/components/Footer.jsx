import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-center py-4 text-sm text-gray-600 dark:text-gray-300">
      <div className="flex justify-center gap-6 mb-2 text-xl">
        <a href="https://github.com/DaudElmoge" target="_blank" rel="noreferrer">
          <FaGithub className="hover:text-green-600" />
        </a>
        <a href="https://www.linkedin.com/in/daud-abdiwahab-13703622a/" target="_blank" rel="noreferrer">
          <FaLinkedin className="hover:text-blue-700" />
        </a>
        <a href="mailto:daudwahab1320@gmail.com">
          <FaEnvelope className="hover:text-red-500" />
        </a>
      </div>
      © {new Date().getFullYear()} Akbari Apps · Built with ❤️ in Kenya
    </footer>
  );
}

export default Footer;
