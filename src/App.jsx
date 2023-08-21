// eslint-disable-next-line no-unused-vars
import React from "react";
import {Outlet, Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home";
import Breeds from "./pages/breeds/Breeds";
import Voting from "./pages/voting/Voting";
import Gallery from "./pages/gallery/Gallery";
import Header from "./components/header/Header";





const App = () => (
  <div>
    <Header />
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route path="" element={<Home />} />
        <Route path="voting" element={<Voting />} />
        <Route path="breeds" element={<Breeds />} />
        <Route path="gallery" element={<Gallery />} />
      </Route>
    </Routes>

  </div>
);
export default App;