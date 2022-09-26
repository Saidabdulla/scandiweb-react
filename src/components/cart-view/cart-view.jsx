import React, { Component } from "react";
import { connect } from "react-redux";
import CartItem from "../ui/cart-item/cart-item";

import styles from "./cart-view.module.css";

class CartView extends Component {
  totalSum() {
    let sum = 0;
    const { items } = this.props.cart;

    for (let i = 0; i < items.length; i++) {
      let { prices } = items[i].item;

      let price = prices.find(
        (el) => el.currency.symbol === this.props.currency.value
      );

      sum += price.amount * items[i].quantity;
    }

    sum += "";

    return sum.slice(0, sum.indexOf(".") + 3);
  }

  totalQuantity() {
    let sum = 0;
    const { items } = this.props.cart;

    for (let i = 0; i < items.length; i++) {
      sum += items[i].quantity;
    }

    return sum;
  }

  render() {
    return (
      <main className="wrapper">
        <div
          className="inner-wrapper-overlay"
          style={
            this.props.overlay.value
              ? { display: "block" }
              : { display: "none" }
          }
        ></div>
        <div className="inner-wrapper">
          <div className="title">Cart</div>

          <div className={styles.items}>
            {this.props.cart.items.map((item) => (
              <CartItem key={item.id + Math.random()} item={item} big={true} />
            ))}

            <div style={{ borderTop: "1px solid #E5E5E5" }}></div>
          </div>

          <div className={styles.info}>
            <div>
              <div className={styles.quantity}>Tax 21%:</div>

              <div className={styles.quantity}>Quantity:</div>

              <div className={styles.quantity}>Total:</div>
            </div>
            <div>
              <div className={styles.quantity}>
                <span>$42.00</span>
              </div>

              <div className={styles.quantity}>
                <span>{this.totalQuantity()}</span>
              </div>

              <div className={styles.quantity}>
                <span>
                  {this.props.currency.value} {this.totalSum()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
  currency: state.currency,
  overlay: state.overlay,
});

export default connect(mapStateToProps, {})(CartView);
