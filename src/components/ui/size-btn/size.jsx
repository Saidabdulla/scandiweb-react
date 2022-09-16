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
        className={this.props.big ? styles.big : styles.little}
      >
        {this.props.text}
      </div>
    );
  }
}

export default Size;
