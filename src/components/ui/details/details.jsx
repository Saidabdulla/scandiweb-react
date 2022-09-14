import React, { Component } from "react";
import { connect } from "react-redux";
import { addToCard } from "../../../actions/cart-actions";
import _ from "lodash";
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
      return alert("Please select all features! Color, size, capacity, etc...");
    }

    // quantity
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

    let cart = JSON.parse(localStorage.getItem("cart"));

    if (!cart) {
      cart = [];
      cart.push(product);
      alert("Product added to your basket 🙂!");
    } else {
      const itemIndex = cart.findIndex((item) =>
        _.isEqual(item.item, product.item)
      );

      if (itemIndex >= 0) {
        alert("You already have this product in your basket 😊!");
      } else {
        cart.push(product);
        alert("Product added to your basket 🙂!");
      }
    }

    // localStorage.setItem("cart", JSON.stringify(cart));
    console.log("detail component: ", cart);
    this.props.addToCard(cart);
  };

  render() {
    return (
      <>
        {console.log(this.props)}
        <div className={styles.brand}>{this.props.product.brand}</div>
        <div className={styles.name}>{this.props.product.name}</div>
        {this.props.product.attributes.map((att) => {
          return (
            <div className={styles.size} key={att.name}>
              <div className={styles["size-title"]}>{att.name}: </div>
              <div className={styles["size-row"]}>
                {att.items.map((item) =>
                  att.name.toLowerCase() !== "color" ? (
                    <div
                      className={styles["big-btn"]}
                      key={item.value}
                      onClick={() => this.setSelectedAttr(att.name, item.value)}
                    >
                      <SizeBtn
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

        <div
          dangerouslySetInnerHTML={{
            __html: this.props.product.description,
          }}
          className={styles.description}
        ></div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.currency,
  cart: state.cart,
});

export default connect(mapStateToProps, { addToCard })(Details);
