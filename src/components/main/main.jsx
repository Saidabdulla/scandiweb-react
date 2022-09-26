import React, { Component } from "react";
import { Query } from "@apollo/client/react/components";
import { connect } from "react-redux";
import { GET_PRODUCTS } from "../../graphql/queries";
import Card from "../ui/card/card";

import "./main.css";

class All extends Component {
  render() {
    return (
      <main className="wrapper">
        <div
          className="inner-wrapper-overlay"
          style={
            this.props.overlay.value
              ? { display: "block" }
              : { display: "none" }
          }
        ></div>
        <div className="inner-wrapper">
          <div className="title">
            {this.props.page.charAt(0).toUpperCase() + this.props.page.slice(1)}
          </div>

          <div className="products">
            <Query query={GET_PRODUCTS} variables={{ title: this.props.page }}>
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
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  overlay: state.overlay,
});

export default connect(mapStateToProps, {})(All);
