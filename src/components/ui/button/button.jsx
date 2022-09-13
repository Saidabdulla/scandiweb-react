import React, { Component } from "react";
import styles from "./button.module.css";

class Button extends Component {
  render() {
    return (
      <button
        style={
          this.props.isDisabled
            ? { backgroundColor: "#e0e0e0", cursor: "initial" }
            : null
        }
        disabled={this.props.isDisabled}
        className={styles["add-btn"]}
      >
        ADD TO CARD
      </button>
    );
  }
}

export default Button;
