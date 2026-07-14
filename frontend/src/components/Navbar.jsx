import React from "react"
import { User, Code, LogOut } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link, NavLink } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const Navbar = () => {

  const { authUser } = useAuthStore()

  console.log("AUTH_USER", authUser)

  return (
    <nav className="sticky top-0 z-50 w-full bg-gray-900/80 backdrop-blur-md border-b border-gray-800/80 px-6 py-4">
      <div className="flex w-full justify-between items-center mx-auto max-w-7xl">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3 cursor-pointer shrink-0 transition-transform duration-200 hover:scale-[1.02]">
          <img src="/leetlab.svg" className="h-10 w-10 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 p-1 rounded-xl" />
          <span className="text-xl font-bold tracking-tight text-white hidden md:block">
            Leetlab
          </span>
        </Link>

        {/* Center Tabs */}
        <div className="flex items-center gap-2 sm:gap-4">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 px-3.5 py-2 rounded-xl cursor-pointer ${
                isActive
                  ? "text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 shadow-sm shadow-indigo-500/5"
                  : "text-gray-400 hover:text-white hover:bg-gray-800/50"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/problems"
            className={({ isActive }) =>
              `text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 px-3.5 py-2 rounded-xl cursor-pointer ${
                isActive
                  ? "text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 shadow-sm shadow-indigo-500/5"
                  : "text-gray-400 hover:text-white hover:bg-gray-800/50"
              }`
            }
          >
            Problems
          </NavLink>
          <NavLink
            to="/playlists"
            className={({ isActive }) =>
              `text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 px-3.5 py-2 rounded-xl cursor-pointer ${
                isActive
                  ? "text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 shadow-sm shadow-indigo-500/5"
                  : "text-gray-400 hover:text-white hover:bg-gray-800/50"
              }`
            }
          >
            My Playlists
          </NavLink>
        </div>

        {/* User Profile and Dropdown */}
        <div className="flex items-center gap-8 shrink-0">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar flex flex-row ">
              <div className="w-10 rounded-full ">
                <div className="flex items-center justify-center w-10 h-10 bg-slate-100 rounded-full border border-slate-200 overflow-hidden">
                  {authUser?.image ? (
                    <img
                      src={authUser.image}
                      alt="User Avatar"
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <User className="w-5 h-5 text-slate-500" />
                  )}
                </div>
              </div>

            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-2xl bg-gray-800 border border-gray-700/50 rounded-box w-52 space-y-2 text-gray-200"
            >
              {/* Common Options */}
              <li>
                <p className="text-base font-semibold text-white">
                  {authUser?.name}
                </p>
                <hr className="border-gray-700/50" />
              </li>
              <li>
                <Link
                  to="/profile"
                  className="hover:bg-indigo-600 hover:text-white text-base font-semibold transition-colors duration-150 rounded-xl"
                >
                  <User className="w-4 h-4 mr-2" />
                  My Profile
                </Link>
              </li>
              {authUser?.role === "ADMIN" && (
                <li>
                  <Link
                    to="/add-problem"
                    className="hover:bg-indigo-600 hover:text-white text-base font-semibold transition-colors duration-150 rounded-xl"
                  >
                    <Code className="w-4 h-4 mr-1" />
                    Add Problem
                  </Link>
                </li>
              )}
              <li>
                <LogoutButton className="hover:bg-red-600 hover:text-white text-base font-semibold transition-colors duration-150 rounded-xl">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </LogoutButton>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}


export default Navbar;