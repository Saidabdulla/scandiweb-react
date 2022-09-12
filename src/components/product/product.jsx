import React, { Component } from "react";
import { Query } from "@apollo/client/react/components";
import { GET_PRODUCT_BY_ID } from "../../graphql/queries";
import { withParams } from "../../utils/withParams";
import styles from "./product.module.css";

class Product extends Component {
  constructor() {
    super();

    this.state = {
      id: "",
      imageUrl: "",
    };
  }

  componentDidMount() {
    const { id } = this.props.params;
    this.setState({ id: id });
  }

  render() {
    return (
      <Query query={GET_PRODUCT_BY_ID} variables={{ id: this.state.id }}>
        {({ loading, error, data }) => {
          if (error) return error;
          if (loading || !data) return "loading...";

          const { product } = data;

          return (
            <main className={styles.pdp}>
              <div className={styles.left}>
                <div className={styles.images}>
                  {product.gallery.map((img, index) => {
                    return (
                      <div className={styles.container} key={img}>
                        <img
                          loading="lazy"
                          src={img}
                          alt="product"
                          onClick={() => this.setState({ imageUrl: img })}
                        />
                      </div>
                    );
                  })}
                </div>
                <div className={styles.image}>
                  <img
                    loading="lazy"
                    src={
                      this.state.imageUrl
                        ? this.state.imageUrl
                        : product.gallery[0]
                    }
                    alt="product"
                  />
                </div>
              </div>
            </main>
          );
        }}
      </Query>
    );
  }
}

export default withParams(Product);
