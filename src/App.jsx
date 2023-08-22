import React from "react";
import {Outlet, Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home";
import Breeds from "./pages/breeds/Breeds";
import Voting from "./pages/voting/Voting";
import Gallery from "./pages/gallery/Gallery";
import Sidebar from "./components/sidebar/Sidebar.jsx";


const App = () => (
  <div className="app-container">
    <Sidebar />
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