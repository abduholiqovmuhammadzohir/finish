import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import styles from "./index.module.css"
import eye from "../../assets/eye.png"

function Footer() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1); 
  const perPage = 10;
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false); // Loader holatini saqlash

  useEffect(() => {
    setLoading(true); // Ma'lumotlarni yuklash boshlanishida loader ni yoqamiz
    fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=gecko_desc&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=24h`)
      .then(res => res.json())
      .then((el) => {
        setData(el);
        setLoading(false); // Ma'lumotlar yuklandi, loader ni o'chiramiz
      })
      .catch(err => {
        console.log(err);
      })
  }, [page]);

  const navigate = useNavigate();

  function handleClick(data) {
    let a = JSON.parse(localStorage.getItem('data')
    ) || []
    a.push(data)
    localStorage.setItem('data', JSON.stringify(a))
    navigate(`/apexchart/${data.id}`)
  }

  const handlePageChange = (event, value) => {
    setPage(value); 
  };

  const handleSearch = (event) => { 
    setSearchInput(event.target.value); 
  };

  return (
    <div className={styles.footer}>
      <div className={styles.conatiner}>
        <h1>Cryptocurrency Prices by Market Cap</h1>
        <input 
          type="text" 
          placeholder="Search For a Crypto Currency.." 
          value={searchInput} 
          onChange={handleSearch}
        />
        <div className={styles.table}>
          <div className={styles.thead}>
            <h3>Coin</h3>
            <h2>Price</h2>
            <h4>24h Change</h4>
            <h2>Market Cap</h2>
          </div>
          {loading ? ( // Ma'lumotlar yuklanayotgan paytda CircularProgress ni ko'rsatish
            <div className={styles.loader}><CircularProgress /></div> 
          ) : (
            data.length > 0 && data
              .filter((item) => item.symbol.toLowerCase().includes(searchInput.toLowerCase()))
              .map((item, index) => (
                <div key={index}>
                  <div
                     key={data.id} onClick={() => {
                      handleClick(data)
                    }
                  }
                    className={styles.tbody}
                  >
                    <div className={styles.icon}>
                      <img src={item.image} alt="" />
                      <div>
                        <h5>{item.symbol}</h5>
                        <h6>{item.name}</h6>
                      </div>
                    </div>
                    <h2>₹ {item.current_price?.toLocaleString() || 'Malumotlar topilmadi'}</h2>
                    <div className={styles.eye}>
                      <img src={eye} alt="" />
                      <span style={{ color: item.price_change_percentage_24h_in_currency.toString().startsWith('-') ? 'red' : '#0ECB81' }}>
                       {item.price_change_percentage_24h_in_currency.toFixed(1)}%
                      </span>
                    </div>
                    <h2>₹ {item.market_cap?.toLocaleString() || 'Malumotlar topilmadi'}M</h2>
                  </div>
                </div>
              ))
          )}
        </div>
        <Stack spacing={2} className={styles.pagination}>
          <Pagination
            count={10}
            page={page} 
            onChange={handlePageChange}
            sx={{
              '& .Mui-selected': {
                color: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.16); '
              },
              '& .MuiButtonBase-root': {
                color: 'rgba(135, 206, 235, 1);',
              },
            }}
          />
        </Stack>
      </div>
    </div>
  )
}

export default Footer;
