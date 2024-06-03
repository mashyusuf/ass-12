import { Link } from "react-router-dom";
import useCart from "../../../hooks/useCart";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Cart = () => {
    const [cart , refetch] = useCart();
    const axiosSecure = useAxiosSecure();
    
    // Function to calculate total price and discount
    const calculateTotalPrice = () => {
        let totalPrice = 0;
        let totalDiscount = 0;

        cart.forEach(item => {
            const price = parseFloat(item.price.replace("$", ""));
            const discount = item.discount ? parseFloat(item.discount) / 100 : 0;
            const discountedPrice = price * (1 - discount);

            totalPrice += discountedPrice;
            totalDiscount += price - discountedPrice;
        });

        return { totalPrice, totalDiscount };
    };

    const { totalPrice, totalDiscount } = calculateTotalPrice();

    const handleDelete = id =>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
              axiosSecure.delete(`/carts/${id}`)
              .then(res =>{
               if(res.data.deletedCount > 0) {
                refetch()
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                  });
               }
              })
            }
          });
    }

    return (
        <div>
            <div className="grid grid-cols-3  lg:flex justify-between items-center mb-4">
                <h2 className="text-2xl text-blue-800">Medicines: {cart.length.toString()}</h2>
                <h2 className="text-2xl text-green-800">Medicines Total Price: ${totalPrice.toFixed(2).toString()}</h2>
                <h2 className="text-2xl text-red-800">Total Discount: $ <span className="text-red-600">{totalDiscount.toFixed(2).toString()}</span></h2>
                <Link to="/payment">
                    <button className="btn btn-success px-10 text-lg">Pay</button>
                </Link>
            </div>
            <div className="overflow-x-auto">
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-blue-800"> # </th>
                            <th className="px-4 py-2 text-blue-800"> Name </th>
                            <th className="px-4 py-2 text-blue-800"> Price </th>
                            <th className="px-4 py-2 text-blue-800"> Discount </th>
                            <th className="px-4 py-2 text-blue-800"> Action </th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item, index) => (
                            <tr key={item._id} className={(index % 2 === 0) ? "bg-gray-100" : "bg-white"}>
                                <td className="border px-4 text-center py-2 text-gray-800">{index + 1}</td>
                                <td className="border px-4 text-center py-2 text-gray-800">{item.name}</td>
                                <td className="border px-4 text-center py-2 text-gray-800">{item.price}</td>
                                <td className="border px-4 text-center py-2 text-gray-800">{item.discount}</td>
                                <td className="border text-center px-4  py-2">
                                    <button onClick={() => handleDelete(item._id)} className="text-red-500 hover:text-red-700 ">
                                        <FaTrash/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Cart;
