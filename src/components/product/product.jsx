import React, { Component } from "react";
import { Query } from "@apollo/client/react/components";
import { GET_PRODUCT_BY_ID } from "../../graphql/queries";
import { withParams } from "../../utils/withParams";
import SizeBtn from "../ui/size-btn/size";
import styles from "./product.module.css";

class Product extends Component {
  constructor() {
    super();

    this.state = {
      id: "",
      imageUrl: "",
      activeSize: "",
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
              <div className={styles.right}>
                <div className={styles.brand}>{product.brand}</div>
                <div className={styles.name}>{product.name}</div>

                {console.log(this.state)}

                {product.attributes.map((att) => {
                  return att.name.toLowerCase() === "size" ? (
                    <div className={styles.size} key={att.name}>
                      <div className={styles["size-title"]}>size: </div>
                      <div className={styles["size-row"]}>
                        {att.items.map((size) => (
                          <div
                            key={size.value}
                            onClick={() =>
                              this.setState({ activeSize: size.value })
                            }
                          >
                            <SizeBtn
                              active={
                                size.value === this.state.activeSize
                                  ? true
                                  : false
                              }
                              text={size.value}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null;
                })}
              </div>
            </main>
          );
        }}
      </Query>
    );
  }
}

export default withParams(Product);
