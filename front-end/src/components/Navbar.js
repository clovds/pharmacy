import { ClickAwayListener } from "@material-ui/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "../assets/icons/medicine.svg";
import { logoutAction, searchProductAction } from "../redux/actions";

export const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profile, setProfile] = useState(false);
  const [notif, setNotif] = useState(false);
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const logoutBtn = () => {
    setProfile(false);
    dispatch(logoutAction());
  };

  const loginBtn = () => {
    return (
      <ul class="flex items-center hidden space-x-5 lg:flex">
        <li>
          <Link to="/login">
            <p
              aria-label="Sign in"
              title="Sign in"
              class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-blue-500"
            >
              Sign in
            </p>
          </Link>
        </li>
        <li>
          <Link to="/signup">
            <p
              class="inline-flex items-center justify-center h-9 px-4 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-blue-500 hover:bg-blue-700 focus:shadow-outline focus:outline-none"
              aria-label="Sign up"
              title="Sign up"
            >
              Sign up
            </p>
          </Link>
        </li>
      </ul>
    );
  };

  const profileBtn = () => {
    return (
      <div class="relative inline-block text-left focus:border-none ">
        <div>
          <button
            onClick={() => setProfile(!profile)}
            type="button"
            class="transition duration-300 inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100"
            id="options-menu"
            aria-expanded="true"
            aria-haspopup="true"
          >
            {user.user_username}
            <svg
              class="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
        {profile ? (
          <ClickAwayListener onClickAway={handleClickAway}>
            <div
              class="z-10 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <div class="py-1" role="none">
                <p
                  className="transition duration-200 font-semibold block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-blue-500 cursor-pointer"
                  role="menuitem"
                >
                  Account settings
                </p>
                <p
                  className="transition duration-200 font-semibold block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-blue-500 cursor-pointer"
                  role="menuitem"
                >
                  Transaction
                </p>
                <p
                  className="transition duration-200 font-semibold block w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-blue-500 cursor-pointer"
                  onClick={logoutBtn}
                >
                  Sign Out
                </p>
              </div>
            </div>
          </ClickAwayListener>
        ) : null}
      </div>
    );
  };

  const handleClickAway = () => {
    setProfile(false);
    setNotif(false);
  };

  const notificationBtn = () => {
    return (
      <div
        className="mr-5 relative align-middle rounded-md focus:outline-none focus:shadow-outline-purple"
        onClick={() => setNotif(!notif)}
        aria-label="Notifications"
        aria-haspopup="true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="text-gray-700 w-7 h-7 cursor-pointer hover:text-blue-400 hover:bg-gray-200 rounded-2xl focus:bg-gray-200"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {/* <!-- Notification badge --> */}
        <span
          aria-hidden="true"
          className="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full dark:border-gray-800"
        ></span>
        {notif ? (
          <ClickAwayListener onClickAway={handleClickAway}>
            <div
              class="z-10 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <div class="py-1" role="none">
                <p className="transition duration-200 font-semibold block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-blue-500 cursor-pointer">
                  Notif 1
                </p>
                <p className="transition duration-200 font-semibold block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-blue-500 cursor-pointer">
                  Notif 2
                </p>
                <p className="transition duration-200 font-semibold block w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-blue-500 cursor-pointer">
                  Notif 3
                </p>
              </div>
            </div>
          </ClickAwayListener>
        ) : null}
      </div>
    );
  };

  const rightComponent = () => {
    return (
      <div className="flex flex-row items-center">
        {notificationBtn()}
        {profileBtn()}
      </div>
    );
  };

  const searchComponent = () => {
    return (
      <form
        className="bg-white shadow flex rounded-xl border border-gray-50 focus:border-transparent"
        onSubmit={searchBtn}
      >
        <input
          className="w-96 rounded-lg focus:outline-none focus:ring-blue-100 focus:ring-4 pl-3 font-semibold text-gray-700 transition duration-300"
          type="text"
          placeholder="Search antacids"
          onChange={(e) => setName(e.target.value)}
        />
        <span className="w-auto flex justify-end items-center text-gray-500 p-1 hover:bg-blue-100 rounded-xl transition duration-300">
          <i
            className="material-icons text-2xl cursor-pointer"
            onClick={searchBtn}
          >
            search
          </i>
        </span>
      </form>
    );
  };

  const searchBtn = (e) => {
    e.preventDefault();
    dispatch(searchProductAction(name));
  };

  return (
    <div class="px-4 py-2 sm:max-w-xl md:max-w-full md:px-24 lg:px-8 shadow p-4">
      <div class="relative flex items-center justify-between">
        <div class="flex items-center">
          <Link
            to="/"
            href="/"
            aria-label="Company"
            title="Company"
            class="inline-flex items-center mr-8"
          >
            <img src={Logo} alt="" className="w-10 h-10" />
            <span class="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
              Pharma
            </span>
          </Link>
          <ul class="flex items-center hidden space-x-8 lg:flex">
            <li>
              <Link
                to="/product"
                aria-label="Our product"
                title="Our product"
                class="font-medium tracking-wide text-gray-700 transition-colors duration-300 hover:text-blue-500"
              >
                Product
              </Link>
            </li>
          </ul>
        </div>
        {searchComponent()}
        {user.user_id === 0 ? loginBtn() : rightComponent()}
        <div class="lg:hidden">
          <button
            aria-label="Open Menu"
            title="Open Menu"
            class="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
            onClick={() => setIsMenuOpen(true)}
          >
            <svg class="w-5 text-gray-600" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
              />
              <path
                fill="currentColor"
                d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
              />
              <path
                fill="currentColor"
                d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
              />
            </svg>
          </button>
          {isMenuOpen && (
            <div class="absolute top-0 left-0 w-full">
              <div class="p-5 bg-white border rounded shadow-sm">
                <div class="flex items-center justify-between mb-4">
                  <div>
                    <a
                      href="/"
                      aria-label="Company"
                      title="Company"
                      class="inline-flex items-center"
                    >
                      <svg
                        class="w-8 text-blue-500"
                        viewBox="0 0 24 24"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeMiterlimit="10"
                        stroke="currentColor"
                        fill="none"
                      >
                        <rect x="3" y="1" width="7" height="12" />
                        <rect x="3" y="17" width="7" height="6" />
                        <rect x="14" y="1" width="7" height="6" />
                        <rect x="14" y="11" width="7" height="12" />
                      </svg>
                      <span class="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                        Company
                      </span>
                    </a>
                  </div>
                  <div>
                    <button
                      aria-label="Close Menu"
                      title="Close Menu"
                      class="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg class="w-5 text-gray-600" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <nav>
                  <ul class="space-y-4">
                    <li>
                      <a
                        href="/"
                        aria-label="Our product"
                        title="Our product"
                        class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-blue-500"
                      >
                        Product
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        aria-label="Our product"
                        title="Our product"
                        class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-blue-500"
                      >
                        Features
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        aria-label="Product pricing"
                        title="Product pricing"
                        class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-blue-500"
                      >
                        Pricing
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        aria-label="About us"
                        title="About us"
                        class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-blue-500"
                      >
                        About us
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        aria-label="Sign in"
                        title="Sign in"
                        class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-blue-500"
                      >
                        Sign in
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        class="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                        aria-label="Sign up"
                        title="Sign up"
                      >
                        Sign up
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
