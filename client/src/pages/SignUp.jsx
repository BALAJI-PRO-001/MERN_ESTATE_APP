import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1
        className="text-3xl text-center font-semibold my-7"
        style={{ fontFamily: "fantasy" }}
      >
        Sign Up
      </h1>
      <form action="" className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username . . . ."
          className="border p-3 rounded-lg"
          id="username"
        />
        <input
          type="text"
          placeholder="email . . . ."
          className="border p-3 rounded-lg"
          id="username"
        />
        <input
          type="text"
          placeholder="create-password . . . ."
          className="border p-3 rounded-lg"
          id="username"
        />
        <input
          type="text"
          placeholder="confirm-password . . . ."
          className="border p-3 rounded-lg"
          id="username"
        />
        <button 
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          style={{ fontFamily: "fantasy" }}
        >
          Sign up
        </button>
      </form>
      <div className="flex gap-2 font-semibold mt-5 justify-center">
        <p>Have an account?</p>
        <span className="text-blue-700">Sign in</span>
      </div>
    </div>
  );
}
