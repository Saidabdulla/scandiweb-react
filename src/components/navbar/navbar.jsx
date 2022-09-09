import React, { Component } from "react";
import { Outlet} from 'react-router-dom'
import { Query } from "@apollo/client/react/components";
import { GET_CATEGORIES } from "../../graphql/queries";

class Navbar extends Component {
  constructor() {
    super();

    this.state = {
      categories: [],
    };
  }

  render() {
    return (
      <>
        <div>
          <Query query={GET_CATEGORIES}>
            {({ loading, error, data }) => {
              if (error) return error;
              if (loading || !data) return "loading...";

              const { categories } = data;
              return categories.map((cat) => <h1>{cat.name}</h1>);
            }}
          </Query>
        </div>

        <Outlet />
      </>
    );
  }
}

export default Navbar;
