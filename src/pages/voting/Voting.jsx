import React, {useEffect, useState} from "react";
import Header from "../../components/header/Header.jsx";
import Button from "../../components/button/Button.jsx";
import {Link} from "react-router-dom";
import {fetchWrapper} from "../../utils/makeRequest.js";
import {TailSpin} from "react-loader-spinner";


const Voting = () => {
  const [cat, setCat] = useState();
  const [userLogs, setUserLogs] = useState([]);
  const [favId, setFavId] = useState();
  const currentUser = localStorage.getItem("userId");

  const getRandomCat = () => {
    fetchWrapper.get(`v1/images/search`)
      .then(result => setCat(result[0]))
      .catch(error => console.error("There was an error!", error));
  };
  const getTime = (datetime) => {
    let date = new Date(datetime);
    return date.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"});
  };
  const addUserLog = (actionType) => {
    const userLog = {
      dataTime: new Date(),
      catId: cat.id,
      action: actionType
    };
    setUserLogs(current => [userLog, ...current]);
  };

  const postFavorite = () => {
    let body = JSON.stringify({
      "image_id": cat.id,
      "sub_id": currentUser,
    });

    fetchWrapper.post(`v1/favourites`, body)
      .then(result => {
        setFavId(result.id);
        addUserLog("Favorites");
      })
      .catch(error => console.error("There was an error!", error));
  };

  const deleteFav = () => {
    fetchWrapper.delete(`v1/favourites/${favId}`)
      // eslint-disable-next-line no-unused-vars
      .then(result => {
        setFavId(null);
        addUserLog("Unfavorites");
      })
      .catch(error => console.error("There was an error!", error));
  };
  const postVoting = (votingType) => {
    let body = JSON.stringify({
      "image_id": cat.id,
      "sub_id": currentUser,
      "value": votingType
    });
    fetchWrapper.post("v1/votes", body)
      .then(result => {
        console.log(result);
        if (votingType === 1) {
          addUserLog("Likes");
        } else if (votingType === -1) {
          addUserLog("Dislikes");
        }
        getRandomCat();
        setFavId(null);
      })
      .catch(error => console.error("There was an error!", error));
  };
  useEffect(() => {
    getRandomCat();
  }, []);

  return (
    <>
      <div className="container">
        <Header/>
        <main className="main_voting">
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
            <p>VOTING</p>
          </div>
          <div className="img_btn_pos">
            <div className="icon_voting">
              {cat && <img src={cat.url} alt={cat.id}/>}
              {!cat && <TailSpin
                height="80"
                width="80"
                color="#FF868E"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{justifyContent: "center"}}
                wrapperClass=""
                visible={true}
              />}
            </div>
          </div>
           {cat && <div className="btn_complected">
            <button className="btn btn_left" onClick={() => postVoting(1)}>
              <svg className="likes" xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 30"
                   fill="none">
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M0 15C0 6.71573 6.71573 0 15 0C23.2843 0 30 6.71573 30 15C30 23.2843 23.2843 30 15 30C6.71573 30 0 23.2843 0 15ZM15 2C7.8203 2 2 7.8203 2 15C2 22.1797 7.8203 28 15 28C22.1797 28 28 22.1797 28 15C28 7.8203 22.1797 2 15 2ZM10 12H8V10H10V12ZM22 12H20V10H22V12ZM9.2 16.6L9.8 17.4C12.4 20.8667 17.6 20.8667 20.2 17.4L20.8 16.6L22.4 17.8L21.8 18.6C18.4 23.1333 11.6 23.1333 8.2 18.6L7.6 17.8L9.2 16.6Z"
                      fill="white"/>
              </svg>
            </button>
            <button className="btn btn_center" onClick={() => favId ? deleteFav() : postFavorite()}>
              {!favId && <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M23.0711 19C19.7181 19 17 21.7181 17 25.0711C17 26.6812 17.6396 28.2254 18.7782 29.364L30 40.5858L41.2218 29.364C42.3604 28.2254 43 26.6812 43 25.0711C43 21.7181 40.2819 19 36.9289 19C35.3188 19 33.7746 19.6396 32.636 20.7782L30.7071 22.7071C30.3166 23.0976 29.6834 23.0976 29.2929 22.7071L27.364 20.7782C26.2254 19.6396 24.6812 19 23.0711 19ZM15 25.0711C15 20.6135 18.6135 17 23.0711 17C25.2116 17 27.2646 17.8503 28.7782 19.364L30 20.5858L31.2218 19.364C32.7354 17.8503 34.7884 17 36.9289 17C41.3865 17 45 20.6135 45 25.0711C45 27.2116 44.1497 29.2646 42.636 30.7782L30.7071 42.7071C30.3166 43.0976 29.6834 43.0976 29.2929 42.7071L17.364 30.7782C15.8503 29.2646 15 27.2116 15 25.0711Z"
                      fill="white"/>
              </svg>}
              {favId && <svg style={{marginLeft: "18px"}} xmlns="http://www.w3.org/2000/svg" width="60" height="60"
                             viewBox="0 0 60 30" fill="none">
                <path
                  d="M8.07107 2C3.61354 2 0 5.61354 0 10.0711C0 12.2116 0.850339 14.2646 2.36396 15.7782L14.2929 27.7071C14.6834 28.0976 15.3166 28.0976 15.7071 27.7071L27.636 15.7782C29.1497 14.2646 30 12.2116 30 10.0711C30 5.61354 26.3865 2 21.9289 2C19.7884 2 17.7354 2.85034 16.2218 4.36396L15 5.58579L13.7782 4.36396C12.2646 2.85034 10.2116 2 8.07107 2Z"
                  fill="white"/>
              </svg>}

            </button>
            <button className="btn btn_right" onClick={() => postVoting(-1)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M15 30C15 21.7157 21.7157 15 30 15C38.2843 15 45 21.7157 45 30C45 38.2843 38.2843 45 30 45C21.7157 45 15 38.2843 15 30ZM30 17C22.8203 17 17 22.8203 17 30C17 37.1797 22.8203 43 30 43C37.1797 43 43 37.1797 43 30C43 22.8203 37.1797 17 30 17ZM25 27H23V25H25V27ZM37 27H35V25H37V27ZM22.6 35.2L23.2 34.4C26.6 29.8667 33.4 29.8667 36.8 34.4L37.4 35.2L35.8 36.4L35.2 35.6C32.6 32.1333 27.4 32.1333 24.8 35.6L24.2 36.4L22.6 35.2Z"
                      fill="white"/>
              </svg>
            </button>
          </div>}

          {userLogs.map((userLog) => (
            <div className="textItem_voting" key={userLog.catId}>
              <div className="flex_time_desc_voting">
                <p className="time_voting">{getTime(userLog.dataTime)}</p>
                {userLog.action !== "Unfavorites" &&
                  <p className="description_voting">Image ID: <span>{userLog.catId}</span> was added to {userLog.action}
                  </p>}
                {userLog.action === "Unfavorites" &&
                  <p className="description_voting">Image ID: <span>{userLog.catId}</span> was removed from Favorites
                  </p>}
              </div>
              {userLog.action === "Likes" &&
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd"
                        d="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10ZM10 1.33333C5.21353 1.33333 1.33333 5.21353 1.33333 10C1.33333 14.7865 5.21353 18.6667 10 18.6667C14.7865 18.6667 18.6667 14.7865 18.6667 10C18.6667 5.21353 14.7865 1.33333 10 1.33333ZM6.66667 8H5.33333V6.66667H6.66667V8ZM14.6667 8H13.3333V6.66667H14.6667V8ZM6.13333 11.0667L6.53333 11.6C8.26667 13.9111 11.7333 13.9111 13.4667 11.6L13.8667 11.0667L14.9333 11.8667L14.5333 12.4C12.2667 15.4222 7.73333 15.4222 5.46667 12.4L5.06667 11.8667L6.13333 11.0667Z"
                        fill="#97EAB9"/>
                </svg>}
              {userLog.action === "Favorites" &&
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 20 18" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd"
                        d="M5.38071 1.33333C3.14541 1.33333 1.33333 3.14541 1.33333 5.38071C1.33333 6.45414 1.75975 7.48361 2.51878 8.24264L10 15.7239L17.4812 8.24264C18.2402 7.48361 18.6667 6.45414 18.6667 5.38071C18.6667 3.14541 16.8546 1.33333 14.6193 1.33333C13.5459 1.33333 12.5164 1.75975 11.7574 2.51878L10.4714 3.80474C10.2111 4.06509 9.78895 4.06509 9.5286 3.80474L8.24264 2.51878C7.48361 1.75975 6.45414 1.33333 5.38071 1.33333ZM0 5.38071C0 2.40903 2.40903 0 5.38071 0C6.80777 0 8.17637 0.566895 9.18545 1.57597L10 2.39052L10.8146 1.57597C11.8236 0.566894 13.1922 0 14.6193 0C17.591 0 20 2.40903 20 5.38071C20 6.80777 19.4331 8.17637 18.424 9.18545L10.4714 17.1381C10.2111 17.3984 9.78895 17.3984 9.5286 17.1381L1.57597 9.18545C0.566893 8.17637 0 6.80777 0 5.38071Z"
                        fill="#FF868E"/>
                </svg>}
              {userLog.action === "Dislikes" &&
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd"
                        d="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10ZM10 1.33333C5.21353 1.33333 1.33333 5.21353 1.33333 10C1.33333 14.7865 5.21353 18.6667 10 18.6667C14.7865 18.6667 18.6667 14.7865 18.6667 10C18.6667 5.21353 14.7865 1.33333 10 1.33333ZM6.66667 8H5.33333V6.66667H6.66667V8ZM14.6667 8H13.3333V6.66667H14.6667V8ZM5.06667 13.4667L5.46667 12.9333C7.73333 9.91111 12.2667 9.91111 14.5333 12.9333L14.9333 13.4667L13.8667 14.2667L13.4667 13.7333C11.7333 11.4222 8.26667 11.4222 6.53333 13.7333L6.13333 14.2667L5.06667 13.4667Z"
                        fill="#FFD280"/>
                </svg>}
            </div>
          ))}
        </main>
      </div>
    </>
  );

};
export default Voting;