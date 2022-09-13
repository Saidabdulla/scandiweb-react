import React, { Component } from "react";
import { connect } from "react-redux";
import { Query } from "@apollo/client/react/components";
import { GET_PRODUCT_BY_ID } from "../../graphql/queries";
import { withParams } from "../../utils/withParams";
import SizeBtn from "../ui/size-btn/size";
import styles from "./product.module.css";
import Color from "../ui/color/color";
import Button from "../ui/button/button";

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

  setSelectedAttr(name, value) {
    const newState = {};
    let str = name.replaceAll(" ", "");
    let secondPart = str.charAt(0).toUpperCase() + str.slice(1);
    newState[`selected${secondPart}`] = value;

    this.setState(newState);
  }

  checkActiveOrnot(name, value) {
    let str = name.replaceAll(" ", "");
    let secondPart = str.charAt(0).toUpperCase() + str.slice(1);

    const stateName = `selected${secondPart}`;

    return value === this.state[stateName];
  }

  sortProductAttrs(prod) {
    const colorAttr = prod.attributes.find((item) => {
      return item.name.toLowerCase() === "color" ? item : null;
    });

    if (!colorAttr) {
      return prod;
    }

    const filteredArray = prod.attributes.filter((item) => {
      return item.name.toLowerCase() !== "color" ? item : null;
    });

    if (filteredArray.length === 0) {
      return prod;
    }

    filteredArray.push(colorAttr);

    return {
      ...prod,
      attributes: filteredArray,
    };
  }

  render() {
    return (
      <Query query={GET_PRODUCT_BY_ID} variables={{ id: this.state.id }}>
        {({ loading, error, data }) => {
          if (error) return error;
          if (loading || !data) return "loading...";

          const prod = data.product;
          const product = this.sortProductAttrs(prod);

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

                {console.log(product)}
                {product.attributes.map((att) => {
                  return (
                    <div className={styles.size} key={att.name}>
                      <div className={styles["size-title"]}>{att.name}: </div>
                      <div className={styles["size-row"]}>
                        {att.items.map((item) =>
                          att.name.toLowerCase() !== "color" ? (
                            <div
                              className={styles["big-btn"]}
                              key={item.value}
                              onClick={() =>
                                this.setSelectedAttr(att.name, item.value)
                              }
                            >
                              <SizeBtn
                                active={this.checkActiveOrnot(
                                  att.name,
                                  item.value
                                )}
                                text={item.value}
                              />
                            </div>
                          ) : (
                            <div
                              className={styles["mid-btn"]}
                              key={item.value}
                              onClick={() =>
                                this.setSelectedAttr(
                                  att.name,
                                  item.displayValue
                                )
                              }
                            >
                              <Color
                                active={this.checkActiveOrnot(
                                  att.name,
                                  item.displayValue
                                )}
                                color={item.value}
                              />
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  );
                })}

                <div className={styles["price-title"]}>PRICE: </div>

                {product.prices.map((price) => {
                  return this.props.currency.value === price.currency.symbol ? (
                    <div
                      key={price.currency.symbol}
                      className={styles["price-amount"]}
                    >
                      {price.currency.symbol} {price.amount}
                    </div>
                  ) : null;
                })}

                <div className={styles["add-button"]}>
                  <Button isDisabled={!product.inStock} />
                </div>

                <div
                  dangerouslySetInnerHTML={{
                    __html: product.description,
                  }}
                  className={styles.description}
                ></div>
              </div>
            </main>
          );
        }}
      </Query>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.currency,
});

export default connect(mapStateToProps, {})(withParams(Product));
