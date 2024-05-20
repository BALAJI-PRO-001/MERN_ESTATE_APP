import { useDispatch, useSelector } from "react-redux";
import { profileConfig } from "../utils/AppConfigs.js";
import UserInterface from "../utils/UserInterface.js";
import Validator from "../utils/Validator.js";
import CommonFunction from "../utils/CommonFunctions.js";
import { useRef, useState, useEffect } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "../utils/firebase.js";
import { 
  updateUserStart, 
  updateUserSuccess, 
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure
} from "../redux/user/userSlice.js";


const ui = new UserInterface();
const commonFunction = new CommonFunction();
const validator = new Validator();



export default function Profile() {
  const { currentUser, loading } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const [boolean, setBoolean] = useState(true);
  const [message, setMessage] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [imgUploadMessage, setImgUploadMessage] = useState("");


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


  function onInputHandler(event) {
    if (event.target.id === "userName") 
    setBoolean(validator.isvalidName(event.target));

    if (event.target.id === "email")
    setBoolean(validator.isvalidEmail(event.target));

    if (event.target.id === "password") 
    setBoolean(validator.isvalidPassword(event.target));

  }


  async function handleSubmit(event) {
    event.preventDefault();
    const emailInput = event.target.parentElement.querySelector("#email");

  
    if (boolean && !fileUploadError) {
      try {
        dispatch(updateUserStart());
        const res = await fetch(`/api/user/update/${currentUser._id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });

        const data = await res.json();
        if (data.statusCode === 409) {
          dispatch(updateUserFailure());
          const errorElement = commonFunction.getSibling(emailInput, "p");
          ui.setBorder(emailInput, ui.BORDER_1PX_RED);
          ui.setMessage(errorElement, "Email address is already in use. Please try another email . . . .");
          return;
        }

        if (data.statusCode === 401) {
          setErrMessage(data.message);
          dispatch(updateUserFailure());
          return;
        }

        dispatch(updateUserSuccess(data));
        setMessage("Profile updated successfully")
        setTimeout(() => {
          setMessage("");
        }, 2000);

      } catch(error) {
        setErrMessage(error.message);
      }
    } 

  }


  async function handleDeleteUser() {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (data.success === false) {
        setErrMessage(data.message);
        dispatch(deleteUserFailure());
        return;
      }

      dispatch(deleteUserSuccess());
    } catch (error) {
      setErrMessage(error.message);
    }

  }


  async function handleSignOut() {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signOut",{
        method: "GET"
      });
  
      const data = await res.json();
      if (data.success === false) {
        setErrMessage(data.message);
        dispatch(signOutUserFailure());
        return;
      }
  
      dispatch(signOutUserSuccess());
    } catch (error) {
      dispatch(signOutUserFailure());
      setErrMessage(error.message);
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
        setImgUploadMessage("Image successfully uploaded!");
        setTimeout(() => {
          setImgUploadMessage("");
        }, 2000);
      }
    );
  }


  function onChangeHandler(event) {
    setFormData({
      ...formData, 
      [event.target.id]: event.target.value.trim(),
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
        <p className="text-sm self-center mt-1">
          {
            fileUploadError ? <span className="text-red-600 font-semibold">ERROR: The image must be less than 2MB!</span> :
            progress > 0 && progress < 100 ? <span className="text-slate-700 font-semibold">{`Uploading: ${progress}%`}</span> :
            progress === 100 ? <span className="text-green-600 font-semibold">{imgUploadMessage}</span> : ""
          }
          {errMessage && <span className="text-red-600 font-semibold text-1xl">{`ERROR: ${errMessage} (Access Denied)`}</span>}
          {message && <span className="text-green-600 font-semibold text-1xl">{message}</span>}
        </p>
        {profileConfig.map((config) => {
          return (
            <div className="h-70 relative" key={config.id}>
              <input
                type={config.type}
                id={config.id}
                placeholder={config.placeholder}
                className="border p-3 rounded-lg pl-10 focus:border-green-600 focus:outline-none w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
                onChange={onChangeHandler}
                onInput={onInputHandler}
                defaultValue={
                  config.id == "userName" ? currentUser.userName : "" ||
                  config.id == "email" ? currentUser.email : ""
                }
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
          className="bg-slate-700 text-white p-3 mt-3 rounded-lg hover:opacity-95 disabled:opacity-80  tracking-wider font-semibold"
          onClick={handleSubmit}
          disabled={loading && boolean}
        >
          {loading ? "LOADING . . . " : "UPDATE"}
        </button>
      </form>
      <div className="flex justify-between gap-2 mt-2">
        <span 
          className="font-semibold p-3 bg-red-600 rounded-lg text-white cursor-pointe w-1/2 text-center hover:opacity-90 tracking-wider"
          onClick={handleDeleteUser}
          >
            Delete Account
        </span>
        <span 
          className="font-semibold p-3 bg-red-600 rounded-lg text-white cursor-pointer w-1/2 text-center hover:opacity-90 tracking-wider"
          onClick={handleSignOut}
        >
          Sign out
        </span>
      </div>
      <button
          className="font-semibold bg-green-700 text-white p-3 mt-2 rounded-lg hover:opacity-95 disabled:opacity-80 w-full tracking-wider"
          // onClick={handleSubmit}
          // disabled={loading}
        >
          Create Listing
        </button>
      <button
          className="font-semibold bg-green-700 text-white p-3 mt-2 rounded-lg hover:opacity-95 disabled:opacity-80 w-full tracking-wider"
          // onClick={handleSubmit}
          // disabled={loading}
        >
          Show Listings
        </button>
    </div>
  );
}
