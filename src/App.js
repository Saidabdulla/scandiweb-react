import { Component } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import Tech from "./components/tech/tech";
import All from "./components/all/all";
import Clothes from "./components/clothes/clothes";
import Product from "./components/product/product";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navbar />}>
              <Route index element={<Navigate to="all" replace />} />
              <Route path="all" element={<All />}></Route>
              <Route path="tech" element={<Tech />} />
              <Route path="clothes" element={<Clothes />} />
              <Route path="/product/:id" element={<Product />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Footer />
      </div>
    );
  }
}

export default App;
