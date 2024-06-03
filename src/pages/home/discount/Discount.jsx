import React from 'react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import Shop from '../../shop/Shop';

// Import your ProductCard component


// Install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

// Define your product data
const products = [
  { id: 1, name: 'Product 1', price: 10, discount: 2 },
  { id: 2, name: 'Product 2', price: 20, discount: 5 },
  // Add more products as needed
];

const ProductSlider = () => {
  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
    >
      {products.map(product => (
        <SwiperSlide key={product.id}>
          <Shop product={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductSlider;
