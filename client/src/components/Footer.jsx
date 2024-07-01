import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-slate-200 py-6 px-10 border border-slate-300">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <div className="w-full md:w-1/2 text-center md:text-left mb-4 md:mb-0">
          <p className="text-[15px] font-semibold text-slate-700">&copy; {new Date().getFullYear()} Balaji Estate App. All rights reserved.</p>
          <p className="mt-1 font-semibold text-slate-700">Built with MERN stack by Balaji</p>
          <p className="mt-1 font-semibold text-slate-700">Contact: <Link className="hover:text-blue-700" to={`mailto:balajibr0000@gmail.com?subject=Hi Balaji&body=`}>balajibr0000@gmail.com</Link></p>
        </div>
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <ul className="flex space-x-4">
            <Link to="/" className="text-slate-700 font-semibold hover:text-blue-700">Home</Link>
            <Link to="/about" className="text-slate-700 font-semibold hover:text-blue-700">About</Link>
            <Link to="/account" className="text-slate-700 font-semibold hover:text-blue-700">Account</Link>
          </ul>
        </div>
      </div>
    </footer>
  );
}

