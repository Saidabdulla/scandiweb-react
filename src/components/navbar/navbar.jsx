import React, { Component } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { Query } from "@apollo/client/react/components";
import { GET_CATEGORIES } from "../../graphql/queries";

import styles from "./navbar.module.css";
import { ReactComponent as IconLogo } from "../../assets/img/VSF.svg";

class Navbar extends Component {
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
                  <NavLink className={styles.link} to={cat.name}>
                    {cat.name}
                  </NavLink>
                ));
              }}
            </Query>
          </ul>

          <NavLink className={styles.logo} to="/">
            <IconLogo />
          </NavLink>

          <ul className={styles.right}>
            <li>$</li>
            <li>savat</li>
          </ul>
        </div>

        <Outlet />
      </>
    );
  }
}

export default Navbar;
