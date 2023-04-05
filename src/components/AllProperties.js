import React, { useState, useEffect } from "react";
import { AiFillHeart } from "react-icons/ai";
import { IoLocationSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
const AllProperties = () => {
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:3000/properties")
      .then((res) => res.json())
      .then((data) => setProperties(data));
  }, []);
  return (
    <div>
      <div className="flex flex-wrap justify-center gap-24">
        {properties.map((property) => (
          <Link to={`/EachProperty/${property.id}`}>
            <div className="bg-white w-[400px] rounded-lg shadow-lg hover:scale-105 cursor-pointer transition duration-500 ease-in-out">
              <img
                src={property.image}
                alt=""
                className="w-full h-[200px] object-cover rounded-t-lg"
              />
              <div className="flex justify-between mt-4 px-8">
                <p className="bg-yellow-200 text-yellow-700 p-1">
                  {property.category}
                </p>
                <p>
                  <AiFillHeart className="text-red-500" size={20} />
                </p>
              </div>

              <h1 className="text-gray-400 text-start ml-8 mt-2 font-bold  text-2xl">
                {property.name}
              </h1>

              <div className="flex text-2xl mt-2 px-8">
                <IoLocationSharp className="text-gray-400" size={30} />

                <p className="text-gray-500">{property.location}</p>
              </div>
              <hr />

              <div className="flex justify-between mt-4 px-8 py-4">
                <p className="text-white bg-green-500 font-semibold px-2 py-1 rounded-xl ">
                  {property.price} Ksh
                </p>

                <p className="text-gray-400 text-xl ">
                  {property.type_of_house}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllProperties;
