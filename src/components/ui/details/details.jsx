import React, { Component } from "react";
import parse from "html-react-parser";
import { connect } from "react-redux";
import { addToCard } from "../../../actions/cart-actions";
import { toast } from "react-toastify";
import SizeBtn from "../size-btn/size";
import Color from "../color/color";
import Button from "../button/button";
import styles from "./details.module.css";

class Details extends Component {
  constructor() {
    super();

    this.state = {};
  }

  setSelectedAttr(name, value) {
    const newState = {};
    let str = name.replaceAll(" ", "");
    let secondPart = str.charAt(0).toUpperCase() + str.slice(1);
    newState[`selected${secondPart}`] = value;

    this.setState(newState);
  }

  checkActiveOrnot(name, value) {
    let str = name.replaceAll(" ", "");
    let secondPart = str.charAt(0).toUpperCase() + str.slice(1);

    const stateName = `selected${secondPart}`;

    return value === this.state[stateName];
  }

  addItemToCard = () => {
    if (
      Object.keys(this.state).length !== this.props.product.attributes.length
    ) {
      return toast.warn(
        "Please select all features! Color, size, capacity, etc..."
      );
    }

    const product = {
      id: this.props.id,
      quantity: 1,
      item: {
        ...this.state,
        name: this.props.product.name,
        brand: this.props.product.brand,
        prices: this.props.product.prices,
        attributes: this.props.product.attributes,
        gallery: this.props.product.gallery,
      },
    };

    this.props.addToCard(product);
  };

  render() {
    return (
      <>
        <div className={styles.brand}>{this.props.product.brand}</div>
        <div className={styles.name}>{this.props.product.name}</div>
        {this.props.product.attributes.map((att) => {
          return (
            <div className={styles.size} key={att.name}>
              <div className={styles["size-title"]}>{att.name}: </div>
              <div
                className={`${
                  att.name.toLowerCase() === "color"
                    ? styles["color-row"]
                    : null
                } ${styles["size-row"]}`}
              >
                {att.items.map((item) =>
                  att.name.toLowerCase() !== "color" ? (
                    <div
                      className={styles["big-btn"]}
                      key={item.value}
                      onClick={() => this.setSelectedAttr(att.name, item.value)}
                    >
                      <SizeBtn
                        big={true}
                        active={this.checkActiveOrnot(att.name, item.value)}
                        text={item.value}
                      />
                    </div>
                  ) : (
                    <div
                      className={styles["mid-btn"]}
                      key={item.value}
                      onClick={() =>
                        this.setSelectedAttr(att.name, item.displayValue)
                      }
                    >
                      <Color
                        big={true}
                        active={this.checkActiveOrnot(
                          att.name,
                          item.displayValue
                        )}
                        color={item.value}
                      />
                    </div>
                  )
                )}
              </div>
            </div>
          );
        })}

        <div className={styles["price-title"]}>PRICE: </div>

        {this.props.product.prices.map((price) => {
          return this.props.currency.value === price.currency.symbol ? (
            <div key={price.currency.symbol} className={styles["price-amount"]}>
              {price.currency.symbol} {price.amount}
            </div>
          ) : null;
        })}

        <div
          className={styles["add-button"]}
          onClick={() => this.addItemToCard()}
        >
          <Button isDisabled={!this.props.product.inStock} />
        </div>

        <div className={styles.description}>
          {parse(this.props.product.description)}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.currency,
  cart: state.cart,
});

export default connect(mapStateToProps, { addToCard })(Details);
