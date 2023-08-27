import React, {useEffect, useState} from "react";
import Header from "../../components/header/Header.jsx";
import {Link} from "react-router-dom";
import Button from "../../components/button/Button.jsx";
import Masonry from "../../components/masonry/Masonry.jsx";
// import image from "react-multi-carousel/dev/components/image.js";


const Favorite = () => {
  const [retrievedFavCats, setRetrievedFavCats] = useState([]);
  const filteredMasonryItems = () => {
    return retrievedFavCats;

  };

  const getFavorite = () => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("x-api-key", "live_DplEv4vIA4jSOEJfCgEPl45FLrfvWac38q1dhPGBBzn3GQjNLHk3kSaZUky39PUl");

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch("https://api.thecatapi.com/v1/favourites?sub_id=", requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result);
        setRetrievedFavCats(JSON.parse(result).map(item => ({url: item.image.url})));
      })
      .catch(error => console.log("error", error));
  };

  useEffect(() => {

    getFavorite();
  }, []);
  return (
    <>
      <div className="container">
        <Header/>
        <main className="main_favorite">
          <div className="btn_back">
            <Link to="/">
              <Button padding={"8px 10px"}
                      icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                                 fill="none">
                        <g clipPath="url(#clip0_1_85)">
                          <path
                            d="M4.70999 10.9901L13.3097 19.5896C13.8567 20.1369 14.7437 20.1369 15.2905 19.5896C15.8373 19.0427 15.8373 18.1558 15.2905 17.6091L7.68104 9.99988L15.2902 2.39096C15.8371 1.84391 15.8371 0.957107 15.2902 0.410284C14.7434 -0.136761 13.8565 -0.136761 13.3095 0.410284L4.70977 9.00985C4.43635 9.28339 4.2998 9.64153 4.2998 9.99983C4.2998 10.3583 4.43662 10.7167 4.70999 10.9901Z"/>
                        </g>
                        <defs>
                          <clipPath id="clip0_1_85">
                            <rect width="20" height="20" fill="white"/>
                          </clipPath>
                        </defs>
                      </svg>}/>
            </Link>
            <p>FAVOURITES</p>
          </div>
          {retrievedFavCats.length > 0 ? <Masonry items={filteredMasonryItems()}/> :
            <div className="no_items"><p>No item found</p></div>}


        </main>
      </div>
    </>
  );
};
export default Favorite;
