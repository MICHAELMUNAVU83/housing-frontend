import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
const NavBar = ({ setStoredToken }) => {
  const [nav, setNav] = useState(false);
  const [color, setColor] = useState("black");
  const [textColor, setTextColor] = useState("white");
  const navigate = useNavigate();

  useEffect(() => {
    const changeBackground = () => {
      if (window.scrollY >= 80) {
        setColor("white");
        setTextColor("black");
      } else {
        setColor("black");
        setTextColor("white");
      }
    };
    window.addEventListener("scroll", changeBackground);
  }, []);

  const toggleNav = () => {
    setNav(!nav);
  };
  return (
    <div
      style={{ backgroundColor: `${color}` }}
      className="fixed left-0 top-0 w-full z-10 ease-in duration-300"
    >
      <div className="max-w-[1240px] m-auto flex justify-between items-center p-2 text-white">
        <Link to="/">
          <h1 style={{ color: `${textColor}` }} className="font-bold text-4xl ">
            Logo
          </h1>
        </Link>
        <ul style={{ color: `${textColor}` }} className="hidden sm:flex">
          <Link to="/">
            <li className="p-4">Home</li>
          </Link>
          <Link to="/mybookings">
            <li className="p-4">My Bookings</li>
          </Link>

          <Link to="/">
            <li
              className="p-4"
              onClick={() => {
                navigate("/");
                localStorage.setItem("token", "");
                setStoredToken("");
              }}
            >
              Logout
            </li>
          </Link>
        </ul>

        {/*Mobile button /> */}
        <div className="sm:hidden block z-10">
          {nav ? (
            <AiOutlineClose
              className="text-4xl"
              onClick={toggleNav}
              style={{ color: `${textColor}` }}
            />
          ) : (
            <AiOutlineMenu
              className="text-4xl"
              onClick={toggleNav}
              style={{ color: `${textColor}` }}
            />
          )}
        </div>
        {/*Mobile menu /> */}
        <div
          className={
            nav
              ? "sm:hidden absolute top-0 right-0 left-0 bottom-0 flex justify-center items-center  w-full h-screen bg-black text-white duration-300 ease-in-out"
              : "sm:hidden absolute top-0 right-0 left-[-100%] bottom-0 flex justify-center items-center w-full h-screen bg-black text-white duration-300 ease-in-out"
          }
        >
          <ul onClick={toggleNav}>
            <Link to="/" className="p-4 text-4xl hover:text-gray-500">
              <li>Home</li>
            </Link>
            <Link to="/#gallery" className="p-4 text-4xl hover:text-gray-500">
              <li>Gallery</li>
            </Link>
            <Link to="/work" className="p-4 text-4xl hover:text-gray-500">
              <li>Work</li>
            </Link>
            <Link to="/contact" className="p-4 text-4xl hover:text-gray-500">
              <li>Contact</li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
