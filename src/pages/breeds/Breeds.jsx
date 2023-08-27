import React, {useEffect, useState} from "react";
import Header from "../../components/header/Header.jsx";
import {Link} from "react-router-dom";
import Button from "../../components/button/Button.jsx";
import Masonry from "../../components/masonry/Masonry.jsx";


const Breeds = () => {

  const [selectedBreed, setSelectedBreed] = useState("All breeds");
  const [selectedPhotoCount, setSelectedPhotoCount] = useState(5);
  const [availableBreeds, setAvailableBreeds] = useState([]);
  const [retrievedCats, setRetrievedCats] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [order, setOrder] = useState("ASC");
  const getCats = () => {
    let myHeaders = new Headers();
    myHeaders.append("x-api-key", "live_DplEv4vIA4jSOEJfCgEPl45FLrfvWac38q1dhPGBBzn3GQjNLHk3kSaZUky39PUl");
    myHeaders.append("Content-Type", "application/json");


    let requestOptions = {
      method: "GET", headers: myHeaders, redirect: "follow"
    };


    fetch(`https://api.thecatapi.com/v1/images/search?order=${order}&limit=${selectedPhotoCount}${selectedBreed === "All breeds" ? "" : "&breed_ids=" + selectedBreed}`, requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result);
        setRetrievedCats(JSON.parse(result));
      })
      .catch(error => console.log("error", error));
  };
  const getBreeds = () => {
    console.log("getBreeds");
    let myHeaders = new Headers();
    myHeaders.append("x-api-key", "live_DplEv4vIA4jSOEJfCgEPl45FLrfvWac38q1dhPGBBzn3GQjNLHk3kSaZUky39PUl");
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET", headers: myHeaders, redirect: "follow"
    };

    fetch("https://api.thecatapi.com/v1/breeds?limit=10&page=0", requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log("getBreeds result", result);
        const breeds = JSON.parse(result).map(breed => ({name: breed.name, id: breed.id}));
        setAvailableBreeds([{"name": "All breeds", id: "All breeds"}, ...breeds]);
      })
      .catch(error => console.log("error", error));
  };
  // ignor
  useEffect(() => {
    getBreeds();
    getCats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getCats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBreed, selectedPhotoCount, order]);

  const photoCounts = [5, 10, 15, 20];
  const filteredMasonryItems = () => {
    return retrievedCats;

  };


  const handleBreedChange = (event) => {
    setSelectedBreed(event.target.value);
  };

  const handlePhotoCountChange = (event) => {
    setSelectedPhotoCount(parseInt(event.target.value));
  };


  return (<>
  <div className="container">
    <Header/>
    <main className="main_breeds">
      <div className="btn_back">
        <Link to="/home">
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
        <p>BREEDS</p>
        <div className="select_breeds">
          <select value={selectedBreed} onChange={handleBreedChange}>
            {availableBreeds.map(breed => (<option key={breed.id} value={breed.id}>
              {breed.name}
            </option>))}
          </select>
        </div>

        <div className="select_photo_count">
          <select
            value={selectedPhotoCount}
            onChange={handlePhotoCountChange}
          >
            {photoCounts.map((count) => (<option key={count} value={count}>
              {count} photos
            </option>))}
          </select>
        </div>

        <button className="btn_sortByAlphabet" onClick={()=>setOrder('DESC')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M4 0.195262C4.26035 -0.0650874 4.68246 -0.0650874 4.94281 0.195262L8.94281 4.19526L8 5.13807L5.13807 2.27614V20H3.80474V2.27614L0.942809 5.13807L0 4.19526L4 0.195262ZM15.1381 1.33333C14.0335 1.33333 13.1381 2.22876 13.1381 3.33333V5.33333H17.1381V3.33333C17.1381 2.22876 16.2426 1.33333 15.1381 1.33333ZM17.1381 6.66667V9.33333H18.4714V3.33333C18.4714 1.49238 16.979 9.93411e-09 15.1381 9.93411e-09C13.2971 9.93411e-09 11.8047 1.49238 11.8047 3.33333V9.33333H13.1381V6.66667H17.1381ZM11.8047 10.6667H15.8047C17.2775 10.6667 18.4714 11.8606 18.4714 13.3333C18.4714 14.1298 18.1222 14.8447 17.5686 15.3333C18.1222 15.822 18.4714 16.5369 18.4714 17.3333C18.4714 18.8061 17.2775 20 15.8047 20H11.8047V10.6667ZM15.8047 14.6667C16.5411 14.6667 17.1381 14.0697 17.1381 13.3333C17.1381 12.597 16.5411 12 15.8047 12H13.1381V14.6667H15.8047ZM13.1381 16H15.8047C16.5411 16 17.1381 16.597 17.1381 17.3333C17.1381 18.0697 16.5411 18.6667 15.8047 18.6667H13.1381V16Z"
                  fill="#8C8C8C"/>
          </svg>
        </button>
        <button className="btn_sortByAlphabet" onClick={() => setOrder("ASC")}>
          <svg xmlns="http://www.w3.org/2000/svg" width="19" height="20" viewBox="0 0 19 20" fill="none">
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M3.80474 17.7239V0H5.13807V17.7239L8 14.8619L8.94281 15.8047L4.94281 19.8047C4.81778 19.9298 4.64822 20 4.4714 20C4.29459 20 4.12502 19.9298 4 19.8047L0 15.8047L0.942809 14.8619L3.80474 17.7239ZM15.1381 1.33333C14.0335 1.33333 13.1381 2.22876 13.1381 3.33333V5.33333H17.1381V3.33333C17.1381 2.22876 16.2426 1.33333 15.1381 1.33333ZM17.1381 6.66667V9.33333H18.4714V3.33333C18.4714 1.49238 16.979 0 15.1381 0C13.2971 0 11.8047 1.49238 11.8047 3.33333V9.33333H13.1381V6.66667H17.1381ZM11.8047 10.6667H15.8047C17.2775 10.6667 18.4714 11.8606 18.4714 13.3333C18.4714 14.1298 18.1222 14.8447 17.5686 15.3333C18.1222 15.822 18.4714 16.5369 18.4714 17.3333C18.4714 18.8061 17.2775 20 15.8047 20H11.8047V10.6667ZM15.8047 14.6667C16.5411 14.6667 17.1381 14.0697 17.1381 13.3333C17.1381 12.597 16.5411 12 15.8047 12H13.1381V14.6667H15.8047ZM13.1381 16H15.8047C16.5411 16 17.1381 16.597 17.1381 17.3333C17.1381 18.0697 16.5411 18.6667 15.8047 18.6667H13.1381V16Z"
                  fill="#8C8C8C"/>
          </svg>
      </button>


  </div>
  <Masonry items={filteredMasonryItems()}/>

  </main>
</div>
</>)
  ;
};
export default Breeds;