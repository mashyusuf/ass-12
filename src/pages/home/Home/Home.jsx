
import Banner from "../Banner";
import { Helmet } from 'react-helmet-async';
import HomeCard from "../HomeCard/HomeCard";
import DiscountProductsSlider from "../../Discount/DiscountProductsSlider";



const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Medicine House | Home</title>
            </Helmet>
            <Banner />
            <HomeCard />
            <div className="m-20">
            <DiscountProductsSlider></DiscountProductsSlider>
            </div>
          
        </div>
    );
};

export default Home;
