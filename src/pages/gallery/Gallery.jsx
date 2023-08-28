import React, {useEffect, useState} from "react";
import Header from "../../components/header/Header.jsx";
import {Link} from "react-router-dom";
import Button from "../../components/button/Button.jsx";
import Masonry from "../../components/masonry/Masonry.jsx";
import {fetchWrapper} from "../../utils/makeRequest.js";
import {TailSpin} from "react-loader-spinner";


const Gallery = () => {
  const [selectedBreed, setSelectedBreed] = useState("None");
  const [selectedPhotoCount, setSelectedPhotoCount] = useState(5);
  const [availableBreeds, setAvailableBreeds] = useState([]);
  const [retrievedCats, setRetrievedCats] = useState();
  const [order, setOrder] = useState("Random");
  const [type, setType] = useState("All");

  const photoCounts = [5, 10, 15, 20];
  const orders = ["Random", "ASC", "DESC"];
  const types = [{id: "jpg,png,gif", name: "All"}, {id: "jpg,png", name: "Static"}, {id: "gif", name: "Animation"}];

  const getCats = () => {
    setRetrievedCats(null)
    fetchWrapper.get(`v1/images/search?mime_types=${type}&order=${order}&limit=${selectedPhotoCount}${["None", "All breeds"].includes(selectedBreed) ? "" : "&breed_ids=" + selectedBreed}`)
      .then(result => setRetrievedCats(result))
      .catch(error => console.error("There was an error!", error));
  };

  const getBreeds = () => {
    fetchWrapper.get(`v1/breeds?limit=10&page=0`)
      .then(result => {
        const breeds = result.map(breed => ({name: breed.name, id: breed.id}));
        setAvailableBreeds([{"name": "All breeds", id: "All breeds"}, ...breeds]);
      })
      .catch(error => console.error("There was an error!", error));
  };
  useEffect(() => {
    getBreeds();
  }, []);

  useEffect(() => {
    getCats();
  }, [selectedBreed, selectedPhotoCount, order, type]);
  const handleBreedChange = (event) => {
    setSelectedBreed(event.target.value);
  };

  const handlePhotoCountChange = (event) => {
    setSelectedPhotoCount(parseInt(event.target.value));
  };

  return (
    <>
      <div className="container">
        <Header/>
        <main className="main_gallery">
          <div className="btn_back">
            <div className="flex_header_gallery">
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
              <p>GALLERY</p>
            </div>
            <Link className="uploadPhoto" to="uploadPhoto">
              <Button padding={"10px 34px"} content={"UPLOAD"}
                      icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"
                                 fill="none">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M7.86601 0L12.2355 4.03339L11.4129 4.92452L8.48919 2.22567V12.3618H7.27645V2.30464L4.67336 4.90772L3.81583 4.05019L7.86601 0ZM1.21274 14.7873V7.51081H0V16H15.7656V7.51081H14.5529V14.7873H1.21274Z"
                              fill="#FF868E"/>
                      </svg>}
              />
            </Link>
          </div>
          <div className="filters_gallery">
            <div className="select select_order">
              <p>Order</p>
              <select className="select_gallery" value={order} onChange={(event) => setOrder(event.target.value)}>
                {orders.map((order) => (
                  <option key={order} value={order}>
                    {order}
                  </option>
                ))}
              </select>

            </div>

            <div className="select select_type">
              <p>Type</p>
              <select className="select_gallery" value={type} onChange={(event) => setType(event.target.value)}>
                {types.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="select select_breed">
              <p>Breed</p>
              <select className="select_gallery" value={selectedBreed} onChange={handleBreedChange}>
                {availableBreeds.map(breed => (<option key={breed.id} value={breed.id}>
                  {breed.name}
                </option>))}
              </select>
            </div>

            <div className="select select_breed">
              <p>Limit</p>
              <select className="select_gallery_cast" value={selectedPhotoCount} onChange={handlePhotoCountChange}>
                {photoCounts.map((count) => (<option key={count} value={count}>
                    {count} photos
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
                      </svg>}
              onClick={() => getCats()} />
            </div>
          </div>

          {retrievedCats && <Masonry items={retrievedCats}/>}
          {!retrievedCats && <TailSpin
                height="80"
                width="80"
                color="#FF868E"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{justifyContent: "center"}}
                wrapperClass=""
                visible={true}
              />}
        </main>
      </div>
    </>
  );
};
export default Gallery;

