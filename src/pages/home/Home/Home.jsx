import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Banner from "../Banner";
import HomeCard from "../HomeCard/HomeCard";
import DiscountProductsSlider from "../../Discount/DiscountProductsSlider";
import DoctorAppoinment from "../../../Components/two extra seaction/DoctorAppoinment";
import MarqueeSection from "../../../Components/two extra seaction/Marquee";
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import ShowAdvertisement from '../../../Components/ShowAd/ShowAdvertisement';

const Home = () => {
    const axiosSecure = useAxiosSecure();
    const [advertisements, setAdvertisements] = useState([]);

    useEffect(() => {
        fetchAdvertisements();
    }, []);

    const fetchAdvertisements = async () => {
        try {
            const response = await axiosSecure.get('/advertise-medicines');
            setAdvertisements(response.data.filter(medicine => medicine.status));
        } catch (error) {
            console.error('Error checking for advertisements:', error);
        }
    };

    return (
        <div>
            <Helmet>
                <title>Medicine House | Home</title>
            </Helmet>
            <Banner />
            
            <HomeCard />
            <div className="m-20">
                <DiscountProductsSlider />
            </div>
            <div>
                <div className=''>
                <h1 className='text-4xl py-8 bg-sky-600 font-bold text-center text-green-400 '>Here Is Your Best Doctors</h1>
                <p className="text-sm mb-10 p-4 text-black text-center bg-sky-600 font-extrabold">
                    Meet our diverse team of dedicated healthcare professionals: Dr. John Doe specializes in family medicine, Dr. Jane Smith excels in dermatology and cosmetic treatments, while Dr. Emily Johnson focuses on pediatric and adolescent medicine, collectively ensuring comprehensive and compassionate care for all patients.
                </p>
                </div>
                <DoctorAppoinment />
            </div>
            {advertisements.length > 0 && (
                <div className="m-20">
                    <ShowAdvertisement advertisements={advertisements} />
                </div>
            )}
            <MarqueeSection />
        </div>
    );
};

export default Home;
