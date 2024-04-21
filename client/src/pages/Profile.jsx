import { useSelector } from "react-redux";
import { profileConfig } from "../utils/AppConfigs.js";
import UserInterface from "../utils/UserInterface.js";
import Validator from "../utils/Validator.js";
import CommonFunction from "../utils/CommonFunctions.js";

const ui = new UserInterface();
const commonFunction = new CommonFunction();
const validator = new Validator();

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);

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

  return (
    <div className="p-3 max-w-lg mx-auto">
      <form className="flex flex-col">
        <img
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-4"
          src={currentUser.avatar}
          alt="profile"
        />
        {profileConfig.map((config) => {
          return (
            <div className="h-70 relative" key={config.id}>
              <input
                type={config.type}
                id={config.id}
                placeholder={config.placeholder}
                className="border p-3 rounded-lg pl-10 focus:border-blue-600 focus:outline-none w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
                // onChange={onInputHandler}
                // onBlur={onBlurHandler}
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
          className="bg-slate-700 text-white p-3 mt-4 rounded-lg hover:opacity-95 disabled:opacity-80"
          style={{ fontFamily: "sans-serif" }}
          // onClick={handleSubmit}
          // disabled={loading}
        >
          UPDATE
        </button>
      </form>
      <div className="flex justify-between gap-3 mt-2">
        <span className="font-semibold p-3 bg-red-600 rounded-lg text-white cursor-pointe w-1/2 text-center">
          Delete Account
        </span>
        <span className="font-semibold p-3 bg-red-600 rounded-lg text-white cursor-pointer w-1/2 text-center">
          Sign out
        </span>
      </div>
    </div>
  );
}
