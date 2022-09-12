import React, { Component } from "react";
import { Query } from "@apollo/client/react/components";
import { GET_PRODUCTS } from "../../graphql/queries";
import Card from "../ui/card/card";

import "./all.css";

class All extends Component {
  render() {
    return (
      <main className="wrapper">
        <div className="title">All</div>

        <div className="products">
          <Query query={GET_PRODUCTS} variables={{ title: "all" }}>
            {({ loading, error, data }) => {
              if (error) return error;
              if (loading || !data) return "loading...";

              const { products } = data.category;

              return products.map((product) => (
                <Card key={product.id} product={product} />
              ));
            }}
          </Query>
        </div>
      </main>
    );
  }
}

export default All;
