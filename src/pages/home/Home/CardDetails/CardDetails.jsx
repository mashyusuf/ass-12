import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useAxiosCommon from '../../../../hooks/useAxiosCommon';
import { FaCircle } from "react-icons/fa";
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';
import useCart from '../../../../hooks/useCart';
import { Helmet } from 'react-helmet-async';


const CardDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [cart, refetch] = useCart();
  const axiosCommon = useAxiosCommon();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

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

  const handleSelectMedicine = (medicine) => {
    if (user && user.email) {
      const cartItem = {
        shopId: medicine._id,
        email: user.email,
        name: medicine.name,
        price: medicine.price,
        discount: medicine.discount, 
        sellerEmail : medicine.seller?.email,
        sellerName : medicine.seller?.name
        };
      axiosSecure.post('/carts', cartItem)
        .then(res => {
          if (res.data.insertedId) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: `Your Cart Has Been Added`,
              showConfirmButton: false,
              timer: 1500
            });
            // Refetch cart to update the cart
            refetch();
          }
        })
        .catch(error => {
          console.error('Error adding to cart:', error);
        });
    } else {
      Swal.fire({
        title: "You are Not Logged In?",
        text: "Please Login To Add To The Cart!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Login!"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login', { state: { from: location } });
        }
      });
    }
    console.log("Medicine selected:", medicine, user.email);
  };

  return (
    <div>
      <Helmet>
                <title>Medicine House | Details</title>
            </Helmet>
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
          <div className="flex justify-center mt-8 gap-x-6">
            <Link
              to="/"
              className="select-button btn btn-primary bg-indigo-600 text-white py-3 px-8 rounded-lg hover:bg-indigo-700 transition duration-300 text-lg"
            >
              Home
            </Link>
            <button
              onClick={() => handleSelectMedicine(card)}
              className="select-button btn btn-primary bg-indigo-600 text-white py-3 px-8 rounded-lg hover:bg-indigo-700 transition duration-300 text-lg"
            >
              Select To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
