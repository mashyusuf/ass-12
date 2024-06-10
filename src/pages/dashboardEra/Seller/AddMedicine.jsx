import AddMedicineForm from "../../../Components/From/AddMedicineForm";
import { Helmet } from 'react-helmet-async';

const AddMedicine = () => {
    return (
        <div>
            <Helmet>
                <title>Medicine House | Add Medicine</title>
            </Helmet>
            <div> <h1>Add Room Page For Seller--</h1></div>
            <div><AddMedicineForm></AddMedicineForm> </div>
        </div>
    );
};

export default AddMedicine;