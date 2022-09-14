import React, { Component } from "react";
import { connect } from "react-redux";
import { withParams } from "../../../utils/withParams";
import SizeBtn from "../size-btn/size";
import Color from "../color/color";
import Button from "../button/button";
import styles from "./cart.module.css";

class Cart extends Component {
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

  render() {
    return (
      <>
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

        <div className={styles["add-button"]}>
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
});

export default connect(mapStateToProps, {})(withParams(Cart));