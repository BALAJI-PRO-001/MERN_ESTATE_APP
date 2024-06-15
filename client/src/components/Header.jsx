import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3"> 
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap hover:text-blue-700 cursor-pointer">
            <span className="text-slate-500">Balaji</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>
        <form className="bg-slate-100 p-3 rounded-lg gap-2 flex items-center border border-slate-300">
          <input 
            type="text" placeholder="Search . . . ." 
            className="bg-transparent focus:outline-none w-24 sm:w-64 font-semibold" 
            onFocus={(event) => {
              console.log(event.target.parentElement);
              event.target.parentElement.classList.add("border-green-600");
            }}
            onBlur={(event) => {
              event.target.parentElement.classList.remove("border-green-600");
              event.target.parentElement.classList.add("border-slate-300");
            }}
          />
          <FaSearch className="text-slate-600"></FaSearch>
        </form>
        <ul className="flex gap-4">
          <Link to="/"><li className="hidden sm:inline text-slate-700 font-bold hover:text-blue-700 cursor-pointer">Home</li></Link>
          <Link to="/about"><li className="hidden sm:inline text-slate-700 font-bold hover:text-blue-700 cursor-pointer">About</li></Link>
          <Link to="/account">
            {
              currentUser ? <img className="w-7 h-7 rounded-full object-cover" src={currentUser.avatar} alt="profile" />
              : <li className="sm:inline text-slate-700 font-bold hover:text-blue-700 cursor-pointer">Sign In</li>
            }
          </Link>
        </ul>
      </div>
    </header>
  );
}
