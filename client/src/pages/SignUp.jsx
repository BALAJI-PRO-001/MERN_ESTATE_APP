import { useState } from "react";
import { Link } from "react-router-dom";
import UserInterface from "../utils/UserInterface.js";
import CommonFunction from "../utils/CommonFunctions.js";
import Validator from "../utils/Validator.js";
import { signupConfig } from "../utils/AppConfigs.js";

 
const ui = new UserInterface();
const commonFunction = new CommonFunction();
const validator = new Validator();


export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function setIcon(event) {
    ui.setIcon(
      event.target,
      "/images/icons/eye-close-icon.png",
      "/images/icons/eye-open-icon.png"
    );
    commonFunction.setType(
      commonFunction.getSibling(event.target, "input"),
      "text", "password"
    );
  }

  function onInputHandler(event) {
    setFormData({
      ...formData, 
      [event.target.id]: event.target.value,
    });
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

      if (inputElement.id === "password") {
        const boolean = validator.isvalidPassword(inputElement);
        boolean ? setPassword(inputElement.value) : "";
        booleans.push(boolean);
      }

      if (inputElement.id === "confirmPassword")
        booleans.push(validator.isvalidConfirmPassword(inputElement, password));
    }

    if (commonFunction.isTrue(booleans)) {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.message);
        setLoading(false);
      }
      setLoading(false);
      console.log(data);
    }
    
  }


  function onBlurHandler(event) {
    const inputElement = event.target;
    if (inputElement.id === "userName") 
      validator.isvalidName(inputElement);

    if (inputElement.id === "email")
      validator.isvalidEmail(inputElement);

    if (inputElement.id === "password") {
      const boolean = validator.isvalidPassword(inputElement);
      boolean ? setPassword(inputElement.value) : "";
    }

    if (inputElement.id === "confirmPassword")
      validator.isvalidConfirmPassword(inputElement, password);
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1
        className="text-3xl text-center font-semibold my-7 mb-2"
        style={{ fontFamily: "fantasy" }}
      >
        Sign Up
      </h1>

      <form className="flex flex-col">
        {signupConfig.map((inputConfig) => {
          return (
            <div className="h-70 relative" key={inputConfig.id}>
              <input
                type={inputConfig.type}
                id={inputConfig.id}
                placeholder={inputConfig.placeholder}
                className="border p-3 rounded-lg pl-10 focus:outline-none w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
                onChange={onInputHandler}
                onBlur={onBlurHandler}
              />
              <img
                src={inputConfig.imgSrc[0]}
                alt="user-name-icon"
                className="h-5 w-5 absolute top-1/2 left-6 transform -translate-x-1/2 -translate-y-1/2 "
              />
              {inputConfig.imgSrc[1] && (
                <img
                  src={inputConfig.imgSrc[1]}
                  alt="user-name-icon"
                  className="h-5 w-5 absolute top-1/2 right-3 transform -translate-x-1/2 -translate-y-1/2 "
                  onClick={setIcon}
                />
              )}
              <p 
                className="text-sm text-red-600 font-semibold absolute top-12 transform-translate-x-1/2" 
                style={{marginTop: "10px"}}
              ></p>
            </div>
          );
        })}

        <button
          className="bg-slate-700 text-white p-3 mt-4 rounded-lg hover:opacity-95 disabled:opacity-80"
          style={{ fontFamily: "fantasy" }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "LOADING . . . " : "SIGN UP"}
        </button>
        <div className="flex gap-2 mt-3 m-auto font-semibold">
          <p>Have an account?</p>
          <Link to="/signin">
            <span className="text-blue-600">Sign in</span>
          </Link>
        </div>
        <a href=""></a>
      </form>
    </div>
  );
}