import { Component } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GET_CATEGORIES } from "./graphql/queries";
import { connect } from "react-redux";
import { graphql } from "@apollo/client/react/hoc";
import Navbar from "./components/navbar/navbar";
import Main from "./components/main/main";
import Product from "./components/product/product";
import CartView from "./components/cart-view/cart-view";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div
          className={this.props.overlay.value ? "overlay-active" : "overlay"}
        ></div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navbar />}>
              <Route index element={<Navigate to="all" replace />} />

              {this.props.data?.categories?.map((cat) => (
                <Route
                  key={cat.name}
                  path={cat.name}
                  element={<Main page={cat.name} />}
                ></Route>
              ))}

              <Route path="cart" element={<CartView />} />
              <Route path="/product/:id" element={<Product />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  overlay: state.overlay,
});

export default connect(mapStateToProps, {})(graphql(GET_CATEGORIES)(App));
