import { Component } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
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

              <Route path="all" element={<Main page="all" />}></Route>
              <Route path="tech" element={<Main page="tech" />}></Route>
              <Route path="clothes" element={<Main page="clothes" />}></Route>

              <Route path="cart" element={<CartView />} />
              <Route path="/product/:id" element={<Product />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  overlay: state.overlay,
});

export default connect(mapStateToProps, {})(App);
