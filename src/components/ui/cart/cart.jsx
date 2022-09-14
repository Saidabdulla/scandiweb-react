import React, { Component } from "react";
import { connect } from "react-redux";
import {} from "../../../actions/cart-actions";

import styles from "./cart.module.css";

class Cart extends Component {
  render() {
    return (
      <div
        style={!this.props.isShow ? { display: "none" } : null}
        className={styles.cart}
      >
        Cart
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
  currency: state.currency,
});

export default connect(mapStateToProps, {})(Cart);
