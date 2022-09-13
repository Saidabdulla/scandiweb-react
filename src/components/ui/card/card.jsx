import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./card.module.css";

class Card extends Component {
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
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.currency,
});

export default connect(mapStateToProps, {})(Card);
