import { GoogleAuthProvider, getAuth, signInWithPopup } from "@firebase/auth";
import { app } from "../utils/firebase.js";

export default function OAuth() {

  async function handleGoogleAuth() {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app); 

      const result = await signInWithPopup(auth, provider);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <button 
      type="button"
      className="bg-red-700 text-white p-3 mt-2 rounded-lg hover:opacity-95"
      style={{ fontFamily: "sans-serif" }}
      onClick={handleGoogleAuth}
    >
      CONTINUE WITH GOOGLE
    </button>
  );
}