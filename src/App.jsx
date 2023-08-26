import React from "react";
import {Outlet, Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home";
import Breeds from "./pages/breeds/Breeds";
import Voting from "./pages/voting/Voting";
import Gallery from "./pages/gallery/Gallery";
import Sidebar from "./components/sidebar/Sidebar.jsx";
import BreedsInfo from "./pages/breedsInfo/BreedsInfo.jsx";
import Favorite from "./pages/favorite/Favorite.jsx";
import Like from "./pages/like/Like.jsx";
import Dislike from "./pages/dislike/Dislike.jsx";
import UploadPhoto from "./pages/uploadPhoto/UploadPhoto.jsx";


const App = () => (
  <div className="app-container">
    <Sidebar/>
    <Routes>
      <Route path="/" element={<Outlet/>}>
        <Route path="" element={<Home/>}/>
        <Route path="voting" element={<Voting/>}/>
        <Route path="breeds" element={<Breeds/>}/>
        <Route path="breeds/:breedId" element={<BreedsInfo/>}/>
        <Route path="gallery" element={<Gallery/>}/>
        <Route path="gallery/:uploadPhoto" element={<UploadPhoto/>}/>
        <Route path="favorite" element={<Favorite/>}/>
        <Route path="like" element={<Like/>}/>
        <Route path="dislike" element={<Dislike/>}/>
      </Route>
    </Routes>

  </div>
);
export default App;