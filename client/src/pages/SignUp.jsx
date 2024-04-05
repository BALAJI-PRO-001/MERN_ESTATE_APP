import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({});

  function onInputHandler() {}

  return (
    //   <div className="p-3 max-w-lg mx-auto">
    //     <h1
    //       className="text-3xl text-center font-semibold my-7"
    //       style={{ fontFamily: "fantasy" }}
    //     >
    //       Sign Up
    //     </h1>
    //     <form action="" className="flex flex-col gap-4">
    //       <input
    //         type="text"
    //         placeholder="Username . . . ."
    //         className="border p-3 rounded-lg foucs:outline-none"
    //         id="username"
    //       />
    //       <input
    //         type="text"
    //         placeholder="Email . . . ."
    //         className="border p-3 rounded-lg"
    //         id="email"
    //       />
    //       <input
    //         type="text"
    //         placeholder="Create password . . . ."
    //         className="border p-3 rounded-lg"
    //         id="username"
    //       />
    //       <input
    //         type="text"
    //         placeholder="Confirm password . . . ."
    //         className="border p-3 rounded-lg"
    //         id="username"
    //       />
    //       <button
    //         className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
    //         style={{ fontFamily: "fantasy" }}
    //       >
    //         Sign up
    //       </button>
    //     </form>
    //     <div className="flex gap-2 font-semibold mt-5 justify-center">
    //       <p>Have an account?</p>
    //       <Link to="/sign-in"><span className="text-blue-700">Sign in</span></Link>
    //     </div>
    //   </div>
    // );

    <div className="p-3 max-w-lg mx-auto">
      <h1
        className="text-3xl text-center font-semibold my-7"
        style={{ fontFamily: "fantasy" }}
      >
        Sign Up
      </h1>

      <form className="flex flex-col gap-4">
        <div>
          <input
            type="text"
            id="userName"
            placeholder="Username . . . ."
            className="border p-3 rounded-lg focus:outline-none w-full"
          />
        </div>

        <div>
          <input
            type="text"
            id="email"
            placeholder="Email . . . ."
            className="border p-3 rounded-lg focus:outline-none w-full"
          />
        </div>

        <div className="flex flex-col">
          <input
            type="text"
            id="password"
            placeholder="Password . . . ."
            className="border p-3 rounded-lg focus:outline-none w-full"
          />
          {/* <img 
            src="/images/icons/email-icon.png" 
            alt="email-icon"
            className="align-center w-5 h-5 "
          /> */}
          <p>err</p>
        </div>

        <div className="flex">
          <input
            type="text"
            id="confirmPassword"
            placeholder="Confirm Password . . . ."
            className="border p-3 rounded-lg focus:outline-none w-full"
          />
          {/* <img 
            src="/images/icons/email-icon.png" 
            alt="email-icon"
            className="align-center w-5 h-5 "
          /> */}
        </div>

        <button
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          style={{ fontFamily: "fantasy" }}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
