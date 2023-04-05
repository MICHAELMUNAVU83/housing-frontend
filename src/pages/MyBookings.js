import React, { useState, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { IoLocationSharp } from "react-icons/io5";

const MyBookings = ({ loggedInUserId }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:3000/my_bookings/${Number(loggedInUserId)}`)
      .then((r) => r.json())
      .then((data) => {
        setBookings(data);
      });
  }, [loggedInUserId]);

  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:3000/bookings/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        setBookings(bookings.filter((booking) => booking.id !== id));
      });
  };

  return (
    <div className="pt-24">
      <div>
        <div className="flex flex-wrap justify-center gap-24">
          {bookings.map((booking) => (
            <div className="bg-white w-[400px] rounded-lg shadow-lg hover:scale-105 cursor-pointer transition duration-500 ease-in-out">
              <img
                src={booking.image}
                alt=""
                className="w-full h-[200px] object-cover rounded-t-lg"
              />
              <div className="flex justify-between mt-4 px-8">
                <p className="bg-yellow-200 text-yellow-700 p-1">
                  {booking.category}
                </p>
                <p>
                  <AiFillDelete
                    className="text-red-500"
                    size={20}
                    onClick={() => handleDelete(booking.id)}
                  />
                </p>
              </div>

              <h1 className="text-gray-400 text-start ml-8 mt-2 font-bold  text-2xl">
                {booking.name}
              </h1>

              <div className="flex text-2xl mt-2 px-8">
                <IoLocationSharp className="text-gray-400" size={30} />

                <p className="text-gray-500">{booking.location}</p>
              </div>
              <div className="flex text-2xl mt-2 px-8">
                <p>Move in date: </p>

                <p className="text-gray-500">{booking.move_in_date}</p>
              </div>
              <hr />

              <div className="flex justify-between mt-4 px-8 py-4">
                <p className="text-white bg-green-500 font-semibold px-2 py-1 rounded-xl ">
                  {booking.price} Ksh
                </p>

                <p className="text-gray-400 text-xl ">
                  {booking.type_of_house}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
