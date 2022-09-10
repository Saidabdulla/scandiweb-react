import React, { Component } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { Query } from "@apollo/client/react/components";
import { connect } from "react-redux";
import { changeCurrency } from "../../actions/currency-actions";
import { GET_CATEGORIES, GET_CURRENCIES } from "../../graphql/queries";

import styles from "./navbar.module.css";
import { ReactComponent as IconLogo } from "../../assets/img/VSF.svg";
import { ReactComponent as IconCurrency } from "../../assets/img/dollar_and_carret.svg";
import { ReactComponent as IconCart } from "../../assets/img/empty_cart.svg";

class Navbar extends Component {
  constructor() {
    super();

    this.state = {
      showCurrencyModal: false,
    };
  }

  clickCurrencyHandler = (value) => {
    this.props.changeCurrency(value);
    localStorage.setItem("currency", value);
    this.setState({ showCurrencyModal: false });
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
                  <NavLink key={cat.name} className={styles.link} to={cat.name}>
                    {cat.name}
                  </NavLink>
                ));
              }}
            </Query>
          </ul>

          <NavLink className={styles.logo} to="/">
            <IconLogo />
          </NavLink>

          <div className={styles.right}>
            <button
              type="button"
              className={styles["currency-btn"]}
              onClick={() =>
                this.setState((prevState, props) => ({
                  showCurrencyModal: !prevState.showCurrencyModal,
                }))
              }
            >
              <IconCurrency />
            </button>
            <button type="button" className={styles["cart-btn"]}>
              <IconCart />
            </button>

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
                          cy.symbol === localStorage.getItem("currency")
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
});

export default connect(mapStateToProps, { changeCurrency })(Navbar);
