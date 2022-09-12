import React, { Component } from "react";
import styles from "./size.module.css";

class Size extends Component {
  render() {
    return (
      <div
        style={
          this.props.active
            ? { backgroundColor: "black", color: "white" }
            : null
        }
        className={styles["size-card"]}
      >
        {this.props.text}
      </div>
    );
  }
}

export default Size;
