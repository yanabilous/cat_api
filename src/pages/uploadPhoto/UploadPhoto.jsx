import React, {useState} from "react";
import {Link} from "react-router-dom";
import {useDropzone} from "react-dropzone";
import Button from "../../components/button/Button";
import BlurOverlay from "../../components/blurOverlay/BlurOverlay";

const UploadPhoto = () => {
  // const [isPopupOpen, setPopupOpen] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isCatFound, setIsCatFound] = useState(false);


  const handleUploadPhoto = () => {
    event.preventDefault();
    if (selectedFile) {
      console.log("Uploading photo:", selectedFile);


      let formData = new FormData();
      formData.append("file", selectedFile);


      let headers = new Headers();
      headers.append("x-api-key", "live_DplEv4vIA4jSOEJfCgEPl45FLrfvWac38q1dhPGBBzn3GQjNLHk3kSaZUky39PUl");


      let requestOptions = {
        method: "POST",
        headers: headers,
        body: formData,
        redirect: "follow",
      };


      fetch("https://api.thecatapi.com/v1/images/upload", requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result);
          setSelectedFile(null);
          setIsCatFound(true);
        })

        .catch(error => console.log("error", error));
    }
  };


  const {getRootProps, getInputProps} = useDropzone({
    accept: "image/jpeg, image/png",
    onDrop: (acceptedFiles) => {
      setSelectedFile(acceptedFiles[0]);
    },
  });

  // const closePopup = () => {
  //   console.log("Button clicked");
  //   setPopupOpen(false);
  // };
  // if (!isPopupOpen) {
  //   return null;
  // }


  return (
    <>
      <BlurOverlay>
        <div className="container_upload">
          <main className="main_upload">
            <Link to={"/gallery"}>
              {/*<Button padding="10px 8px" content={"X"} onClick={closePopup}/>*/}
              <Button padding="10px 8px" content={"X"}/>
            </Link>
            <div className="text_upload">
              <h4>Upload a .jpg or .png Cat Image</h4>
              <p>
                Any uploads must comply with the{" "}
                <Link to="https://thecatapi.com/privacy">upload guidelines</Link>{" "}
                or face deletion.
              </p>
            </div>

            <div {...getRootProps()} className="upload_img">
              <input {...getInputProps()} />
              <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200" fill="none">
                <path
                  d="M140 40C128.954 40 120 48.9543 120 59.9999C120 71.0456 128.954 79.9999 140 79.9999C151.046 79.9999 160 71.0456 160 59.9999C160 48.9543 151.046 40 140 40Z"
                  fill="#F8F8F7"/>
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M0 20C0 8.9543 8.9543 0 20 0H180C191.046 0 200 8.9543 200 20V180C200 181.38 199.86 182.729 199.594 184.031C199.199 185.958 198.528 187.784 197.623 189.465C194.247 195.737 187.621 200 180 200H20C8.95431 200 0 191.046 0 180V20ZM64.6564 41.8952L60 37.2387L13.3333 83.9054V20C13.3333 16.3181 16.3181 13.3333 20 13.3333H180C183.682 13.3333 186.667 16.3181 186.667 20V133.333H156.095L64.7145 41.9526C64.6953 41.9333 64.6759 41.9142 64.6564 41.8952Z"
                      fill="#F8F8F7"/>
              </svg>
              <p><span>Drag here</span> your file or<span> Click here</span> to upload</p>
              {selectedFile && (
                <div className="selected-file">
                  <img className="img_main" src={URL.createObjectURL(selectedFile)} alt="Selected"/>
                </div>
              )}
            </div>
            {!selectedFile ? (
              <p className="no_file">No file selected</p>
            ) : (
              <p className="no_file">Selected file: {selectedFile.name}</p>
            )}
            {/*<div className="btn_upload">*/}
            {/*  <Button padding={"12px 28px"} content={"UPLOAD PHOTO"} onClick={handleUploadPhoto} />*/}
            {/*</div>*/}
            {selectedFile && !isCatFound ? (
              <button onClick={handleUploadPhoto} type="submit">UPLOAD PHOTO</button>
            ) : null}
            {isCatFound && (
              <div className="found_upload">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd"
                        d="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10ZM10 1.33333C5.21353 1.33333 1.33333 5.21353 1.33333 10C1.33333 14.7865 5.21353 18.6667 10 18.6667C14.7865 18.6667 18.6667 14.7865 18.6667 10C18.6667 5.21353 14.7865 1.33333 10 1.33333ZM15.1872 7.08313L9.42904 14.2809L4.90654 10.5121L5.76012 9.48785L9.23763 12.3858L14.1461 6.2502L15.1872 7.08313Z"
                        fill="#97EAB9"/>
                </svg>
                <p>Thanks for the Upload - Cat found!</p>
              </div>
            )}


          </main>
        </div>
      </BlurOverlay>
    </>
  );
};

export default UploadPhoto;
