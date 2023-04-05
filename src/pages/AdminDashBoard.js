import React, { useState, useEffect } from "react";

const AdminDashBoard = () => {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:3000/bookings")
      .then((r) => r.json())
      .then((data) => {
        setBookings(data);
      });
  }, []);

  return (
    <div className="pt-24">
      <h1 className="text-center text-5xl font-bold">List of all Tenants</h1>
      <div class="relative overflow-x-auto w-[90%] mx-auto">
        <table class="w-full text-sm text-left  text-white">
          <thead class="text-xs white uppercase bg-gray-700 text-white">
            <tr>
              <th scope="col" class="px-6 py-3">
                First Name
              </th>
              <th scope="col" class="px-6 py-3">
                Last Name
              </th>
              <th scope="col" class="px-6 py-3">
                Email
              </th>
              <th scope="col" class="px-6 py-3">
                Phone
              </th>
              <th scope="col" class="px-6 py-3">
                Property
              </th>
              <th scope="col" class="px-6 py-3">
                Move In Date
              </th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {booking.user_first_name}
                </th>
                <td class="px-6 py-4"> {booking.user_last_name}</td>
                <td class="px-6 py-4">{booking.user_email}</td>
                <td class="px-6 py-4">{booking.phone_number}</td>
                <td class="px-6 py-4">{booking.name}</td>
                <td class="px-6 py-4">{booking.move_in_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashBoard;
