import React, { Component } from "react";
import styles from "./color.module.css";

class Color extends Component {
  render() {
    return (
      <div
        style={
          this.props.active
            ? { padding: "1px", border: "1px solid #5ECE7B" }
            : null
        }
      >
        <div
          style={{ backgroundColor: this.props.color }}
          className={styles.inner}
        ></div>
      </div>
    );
  }
}

export default Color;
