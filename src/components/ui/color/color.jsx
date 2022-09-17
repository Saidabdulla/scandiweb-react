import React, { Component } from "react";
import styles from "./color.module.css";

class Color extends Component {
  render() {
    return (
      <div
        style={
          this.props.active
            ? { margin: "1px", border: "1px solid #5ECE7B" }
            : null
        }
        className={this.props.active ? styles.active : null}
      >
        <div
          style={
            this.props.color === "#FFFFFF"
              ? { backgroundColor: "#ededed" }
              : { backgroundColor: this.props.color }
          }
          className={this.props.big ? styles.big : styles.little}
        ></div>
      </div>
    );
  }
}

export default Color;
