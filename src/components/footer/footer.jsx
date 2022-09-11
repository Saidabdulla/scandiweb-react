import React, { Component } from "react";
import styles from "./footer.module.css";

class Footer extends Component {
  render() {
    return (
      <footer className={styles.footer}>
        Made by{" "}
        <a
          href="https://github.com/Saidabdulla"
          target="_blank"
          rel="noreferrer"
        >
          Saidbek Masharipov
        </a>
        &copy; {new Date().getFullYear()}
      </footer>
    );
  }
}

export default Footer;
