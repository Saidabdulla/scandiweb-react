import React, { Component } from "react";

class Card extends Component {
  constructor({ product }) {
    super();

    this.state = {
      product: product,
    };
  }

  render() {
    return <div>{this.state.product.name}</div>;
  }
}

export default Card;
