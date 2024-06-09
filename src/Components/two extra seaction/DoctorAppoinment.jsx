
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import app from '../../assets/app.webp'
import app2 from '../../assets/app2.jpg'
import app3 from '../../assets/app3.jpeg'
const DoctorAppoinment = () => {
    const doctors = [
        {
            name: "Dr. John Doe",
            specialties: "Family Medicine, Preventive Care, Chronic Disease Management",
            contact: "(123) 456-7890",
            email: "johndoe@example.com",
            img: <img src={app} alt="Dr. John Doe" className="w-32 h-32 rounded-full border-2 border-green-500" />,
            facebook: "https://facebook.com",
            twitter: "https://twitter.com",
            instagram: "https://instagram.com",
            linkedin: "https://linkedin.com"
        },
        {
            name: "Dr. Jane Smith",
            specialties: "Dermatology, Skin Care, Cosmetic Treatments",
            contact: "(987) 654-3210",
            email: "janesmith@example.com",
            img: <img src={app2} alt="Dr. Jane Smith" className="w-32 h-32 rounded-full border-2 border-blue-500" />,
            facebook: "https://facebook.com",
            twitter: "https://twitter.com",
            instagram: "https://instagram.com",
            linkedin: "https://linkedin.com"
        },
        {
            name: "Dr. Emily Johnson",
            specialties: "Pediatrics, Child Health, Adolescent Medicine",
            contact: "(555) 123-4567",
            email: "emilyjohnson@example.com",
            img: <img src={app3} alt="Dr. Emily Johnson" className="w-32 h-32 rounded-full border-2 border-pink-500" />,
            facebook: "https://facebook.com",
            twitter: "https://twitter.com",
            instagram: "https://instagram.com",
            linkedin: "https://linkedin.com"
        }
    ];

    return (
        <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 px-4 py-8">
            
            {doctors.map((doctor, index) => (
                <div key={index} className="max-w-sm mx-auto bg-gradient-to-r from-green-400 to-blue-500 text-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                    <div className="flex justify-center mt-8">
                        {doctor.img}
                    </div>
                    <div className="text-center mt-4">
                        <h1 className="text-3xl font-bold">{doctor.name}</h1>
                        <h2 className="text-xl font-semibold mt-2">{doctor.specialties}</h2>
                        <p className="mt-4 mx-4">
                            <strong>Specialties:</strong> {doctor.specialties}
                        </p>
                        <p className="mt-2">
                            <strong>Contact Number:</strong> {doctor.contact}
                        </p>
                        <p className="mt-2">
                            <strong>Email:</strong> {doctor.email}
                        </p>
                    </div>
                    <div className="text-center mt-4 mb-8">
                        <h3 className="text-lg font-semibold">Follow Us</h3>
                        <div className="flex justify-center mt-2">
                            <a href={doctor.facebook} target="_blank" rel="noopener noreferrer" className="mx-2">
                                <FaFacebook size={30} className="hover:text-blue-600 transition-colors duration-300" />
                            </a>
                            <a href={doctor.twitter} target="_blank" rel="noopener noreferrer" className="mx-2">
                                <FaTwitter size={30} className="hover:text-blue-400 transition-colors duration-300" />
                            </a>
                            <a href={doctor.instagram} target="_blank" rel="noopener noreferrer" className="mx-2">
                                <FaInstagram size={30} className="hover:text-pink-500 transition-colors duration-300" />
                            </a>
                            <a href={doctor.linkedin} target="_blank" rel="noopener noreferrer" className="mx-2">
                                <FaLinkedin size={30} className="hover:text-blue-700 transition-colors duration-300" />
                            </a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DoctorAppoinment;
