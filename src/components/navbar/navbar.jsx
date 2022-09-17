import React, { Component } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import { Query } from "@apollo/client/react/components";
import { connect } from "react-redux";
import { changeCurrency } from "../../actions/currency-actions";
import { overlayToggle } from "../../actions/modal-actions.js";
import { GET_CATEGORIES, GET_CURRENCIES } from "../../graphql/queries";
import Cart from "../ui/cart/cart";

import styles from "./navbar.module.css";
import { ReactComponent as IconLogo } from "../../assets/img/VSF.svg";
import { ReactComponent as IconCart } from "../../assets/img/empty_cart.svg";

class Navbar extends Component {
  constructor() {
    super();

    this.state = {
      showCurrencyModal: false,
    };
  }

  // updates store and closes currency modal
  clickCurrencyHandler = (value) => {
    this.props.changeCurrency(value);
    this.setState({ showCurrencyModal: false });
  };

  clickCartBtnHandler = (value) => {
    this.setState({ showCurrencyModal: false });

    this.props.overlayToggle(value);
  };

  render() {
    return (
      <>
        <div className={styles.navbar}>
          <ul className={styles.list}>
            <Query query={GET_CATEGORIES}>
              {({ loading, error, data }) => {
                if (error) return error;
                if (loading || !data) return "loading...";

                const { categories } = data;
                return categories.map((cat) => (
                  <NavLink
                    onClick={() => this.props.overlayToggle(false)}
                    key={cat.name}
                    className={styles.link}
                    to={cat.name}
                  >
                    {cat.name}
                  </NavLink>
                ));
              }}
            </Query>
          </ul>

          <Link className={styles.logo} to="/all">
            <IconLogo onClick={() => this.props.overlayToggle(false)} />
          </Link>

          <div className={styles.right}>
            <button
              type="button"
              className={styles["currency-btn"]}
              onClick={() => {
                this.setState((prevState, props) => ({
                  showCurrencyModal: !prevState.showCurrencyModal,
                }));

                this.props.overlayToggle(false);
              }}
            >
              <div>{this.props.currency.value}</div>
              <svg
                width="8"
                height="4"
                viewBox="0 0 8 4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 0.5L4 3.5L7 0.5"
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={() =>
                this.clickCartBtnHandler(!this.props.overlay.value)
              }
              type="button"
              className={styles["cart-btn"]}
            >
              <IconCart />

              <div
                style={
                  !this.props.cart.items.length ? { display: "none" } : null
                }
                className={styles.counter}
              >
                {this.props.cart.items.length}
              </div>
            </button>

            <Cart isShow={this.props.overlay.value} />
            {/* show the modal conditionally */}
            {this.state.showCurrencyModal ? (
              <ul className={styles["currency-modal"]}>
                <Query query={GET_CURRENCIES}>
                  {({ loading, error, data }) => {
                    if (error) return error;
                    if (loading || !data) return "loading...";

                    const { currencies } = data;
                    return currencies.map((cy) => (
                      <li
                        onClick={() => this.clickCurrencyHandler(cy.symbol)}
                        className={
                          cy.symbol === this.props.currency.value
                            ? "currency-active"
                            : ""
                        }
                        key={cy.symbol}
                      >
                        {cy.symbol} {cy.label}
                      </li>
                    ));
                  }}
                </Query>
              </ul>
            ) : null}
          </div>
        </div>
        <Outlet />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.currency,
  cart: state.cart,
  overlay: state.overlay,
});

export default connect(mapStateToProps, { changeCurrency, overlayToggle })(
  Navbar
);
