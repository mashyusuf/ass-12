import Banner from "../Banner";
import { Helmet } from 'react-helmet-async';
import HomeCard from "../HomeCard/HomeCard";


const Home = () => {
    return (
        <div>
             <Helmet>
        <title>Medicine Houes  | Home</title>
      </Helmet>
           <Banner></Banner>
           <HomeCard></HomeCard>
          {/* <Discount></Discount>*/}
        </div>
    );
};

export default Home;