import React, { Component } from "react";

class Product extends Component {
  render() {
    return <div>{console.log(this.props)}</div>;
  }
}

export default Product;
