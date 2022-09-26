import React, { Component } from "react";
import { connect } from "react-redux";
import { Query } from "@apollo/client/react/components";
import { overlayToggle } from "../../actions/modal-actions.js";
import { GET_PRODUCT_BY_ID } from "../../graphql/queries";
import { withParams } from "../../utils/withParams";
import { sortProductAttrs } from "../../utils/sortAttributes";
import Details from "../ui/details/details";
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
      <div
        className={styles["pdp-wrapper"]}
        onClick={() => this.props.overlayToggle(false)}
      >
        <div
          className={styles["pdp-wrapper-overlay"]}
          style={
            this.props.overlay.value
              ? { display: "block" }
              : { display: "none" }
          }
        ></div>

        <Query query={GET_PRODUCT_BY_ID} variables={{ id: this.state.id }}>
          {({ loading, error, data }) => {
            if (error) return error;
            if (loading || !data) return "loading...";

            const prod = data.product;
            const product = sortProductAttrs(prod, true);

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
                <div className={styles.right}>
                  <Details product={product} id={this.state.id} />
                </div>
              </main>
            );
          }}
        </Query>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.currency,
  overlay: state.overlay,
});

export default connect(mapStateToProps, { overlayToggle })(withParams(Product));
