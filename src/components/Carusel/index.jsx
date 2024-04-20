import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from "react-router-dom";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles.css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

function Carusel() {
  const [data, setData] = useState([
    { id: 1, image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png?1696502090', symbol: 'BTC', current_price: "100" },
    { id: 2, image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png?1696502090', symbol: 'ETH', current_price: "100" },
    { id: 3, image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png?1696502090', symbol: 'XRP', current_price: "100" },
    { id: 4, image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png?1696502090', symbol: 'XRP', current_price: "100" },
    { id: 5, image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png?1696502090', symbol: 'XRP', current_price: "100" },
    { id: 6, image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png?1696502090', symbol: 'XRP', current_price: "100" },
    { id: 7, image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png?1696502090', symbol: 'XRP', current_price: "100" },
    { id: 8, image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png?1696502090', symbol: 'XRP', current_price: "100" },
    { id: 9, image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png?1696502090', symbol: 'XRP', current_price: "100" },
    { id: 10, image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png?1696502090', symbol: 'XRP', current_price: "100" },
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h")
      .then(res => res.json())
      .then(data => {
        setData(data);
      })
      .catch(err => {
        console.error("Failed to fetch data:", err);
      });
  }, []);
  function handleClick(item) {
    let a = JSON.parse(localStorage.getItem('data')) || [];
    const exists = a.some(it => it.id === item.id);
    if (!exists) {
      const updatedLists = a.concat(item);
      localStorage.setItem('data', JSON.stringify(updatedLists));
    }
    navigate(`/apexchart/${item.id}`);
}

  return (
    <div className="container_carusel">
      <h1>CRYPTOFOLIO WATCH LIST</h1>
      <h5>Get all the Info regarding your favorite Crypto Currency</h5>
      <div className="carusel">
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop
          breakpoints={{
            '@0.00': {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            '@0.75': {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            '@1.00': {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            '@1.50': {
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {data.map(item => (
            <SwiperSlide key={item.id} onClick={() => {
              handleClick(item)
            }}>
              <div>
                <img src={item.image} alt={item.symbol} />
                <h3>{item.symbol}
                  <span style={{ color: item.price_change_percentage_24h_in_currency < 0 ? 'red' : '#0ECB81' }}>
                    {item.price_change_percentage_24h_in_currency?.toFixed(1) || 0}%
                  </span>
                </h3>
                <h2>₹{item.current_price?.toLocaleString()}</h2>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Carusel;
