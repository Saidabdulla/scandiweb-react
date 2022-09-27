import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addToCard } from "../../../actions/cart-actions";

import styles from "./card.module.css";
import { ReactComponent as IconBasket } from "../../../assets/img/green_basket.svg";

class Card extends Component {
  onClickGreenBasket() {
    const selecteds = {};

    this.props.product.attributes.forEach((element) => {
      const name = element.name;
      const value =
        element.name.toLowerCase() === "color"
          ? element.items[0].displayValue
          : element.items[0].value;

      let str = name.replaceAll(" ", "");
      let secondPart = str.charAt(0).toUpperCase() + str.slice(1);

      selecteds[`selected${secondPart}`] = value;
    });

    const product = {
      id: this.props.product.id,
      quantity: 1,
      item: {
        ...selecteds,
        name: this.props.product.name,
        brand: this.props.product.brand,
        prices: this.props.product.prices,
        attributes: this.props.product.attributes,
        gallery: this.props.product.gallery,
      },
    };

    this.props.addToCard(product);
  }

  render() {
    return (
      <div
        className={`${styles.card} ${
          !this.props.product.inStock ? styles["out-of-stock"] : ""
        }`}
      >
        <Link
          to={`/product/${this.props.product.id}`}
          className={styles["card-link"]}
        >
          <div className={styles.container}>
            {!this.props.product.inStock ? (
              <div className={styles["stock-overlay"]}>
                <span>OUT OF STOCK</span>
              </div>
            ) : null}

            <img
              loading="lazy"
              className={styles.img}
              src={this.props.product.gallery[0]}
              alt={this.props.product.name}
            />
          </div>

          <div className={styles.content}>
            <div className={styles.name}>{this.props.product.name}</div>

            {this.props.product.prices.map((price) => {
              return this.props.currency.value === price.currency.symbol ? (
                <div className={styles.price} key={price.currency.symbol}>
                  {price.currency.symbol} {price.amount}
                </div>
              ) : null;
            })}
          </div>
        </Link>

        <button
          style={!this.props.product.inStock ? { display: "none" } : null}
          className={styles["add-to-card-btn"]}
          onClick={() => this.onClickGreenBasket()}
        >
          <IconBasket />
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.currency,
  cart: state.cart,
});

export default connect(mapStateToProps, { addToCard })(Card);
