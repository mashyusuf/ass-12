import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { imageUpload } from '../../api/utils';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
function AddMedicineForm() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate()
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
      console.log('Data saved successfully');
      toast.success('Medicine Added Successfully')
      navigate('/dashboard/my-listing')
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
      console.log('Medicine data:', medicineData);
    } catch (err) {
      console.error(err);
      toast.error('Error You Room Was Not Added', err.message)
    }
  };
  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
      <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
        <label style={{ color: 'blue', fontSize: '2xl', marginRight: '10px', fontWeight: 'bold', flex: '1' }}>Item Name:</label>
        <input type="text" name="itemName" value={formData.itemName} onChange={handleChange} style={{ flex: '2', padding: '10px', paddingTop: '12px', paddingBottom: '12px' }} />
      </div>
      <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
        <label style={{ color: 'blue', fontSize: '2xl', marginRight: '10px', fontWeight: 'bold', flex: '1' }}>Short Description:</label>
        <textarea name="description" value={formData.shortDescription} onChange={handleChange} style={{ flex: '2', padding: '10px', paddingTop: '12px', paddingBottom: '12px' }} />
      </div>
      <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
        <label style={{ color: 'blue', fontSize: '2xl', marginRight: '10px', fontWeight: 'bold', flex: '1' }}>Image Upload:</label>
        <input type="file" name="image_url" accept="image/*" onChange={handleImageChange} style={{ flex: '2', padding: '10px', paddingTop: '12px', paddingBottom: '12px' }} />
      </div>
      <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
        <label style={{ color: 'blue', fontSize: '2xl', marginRight: '10px', fontWeight: 'bold', flex: '1' }}>Category:</label>
        <select name="category" value={formData.category} onChange={handleChange} style={{ flex: '2', padding: '10px', paddingTop: '12px', paddingBottom: '12px' }}>
          <option value="">Select a category</option>
          <option value="Vitamins & Supplements">Vitamins & Supplements</option>
          <option value="Cold & Flu">Cold & Flu</option>
          <option value="Digestive Health">Digestive Health</option>
          <option value="Allergy Relief">Allergy Relief</option>
          <option value="Antibiotics">Antibiotics</option>
          <option value="Pain Relief">Pain Relief</option>
        </select>
      </div>
      <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
        <label style={{ color: 'blue', fontSize: '2xl', marginRight: '10px', fontWeight: 'bold', flex: '1' }}>Company:</label>
        <select name="manufacturer" value={formData.company} onChange={handleChange} style={{ flex: '2', padding: '10px', paddingTop: '12px', paddingBottom: '12px' }}>
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
      <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
        <label style={{ color: 'blue', fontSize: '2xl', marginRight: '10px', fontWeight: 'bold', flex: '1' }}>Item Mass Unit:</label>
        <input type="text" name="dosage" value={formData.massUnit} onChange={handleChange} style={{ flex: '2', padding: '10px', paddingTop: '12px', paddingBottom: '12px' }} />
      </div>
      <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
        <label style={{ color: 'blue', fontSize: '2xl', marginRight: '10px', fontWeight: 'bold', flex: '1' }}>Per Unit Price:</label>
        <input type="number" name="price" value={formData.price} onChange={handleChange} style={{ flex: '2', padding: '10px', paddingTop: '12px', paddingBottom: '12px' }} />
      </div>
      <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
        <label style={{ color: 'blue', fontSize: '2xl', marginRight: '10px', fontWeight: 'bold', flex: '1' }}>Discount Percentage:</label>
        <input type="number" name="discount" value={formData.discount} onChange={handleChange} style={{ flex: '2', padding: '10px', paddingTop: '12px', paddingBottom: '12px' }} />
      </div>
      <button type="submit" style={{ backgroundColor: 'blue', color: 'white', padding: '10px 20px', borderRadius: '5px', border: 'none', fontSize: '2xl', fontWeight: 'bold' }}>Submit</button>
    </form>
  );
}

export default AddMedicineForm;
