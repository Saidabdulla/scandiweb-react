import React, { Component } from "react";
import { connect } from "react-redux";
import CartItem from "../cart-item/cart-item";

import styles from "./cart.module.css";

class Cart extends Component {
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

  render() {
    return (
      <div
        style={!this.props.isShow ? { display: "none" } : null}
        className={styles.cart}
      >
        <div className={styles.title}>
          <span> My Bag, </span>
          {this.props.cart.items.length} items.
        </div>
        {console.log(this.props)}

        {this.props.cart.items.map((item) => (
          <CartItem key={item.id + Math.random()} item={item} />
        ))}

        <div className={styles.total}>
          <div>Total: </div>
          <div>
            {this.props.currency.value} {this.totalSum()}
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.view}>View bag</button>
          <button className={styles.check}>CHECK OUT</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
  currency: state.currency,
});

export default connect(mapStateToProps, {})(Cart);
