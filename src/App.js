import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import SplashScreen from "./pages/SplashScreen";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import EachProperty from "./pages/EachProperty";
import MyBookings from "./pages/MyBookings";
import AdminDashBoard from "./pages/AdminDashBoard";
import AdminNavBar from "./components/AdminNavBar";
import "./App.css";
function App() {
  const [storedToken, setStoredToken] = useState(localStorage.getItem("token"));
  const [loggedInUserRole, setLoggedInUserRole] = useState("");
  const [loggedInUserId, setLoggedInUserId] = useState("");
  useEffect(() => {
    console.log(storedToken);
  }, [storedToken]);
  useEffect(() => {
    fetch("http://127.0.0.1:3000/api/v1/profile ", {
      method: "GET",
      headers: {
        Accepts: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoggedInUserRole(data.user.role);
        setLoggedInUserId(data.user.id);
      });
  }, [storedToken]);

  return (
    <div>
      <Router>
        {storedToken ? (
          loggedInUserRole === "admin" ? (
            <AdminNavBar setStoredToken={setStoredToken} />
          ) : (
            <NavBar setStoredToken={setStoredToken} />
          )
        ) : null}

        <Routes>
          {storedToken ? (
            <>
              {loggedInUserRole === "admin" ? (
                <Route
                  path="/"
                  element={<AdminDashBoard loggedInUserId={loggedInUserId} />}
                />
              ) : (
                <Route path="/" element={<Home />} />
              )}
              <Route
                path="/EachProperty/:id"
                element={<EachProperty loggedInUserId={loggedInUserId} />}
              />
              <Route
                path="/mybookings"
                element={<MyBookings loggedInUserId={loggedInUserId} />}
              />
            </>
          ) : (
            <>
              <Route
                path="/"
                element={<SplashScreen setStoredToken={setStoredToken} />}
              />

              <Route
                path="/signup"
                element={<SignUp setStoredToken={setStoredToken} />}
              />
              <Route
                path="/login"
                element={<Login setStoredToken={setStoredToken} />}
              />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
