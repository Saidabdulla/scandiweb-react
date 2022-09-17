import React, { Component } from "react";
import { connect } from "react-redux";
import CartItem from "../ui/cart-item/cart-item";

import styles from "./cart-view.module.css";

class CartView extends Component {
  render() {
    return (
      <main className="wrapper">
        <div className="title">Cart</div>

        <div className={styles.items}>
          {this.props.cart.items.map((item) => (
            <CartItem key={item.id + Math.random()} item={item} big={true} />
          ))}

          <div style={{ borderTop: "1px solid #E5E5E5" }}></div>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
  currency: state.currency,
});

export default connect(mapStateToProps, {})(CartView);
