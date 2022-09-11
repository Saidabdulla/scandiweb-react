import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./card.module.css";

class Card extends Component {
  constructor({ product }) {
    super();

    this.state = {
      product: product,
      amount: 0,
      symbol: "",
    };
  }

  componentDidMount() {
    this.state.product.prices.find((price) => {
      if (price.currency.symbol === this.props.currency.value) {
        return this.setState({
          amount: price.amount,
          symbol: price.currency.symbol,
        });
      }
    });
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousProps.currency.value !== this.props.currency.value) {
      this.state.product.prices.find((price) => {
        if (price.currency.symbol === this.props.currency.value) {
          return this.setState({
            amount: price.amount,
            symbol: price.currency.symbol,
          });
        }
      });
    }
  }

  render() {
    return (
      <div
        className={`${styles.card} ${
          !this.state.product.inStock ? styles["out-of-stock"] : ""
        }`}
      >
        <a href="#" className={styles["card-link"]}>
          <div className={styles.container}>
            {!this.state.product.inStock ? (
              <div className={styles["stock-overlay"]}>
                <span>OUT OF STOCK</span>
              </div>
            ) : null}
            <img
              loading="lazy"
              className={styles.img}
              src={this.state.product.gallery[0]}
              alt={this.state.product.name}
            />
          </div>
          <div className={styles.content}>
            <div className={styles.name}>{this.state.product.name}</div>

            <div className={styles.price}>
              {this.state.symbol} {this.state.amount}
            </div>
          </div>
        </a>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.currency,
});

export default connect(mapStateToProps, {})(Card);
