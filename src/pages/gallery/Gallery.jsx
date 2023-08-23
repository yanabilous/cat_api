import React, {useEffect, useState} from "react";
import Header from "../../components/header/Header.jsx";
import {Link} from "react-router-dom";
import Button from "../../components/button/Button.jsx";
import Masonry from "../../components/masonry/Masonry.jsx";




const Gallery = () => {
  const [retrievedCats, setRetrievedCats] = useState([]);
  const [sortedOrder, setSortedOrder] = useState("Random");
  const [sortedType, setSortedType] = useState("All");
  const [sortedBreed, setSortedBreed] = useState("None");
  const [sortedLimit, setSortedLimit] = useState(5);

  const orders = ["Random", "Desc", "Asc"];
  const types = ["All", "Static", "Animated"];
  const breeds = ["None", "Bengal", "Bengal"];
  const limits = [5, 10, 15, 20];

  const getCats = () => {
    let myHeaders = new Headers();
    myHeaders.append("x-api-key", "live_DplEv4vIA4jSOEJfCgEPl45FLrfvWac38q1dhPGBBzn3GQjNLHk3kSaZUky39PUl");
    myHeaders.append("Content-Type", "application/json");


    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch("https://api.thecatapi.com/v1/images/search?limit=10", requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result);
        setRetrievedCats(JSON.parse(result));
      })
      .catch(error => console.log("error", error));
  };
  useEffect(() => {
    getCats();
  }, []);
  const filteredMasonryItems = () => {
    return retrievedCats;

  };
  const handleOrderChange = (event) => {
    setSortedOrder(event.target.value);
  };
  const handleTypeChange = (event) => {
    setSortedType(event.target.value);
  };

  const handleBreedChange = (event) => {
    setSortedBreed(event.target.value);
  };

  const handleLimitChange = (event) => {
    setSortedLimit(event.target.value);
  };
  return (
    <>
      {/*<Sidebar/>*/}
      <div className="container">
        <Header/>
        <main className="main_gallery">
          <div className="btn_back">
            <div className="flex_header_gallery">
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
              <p>GALLERY</p>
            </div>
            <Button padding={"10px 34px"} content={"UPLOAD"}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"
                               fill="none">
                      <path fillRule="evenodd" clipRule="evenodd"
                            d="M7.86601 0L12.2355 4.03339L11.4129 4.92452L8.48919 2.22567V12.3618H7.27645V2.30464L4.67336 4.90772L3.81583 4.05019L7.86601 0ZM1.21274 14.7873V7.51081H0V16H15.7656V7.51081H14.5529V14.7873H1.21274Z"
                            fill="#FF868E"/>
                    </svg>}
            />
          </div>
          <div className="filters_gallery">
            <div className="select select_order">
              <p>Order</p>
              <select className="select_gallery" value={sortedOrder} onChange={handleOrderChange}>
                {orders.map((order) => (
                  <option key={order} value={order}>
                    {order}
                  </option>
                ))}
              </select>
            </div>

            <div className="select select_type">
              <p>Type</p>
              <select className="select_gallery" value={sortedType} onChange={handleTypeChange}>
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="select select_breed">
              <p>Breed</p>
              <select className="select_gallery" value={sortedBreed} onChange={handleBreedChange}>
                {breeds.map((breed) => (
                  <option key={breed} value={breed}>
                    {breed}
                  </option>
                ))}
              </select>
            </div>

            <div className="select select_breed">
              <p>Limit</p>
              <select className="select_gallery_cast" value={sortedLimit} onChange={handleLimitChange}>
                {limits.map((limit) => (
                  <option key={limit} value={limit}>
                    {limit}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Button padding="8px 11px"
                      icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20"
                                 fill="none">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M8.48189 2.49989L6.93396 0.953004L7.88633 0L11.0577 3.16928L7.88634 6.33873L6.93395 5.38576L8.47232 3.84832C4.51244 3.99813 1.3473 7.25498 1.3473 11.2478C1.3473 15.3361 4.66547 18.6527 8.75744 18.6527C12.8494 18.6527 16.1676 15.3361 16.1676 11.2478V10.5742H17.5149V11.2478C17.5149 16.081 13.5927 20 8.75744 20C3.92221 20 0 16.081 0 11.2478C0 6.50682 3.77407 2.64542 8.48189 2.49989Z"
                              fill="#FF868E"/>
                      </svg>}/>
            </div>
          </div>
          <Masonry items={filteredMasonryItems()}/>
        </main>
      </div>
    </>
  );
};
export default Gallery;

