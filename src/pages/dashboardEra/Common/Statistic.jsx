import useRole from "../../../hooks/useRole";
import AdminStatistics from "../Admin/AdminDashboard";
import SellerDashboard from "../Seller/SellerDashboard";
import GuestStatistics from "../User/UserDashboard";


const Statistic = () => {
    const [role,isLoading]= useRole()
    return (
        <div>
           <div>
           {
            role === 'admin' && <AdminStatistics></AdminStatistics>
           }
           </div>
           <div>
           {
            role === 'seller' && <SellerDashboard></SellerDashboard>
           }
           </div>
           <div>
           {
            role === 'user' && <GuestStatistics></GuestStatistics>
           }
           </div>
        </div>
    );
};

export default Statistic;