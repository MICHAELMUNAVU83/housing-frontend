import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = ({ setStoredToken }) => {
  const navigate = useNavigate();

  const [first_name, setFirstName] = useState("");
  const [username, setUsername] = useState("");
  const [last_name, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const signUpFunctionality = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:3000/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          first_name,
          last_name,
          password,
          email,
          username,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.jwt) {
          localStorage.setItem("token", data.jwt);
          console.log(data);
          setStoredToken(data.jwt);
          navigate("/");
        } else {
          alert("Please fill out all fields");
        }
      });
  };

  return (
    <>
      <div className="md:max-w-[50%]  kulim-park w-[80%] mx-auto pt-24 sm:px-6 lg:px-8">
        <div className="mt-5 md:col-span-2 md:mt-0">
          <form onSubmit={signUpFunctionality}>
            <div className="shadow sm:overflow-hidden sm:rounded-md">
              <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                <div>
                  <label className="block text-sm font-medium te/xt-gray-700">
                    First Name
                  </label>
                  <div className="mt-1">
                    <input
                      type={"text"}
                      className=" border border-gray-300  text-sm rounded-lg focus:ring-[#3B841F] focus:border-[#3B841F] block w-full p-2.5 "
                      placeholder="John"
                      value={first_name}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium te/xt-gray-700">
                    Last Name
                  </label>
                  <div className="mt-1">
                    <input
                      type={"text"}
                      className=" border border-gray-300  text-sm rounded-lg focus:ring-[#3B841F] focus:border-[#3B841F] block w-full p-2.5 "
                      placeholder=" Doe"
                      value={last_name}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <div className="mt-1">
                    <input
                      type={"text"}
                      className=" border border-gray-300  text-sm rounded-lg focus:ring-[#3B841F] focus:border-[#3B841F] block w-full p-2.5 "
                      placeholder="JohnDoe"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                      type={"text"}
                      className=" border border-gray-300  text-sm rounded-lg focus:ring-[#3B841F] focus:border-[#3B841F] block w-full p-2.5 "
                      placeholder="johndoe@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium te/xt-gray-700">
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      type="password"
                      className=" border border-gray-300  text-sm rounded-lg focus:ring-[#3B841F] focus:border-[#3B841F] block w-full p-2.5 "
                      placeholder="********"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 flex justify-center px-4 py-3 text-right sm:px-6">
                <button
                  type="submit"
                  className=" text-center rounded-md border border-transparent  bg-[#3B841F] py-2 px-4  font-bold text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Sign Up Now
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
