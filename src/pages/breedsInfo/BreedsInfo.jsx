import React from "react";
import Header from "../../components/header/Header.jsx";
import {Link} from "react-router-dom";
import Button from "../../components/button/Button.jsx";
import cat from "../../assets/images/voting/image 1 (2).png";



const BreedsInfo = () => {
  return (
    <>
      <div className="container">
        <Header/>
        <main className="main_breeds_info">
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
            <p className="id_cat">id 20</p>
          </div>
          <div className="img_cat_info">
             <img src={cat} alt={cat}/>
          </div>
          <div className="cat_info">
            <h3 className="title_cat">Basenji</h3>
            <p className="fam_desc">Family companion cat</p>
            <div className="desc_general">
            <div className="desc_left">
              <p><span>Temperament:</span> <br></br>Active, Energetic, Independent, Intelligent, Gentle</p>
            </div>
            <div className="desc_right">
              <p><span>Origin:</span> United States</p>
              <p><span>Weight:</span> 3 - 5 kgs</p>
              <p><span>Life span: </span>14 - 15 years</p>
            </div>
              </div>
          </div>

        </main>
      </div>
    </>
  );
};
export default BreedsInfo;
