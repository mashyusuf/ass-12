import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import useAxiosCommon from '../../../../hooks/useAxiosCommon';
import { FaCircle } from "react-icons/fa";

const CardDetails = () => {
  const { id } = useParams();
  const axiosCommon = useAxiosCommon();

  const { data: card = {}, isLoading } = useQuery({
    queryKey: ['card', id],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/card-details/${id}`);
      return data;
    },
  });

  if (isLoading) return <span className="loading loading-bars loading-lg"></span>;

  const truncateDescription = (desc) => {
    if (!desc) return "";
    return desc.split(" ").slice(0, 10).join(" ") + (desc.split(" ").length > 10 ? "..." : "");
  };

  return (
    <div>
      <div className="grid grid-cols-1 my-10 md:grid-cols-2 gap-8 items-center justify-center hover:scale-105 transition">
        {/* Image Layer */}
        <div className="relative rounded-lg overflow-hidden shadow-lg">
          <img src={card.image_url} className="w-full h-96 object-cover transition-transform transform hover:scale-105" alt={card.name} />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
            {/* You can place any overlay content here if needed */}
          </div>
        </div>
        {/* Details Layer */}
        <div className="p-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 text-blue-700">{card.name}</h2>
          <div className="font-bold italic">
            <p className="flex items-center mb-2 text-blue-900">
              <FaCircle className="mr-2" />
              Cost: <span className="text-sm">{card.price} $</span>
            </p>
            <p className="flex items-center mb-2 text-blue-900">
              <FaCircle className="mr-2" />
              Dosage: <span className="text-sm">{card.dosage}</span>
            </p>
            <p className="flex items-center mb-2 text-blue-900">
              <FaCircle className="mr-2" />
              Manufacturer: <span className="text-sm">{card.manufacturer}</span>
            </p>
            <p className="flex items-center mb-2 text-red-600">
              <FaCircle className="mr-2" />
              Discount: <span className="text-2xl m-2">{card.discount}</span>
            </p>
            <p className="flex items-center mb-2 text-blue-900">
              <FaCircle className="mr-2" />
              Description: <span className="text-sm">{truncateDescription(card.description)}</span>
            </p>
          </div>
          <div className="flex justify-center mt-8">
            <Link
              to="/"
              className="btn mr-4 mb-4 bg-blue-700 text-white py-2 px-6 rounded-lg hover:bg-blue-800 hover:shadow-xl transition duration-300"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
