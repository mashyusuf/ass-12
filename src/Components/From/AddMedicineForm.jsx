import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { imageUpload } from '../../api/utils';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function AddMedicineForm() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    itemName: '',
    description: '',
    image_url: null, // Ensure proper initialization
    category: '',
    manufacturer: '',
    dosage: '',
    price: '',
    discount: 0, // Ensure proper initialization
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (medicineData) => {
      const { data } = await axiosSecure.post('/add-medicines', medicineData);
      return data;
    },
    onSuccess: () => {
      //console.log('Data saved successfully');
      toast.success('Medicine Added Successfully');
      navigate('/dashboard/my-listing');
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image_url: file, // Change to image_url for consistency
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      itemName,
      description,
      category,
      manufacturer,
      dosage,
      price,
      discount,
      image_url,
    } = formData;

    const seller = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    };

    try {
      const uploadedImageUrl = await imageUpload(image_url);
      const medicineData = {
        name: itemName,
        description,
        category,
        manufacturer,
        dosage,
        price,
        seller,
        discount,
        image_url: uploadedImageUrl, // Change to uploadedImageUrl for consistency
      };
      await mutateAsync(medicineData);
     // console.log('Medicine data:', medicineData);
    } catch (err) {
      //console.error(err);
      toast.error('Error: Your item was not added', err.message);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex flex-col p-8 rounded-lg" 
      style={{ background: 'linear-gradient(135deg, #f0f0f0, #e0e0e0)' }}
    >
      <div className="mb-4 flex items-center">
        <label className="text-xl font-bold mr-4 w-1/4 text-blue-700">Item Name:</label>
        <input 
          type="text" 
          name="itemName" 
          value={formData.itemName} 
          onChange={handleChange} 
          className="flex-1 p-3 border-2 border-blue-700 rounded-lg" 
          style={{ backgroundColor: '#f9f9f9' }}
        />
      </div>
      <div className="mb-4 flex items-center">
        <label className="text-xl font-bold mr-4 w-1/4 text-blue-700">Short Description:</label>
        <textarea 
          name="description" 
          value={formData.description} 
          onChange={handleChange} 
          className="flex-1 p-3 border-2 border-blue-700 rounded-lg" 
          style={{ backgroundColor: '#f9f9f9' }}
        />
      </div>
      <div className="mb-4 flex items-center">
        <label className="text-xl font-bold mr-4 w-1/4 text-blue-700">Image Upload:</label>
        <input 
          type="file" 
          name="image_url" 
          accept="image/*" 
          onChange={handleImageChange} 
          className="flex-1 p-3 border-2 border-blue-700 rounded-lg" 
          style={{ backgroundColor: '#f9f9f9' }}
        />
      </div>
      <div className="mb-4 flex items-center">
        <label className="text-xl font-bold mr-4 w-1/4 text-blue-700">Category:</label>
        <select 
          name="category" 
          value={formData.category} 
          onChange={handleChange} 
          className="flex-1 p-3 border-2 border-blue-700 rounded-lg" 
          style={{ backgroundColor: '#f9f9f9' }}
        >
          <option value="">Select a category</option>
          <option value="Vitamins & Supplements">Vitamins & Supplements</option>
          <option value="Cold & Flu">Cold & Flu</option>
          <option value="Digestive Health">Digestive Health</option>
          <option value="Allergy Relief">Allergy Relief</option>
          <option value="Antibiotics">Antibiotics</option>
          <option value="Pain Relief">Pain Relief</option>
          <option value="Dog Medicine">Dog Medicine</option>
          <option value="Cat  Medicine">Cat Medicine</option>
          <option value="Animal Medicine">Animal Meicine</option>
        </select>
      </div>
      <div className="mb-4 flex items-center">
        <label className="text-xl font-bold mr-4 w-1/4 text-blue-700">Company:</label>
        <select 
          name="manufacturer" 
          value={formData.manufacturer} 
          onChange={handleChange} 
          className="flex-1 p-3 border-2 border-blue-700 rounded-lg" 
          style={{ backgroundColor: '#f9f9f9' }}
        >
          <option value="">Select a company</option>
          <option value="Pfizer">Pfizer</option>
          <option value="Johnson & Johnson">Johnson & Johnson</option>
          <option value="Roche">Roche</option>
          <option value="Novartis">Novartis</option>
          <option value="Merck">Merck</option>
          <option value="Sanofi">Sanofi</option>
          <option value="GlaxoSmithKline">GlaxoSmithKline</option>
          <option value="AstraZeneca">AstraZeneca</option>
          <option value="AbbVie">AbbVie</option>
          <option value="Eli Lilly">Eli Lilly</option>
        </select>
      </div>
      <div className="mb-4 flex items-center">
        <label className="text-xl font-bold mr-4 w-1/4 text-blue-700">Item Mass Unit:</label>
        <input 
          type="text" 
          name="dosage" 
          value={formData.dosage} 
          onChange={handleChange} 
          className="flex-1 p-3 border-2 border-blue-700 rounded-lg" 
          style={{ backgroundColor: '#f9f9f9' }}
        />
      </div>
      <div className="mb-4 flex items-center">
        <label className="text-xl font-bold mr-4 w-1/4 text-blue-700">Per Unit Price:</label>
        <input 
          type="number" 
          name="price" 
          value={formData.price} 
          onChange={handleChange} 
          className="flex-1 p-3 border-2 border-blue-700 rounded-lg" 
          style={{ backgroundColor: '#f9f9f9' }}
        />
      </div>
      <div className="mb-4 flex items-center">
        <label className="text-xl font-bold mr-4 w-1/4 text-blue-700">Discount Percentage:</label>
        <input 
          type="number" 
          name="discount" 
          value={formData.discount} 
          onChange={handleChange} 
          className="flex-1 p-3 border-2 border-blue-700 rounded-lg" 
          style={{ backgroundColor: '#f9f9f9' }}
        />
      </div>
      <button 
        type="submit" 
        className="bg-blue-700 text-white p-3 rounded-lg border-none text-xl font-bold hover:bg-blue-800 transition duration-300"
      >
        Submit
      </button>
    </form>
    
  );
}

export default AddMedicineForm;
