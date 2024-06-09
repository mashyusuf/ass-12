
import Marquee from 'react-fast-marquee';
import mojo from '../../assets/mojo.jpg';
import apple from '../../assets/apple.jpg';
import wal from '../../assets/walton.jpg';
import ii from '../../assets/4.webp';
import iii from '../../assets/5.jpg';
import iiii from '../../assets/5.png';

const MarqueeSection = () => {
    return (
        <div className="my-8 py-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-center rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-white mb-6">Our Sponsors</h2>
            <Marquee speed={250} gradient={false} className="flex items-center">
                {[mojo, apple, wal, iii, ii, iiii].map((image, index) => (
                    <div key={index} className="h-28 w-24 mx-20 bg-white rounded-lg shadow-md flex items-center justify-center transform transition-transform hover:scale-110">
                        <img src={image} alt={`Sponsor ${index + 1}`} className="h-16 w-16 object-contain" />
                    </div>
                ))}
            </Marquee>
        </div>
    );
};

export default MarqueeSection;
