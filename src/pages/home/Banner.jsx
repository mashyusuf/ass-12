
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import img1 from '../../assets/img4.webp';
import img2 from '../../assets/img1.webp';
import img3 from '../../assets/img2.jpg';
import img5 from '../../assets/img3.png';
import img6 from '../../assets/img5.jpg';

const Banner = () => {
    return (
        <Carousel className='text-center mb-10'>
            <div>
                <img className='' src={img1} alt="Image 1" />
            </div>
            <div>
                <img className='' src={img2} alt="Image 2" />
            </div>
            <div>
                <img className=' ' src={img3} alt="Image 3" />
            </div>
            <div>
                <img className=' ' src={img5} alt="Image 4" />
            </div>
            <div>
                <img className='  ' src={img6} alt="Image 5" />
            </div>
        </Carousel>
    );
};

export default Banner;
