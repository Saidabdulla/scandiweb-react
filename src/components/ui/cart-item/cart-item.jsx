import React, { Component } from "react";
import { connect } from "react-redux";
import SizeBtn from "../size-btn/size";
import Color from "../color/color";
import { ReactComponent as IconPlus } from "../../../assets/img/plus-square.svg";
import { ReactComponent as IconMinus } from "../../../assets/img/minus.svg";

import styles from "./cart-item.module.css";

class CartItem extends Component {
  // setSelectedAttr(name, value) {
  //   const newState = {};
  //   let str = name.replaceAll(" ", "");
  //   let secondPart = str.charAt(0).toUpperCase() + str.slice(1);
  //   newState[`selected${secondPart}`] = value;

  //   this.setState(newState);
  // }

  // checkActiveOrnot(name, value) {
  //   let str = name.replaceAll(" ", "");
  //   let secondPart = str.charAt(0).toUpperCase() + str.slice(1);

  //   const stateName = `selected${secondPart}`;

  //   return value === this.state[stateName];
  // }

  render() {
    return this.props.item.quantity > 0 ? (
      <div
        className={`${styles.item} ${
          this.props.big ? styles.full : styles.mini
        }`}
      >
        <div className={styles.left}>
          <div className={styles.details}>
            {this.props.big ? (
              <div className={styles.brand}>{this.props.item.item.brand}</div>
            ) : null}

            <div className={styles.title}>{this.props.item.item.name}</div>

            <div className={styles.price}>
              {this.props.item.item.prices.map((el) =>
                el.currency.symbol === this.props.currency.value ? (
                  <span key={el.symbol + Math.random()}>
                    {el.currency.symbol} {el.amount}
                  </span>
                ) : null
              )}
            </div>

            {this.props.item.item.attributes.map((att) => {
              return (
                <div className={styles.size} key={att.name}>
                  <div className={styles["size-title"]}>{att.name}: </div>
                  <div className={styles["size-row"]}>
                    {att.items.map((item) =>
                      att.name.toLowerCase() !== "color" ? (
                        <div
                          className={styles["big-btn"]}
                          key={item.value}
                          // onClick={() =>
                          //   this.setSelectedAttr(att.name, item.value)
                          // }
                        >
                          <SizeBtn
                            big={this.props.big}
                            // active={this.checkActiveOrnot(att.name, item.value)}
                            text={item.value}
                          />
                        </div>
                      ) : (
                        <div
                          className={styles["mid-btn"]}
                          key={item.value}
                          // onClick={() =>
                          //   this.setSelectedAttr(att.name, item.displayValue)
                          // }
                        >
                          <Color
                            big={this.props.big}
                            // active={this.checkActiveOrnot(
                            //   att.name,
                            //   item.displayValue
                            // )}
                            color={item.value}
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.actions}>
            <IconPlus />
            <div>{this.props.item.quantity}</div>
            <IconMinus />
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.image}>
            <img
              loading="lazy"
              src={this.props.item.item.gallery[0]}
              alt={this.props.item.item.gallery[0]}
            />
          </div>
        </div>
      </div>
    ) : null;
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
  currency: state.currency,
});

export default connect(mapStateToProps, {})(CartItem);
