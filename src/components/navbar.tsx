import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import "../App.css";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const signUserOut = async () => {
    await signOut(auth);
  };

  return (
    <div className="navbar">
      <div className="links">
        <Link to="/" className="m-2">
          Home
        </Link>
        <Link to="/login">Login</Link>
      </div>

      <div className="user font-bold">
        {user && (
          <>
            <p>{user?.displayName}</p>
            <img
              className="w-10 h-10 rounded-full"
              src={user?.photoURL || ""}
              alt="Rounded avatar"
            ></img>
            <button
              onClick={signUserOut}
              type="button"
              className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-4 mb-2"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
