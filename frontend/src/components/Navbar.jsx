import React from "react"
import { User, Code, LogOut } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link, NavLink } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const Navbar = () => {

  const { authUser } = useAuthStore()

  console.log("AUTH_USER", authUser)

  return (
    <nav className="sticky top-0 z-50 w-full py-5">
      <div className="flex w-full justify-between items-center mx-auto max-w-4xl bg-black/15 shadow-lg shadow-neutral-600/5 backdrop-blur-lg border border-gray-200/10 p-4 rounded-2xl">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3 cursor-pointer shrink-0">
          <img src="/leetlab.svg" className="h-12 w-12 bg-primary/20 text-primary border-none p-1 rounded-full" />
          <span className="text-lg md:text-2xl font-bold tracking-tight text-white hidden md:block">
            Leetlab
          </span>
        </Link>

        {/* Center Tabs */}
        <div className="flex items-center gap-1 sm:gap-3">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 px-2.5 py-1.5 rounded-xl cursor-pointer ${
                isActive
                  ? "text-primary bg-primary/10 border-b border-primary/20"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800/30"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/problems"
            className={({ isActive }) =>
              `text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 px-2.5 py-1.5 rounded-xl cursor-pointer ${
                isActive
                  ? "text-primary bg-primary/10 border-b border-primary/20"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800/30"
              }`
            }
          >
            Problems
          </NavLink>
          <NavLink
            to="/playlists"
            className={({ isActive }) =>
              `text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 px-2.5 py-1.5 rounded-xl cursor-pointer ${
                isActive
                  ? "text-primary bg-primary/10 border-b border-primary/20"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800/30"
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
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 space-y-3"
            >
              {/* Admin Option */}


              {/* Common Options */}
              <li>
                <p className="text-base font-semibold">

                  {authUser?.name}

                </p>
                <hr className="border-gray-200/10" />
              </li>
              <li>
                <Link
                  to="/profile"
                  className="hover:bg-primary hover:text-white text-base font-semibold"
                >
                  <User className="w-4 h-4 mr-2" />
                  My Profile
                </Link>
              </li>
              {authUser?.role === "ADMIN" && (
                <li>
                  <Link
                    to="/add-problem"
                    className="hover:bg-primary hover:text-white text-base font-semibold"
                  >
                    <Code className="w-4 h-4 mr-1" />
                    Add Problem
                  </Link>
                </li>
              )}
              <li>
                <LogoutButton className="hover:bg-primary hover:text-white">
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