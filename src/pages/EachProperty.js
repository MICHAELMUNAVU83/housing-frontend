import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const EachProperty = ({ loggedInUserId }) => {
  const [property, setProperty] = useState({});
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const [phone_number, setPhoneNumber] = useState("");
  const [move_in_date, setMoveInDate] = useState("");

  useEffect(() => {
    fetch(`http://127.0.0.1:3000/properties/${id}`)
      .then((r) => r.json())
      .then((data) => setProperty(data));
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://127.0.0.1:3000/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone_number,
        move_in_date,
        property_id: Number(id),
        user_id: Number(loggedInUserId),
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        setPhoneNumber("");
        setMoveInDate("");

        setTimeout(() => {
          setShowModal(false);
        }, 2000);
      });
  }

  return (
    <div className="relative  pt-24">
      {showModal && (
        <div className="fixed kulim-park bg-white shadow-xl h-[400px] my-auto w-[350px] inset-0 bg-opacity-90 z-10 flex flex-col items-center justify-center w-[200px] mx-auto">
          <div className="flex justify-end w-full p-4">
            <button
              className="bg-[#7DD959] text-white px-4 py-2 rounded-lg"
              onClick={() => setShowModal(false)}
            >
              X
            </button>
          </div>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Phone Number
              </label>
              <input
                type="text"
                value={phone_number}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="bg-white border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[250px] p-2.5 "
                placeholder="0123456789"
                required=""
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Move In Date
              </label>
              <input
                type="date"
                value={move_in_date}
                onChange={(e) => setMoveInDate(e.target.value)}
                className="bg-white border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[250px] p-2.5 "
                required=""
              />
            </div>

            <button
              type="submit"
              className="w-full text-white bg-green-400 border border-transparent rounded-lg py-2.5 px-4  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600"
            >
              Book
            </button>
          </form>
        </div>
      )}
      <div
        className={`absolute top-40 inset-0 filter ${
          showModal ? "blur-sm" : "blur-none"
        }`}
      >
        <div className="flex flex-row justify-center gap-12">
          <div>
            <img
              src={property.image}
              alt=""
              className="w-[500px] h-[500px] object-cover rounded-lg shadow-lg"
            />
          </div>

          <div className="flex flex-col bg-white w-[500px] h-[500px]  shadow-xl gap-4 text-5xl text-gray-500 p-4">
            <div className="flex flex-row  gap-2">
              <p>
                Name:{" "}
                <span className="text-gray-700 text-3xl">{property.name}</span>
              </p>
            </div>
            <div className="flex flex-row gap-2">
              <p>
                location:{" "}
                <span className="text-gray-700 text-3xl">
                  {property.location}
                </span>
              </p>
            </div>
            <div className="flex flex-row gap-2">
              <p>
                Category:{" "}
                <span className="text-gray-700 text-3xl">
                  {property.category}
                </span>
              </p>
            </div>
            <div className="flex flex-row gap-2">
              <p>
                Type:{" "}
                <span className="text-gray-700 text-3xl">
                  {property.type_of_house}
                </span>
              </p>
            </div>

            <div className="flex flex-row gap-2">
              <p>
                Price:{" "}
                <span className="text-gray-700 text-3xl">
                  {property.price} Ksh / month
                </span>
              </p>
            </div>
            <p className="text-sm w-[85%] mx-auto text-center">
              If you are interested in this property, you can book a viewing by
              clicking the button below
            </p>

            <button
              className="bg-green-500 w-[250px] mx-auto text-white text-xl p-2 rounded-lg"
              onClick={() => setShowModal(true)}
            >
              Book Viewing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EachProperty;
