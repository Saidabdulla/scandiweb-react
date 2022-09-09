import { Component } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Tech from "./components/tech/tech";
import All from "./components/all/all";
import Clothes from "./components/clothes/clothes";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navbar />}>
              <Route index element={<Navigate to="all" replace />} />
              <Route path="all" element={<All />} />
              <Route path="tech" element={<Tech />} />
              <Route path="clothes" element={<Clothes />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
