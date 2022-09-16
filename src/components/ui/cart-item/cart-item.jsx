import React, { Component } from "react";
import styles from "./cart-item.module.css";

class CartItem extends Component {
  render() {
    return <div className={styles.item}>{this.props.item.id}</div>;
  }
}

export default CartItem;
