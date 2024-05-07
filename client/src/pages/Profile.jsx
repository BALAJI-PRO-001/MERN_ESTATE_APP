import { useSelector } from "react-redux";
import { profileConfig } from "../utils/AppConfigs.js";
import UserInterface from "../utils/UserInterface.js";
import Validator from "../utils/Validator.js";
import CommonFunction from "../utils/CommonFunctions.js";
import { useRef, useState, useEffect } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "../utils/firebase.js";

const ui = new UserInterface();
const commonFunction = new CommonFunction();
const validator = new Validator();


export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
 

  function setIcon(event) {
    ui.setIcon(
      event.target,
      "/images/icons/eye-close-icon.png",
      "/images/icons/eye-open-icon.png"
    );
    commonFunction.setType(
      commonFunction.getSibling(event.target, "input"),
      "text",
      "password"
    );
  }


  function onBlurHandler(event) {
    const inputElement = event.target;
    if (inputElement.id === "userName") 
      validator.isvalidName(inputElement);

    if (inputElement.id === "email")
      validator.isvalidEmail(inputElement);

    if (inputElement.id === "password") 
      validator.isvalidPassword(inputElement);
  }


  async function handleSubmit(event) {
    event.preventDefault();
    const inputElements = commonFunction.getSiblings(event.target, "input");
    const booleans = [];

    for (let inputElement of inputElements) {
      if (inputElement.id === "userName") 
        booleans.push(validator.isvalidName(inputElement));

      if (inputElement.id === "email")
        booleans.push( validator.isvalidEmail(inputElement));

      if (inputElement.id === "password")
        booleans.push(validator.isvalidPassword(inputElement));
    }
     
  }


  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);


  function handleFileUpload(file) {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed", 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(Math.round(progress));
        setFileUploadError(false);
      },
      () => { // error 
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            setFormData((formData) => {
              return {...formData, avatar: downloadURL}
            });
          });
      }
    );
  }


  function onInputHandler(event) {
    setFormData({
      ...formData, 
      [event.target.id]: event.target.value,
    });
  } 
  
  return (
    <div className="p-3 max-w-lg mx-auto">
      <form className="flex flex-col relative">
        <input type="file" ref={fileRef} hidden onChange={(event) => setFile(event.target.files[0])}/>
        <img
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-4"
          src={ formData.avatar || currentUser.avatar}
          alt="profile"
          onClick={() => fileRef.current.click()}
        />
        <img 
          className="h-14 w-14 absolute self-center top-10 ml-2"
          src="/images/icons/image-upload-icon.png"
          alt="icon"
          hidden
        />
        <p className="text-sm self-center">
          {
            fileUploadError ? <span className="text-red-600 font-semibold">ERROR: The image must be less than 2MB!</span> :
            progress > 0 && progress < 100 ? <span className="text-slate-700 font-semibold">{`Uploading: ${progress}%`}</span> :
            progress === 100 ? <span className="text-green-600 font-semibold">Image successfully uploaded!</span> : ""
          }
        </p>
        {profileConfig.map((config) => {
          return (
            <div className="h-70 relative" key={config.id}>
              <input
                type={config.type}
                id={config.id}
                placeholder={config.placeholder}
                className="border p-3 rounded-lg pl-10 focus:border-green-600 focus:outline-none w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
                onChange={onInputHandler}
                onBlur={onBlurHandler}
              />
              <img
                src={config.imgSrc[0]}
                alt="icon"
                className="h-5 w-5 absolute top-1/2 left-6 transform -translate-x-1/2 -translate-y-1/2 "
              />
              {config.imgSrc[1] && (
                <img
                  src={config.imgSrc[1]}
                  alt="icon"
                  className="h-5 w-5 absolute top-1/2 right-3 transform -translate-x-1/2 -translate-y-1/2 "
                  onClick={setIcon}
                />
              )}
              <p
                className="text-sm text-red-600 font-semibold absolute top-12 transform-translate-x-1/2"
                style={{ marginTop: "10px" }}
              ></p>
            </div>
          );
        })}
        <button
          className="bg-slate-700 text-white p-3 mt-3 rounded-lg hover:opacity-95 disabled:opacity-80"
          style={{ fontFamily: "sans-serif" }}
          onClick={handleSubmit}
          // disabled={loading}
        >
          UPDATE
        </button>
      </form>
      <div className="flex justify-between gap-2 mt-2">
        <span className="font-semibold p-3 bg-red-600 rounded-lg text-white cursor-pointe w-1/2 text-center hover:opacity-90">
          Delete Account
        </span>
        <span className="font-semibold p-3 bg-red-600 rounded-lg text-white cursor-pointer w-1/2 text-center hover:opacity-90">
          Sign out
        </span>
      </div>
      <button
          className="bg-green-700 text-white p-3 mt-2 rounded-lg hover:opacity-95 disabled:opacity-80 w-full"
          style={{ fontFamily: "sans-serif" }}
          // onClick={handleSubmit}
          // disabled={loading}
        >
          Create Listing
        </button>
      <button
          className="bg-green-700 text-white p-3 mt-2 rounded-lg hover:opacity-95 disabled:opacity-80 w-full"
          style={{ fontFamily: "sans-serif" }}
          // onClick={handleSubmit}
          // disabled={loading}
        >
          Show Listings
        </button>
    </div>
  );
}
