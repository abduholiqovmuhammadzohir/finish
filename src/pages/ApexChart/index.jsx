import styles from "./index.module.css"
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import  Chart from "../../components/Chart";

function ApexChart() {
  

  const [data, setData] = useState({})
  let { id } = useParams();

  useEffect(() => {
    fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
      .then(res => res.json())
      .then((el) => {
        setData(el)
        console.log(el, 72);
      })
      .catch(err => {
        console.log(err);
      })
  }, [id])


  return (
    <div className={styles.container}>
      <div className={styles.view}>
        {
          <div className={styles.cryto_info}>
            <img src={data.image?.large || 'Malumotlar topilmadi'} alt="" />
            <h1>{data.name || "Malumot topilmadi"}</h1>
            <p>{data.description?.en?.slice(0, 200) || 'Malumotlar topilmadi'}</p>
            <h3>Rank:<span>{data.market_cap_rank || "Malumot topilmadi"}</span></h3>
            <h3>Current Price:<span>₹{data.watchlist_portfolio_users?.toLocaleString() || 'Malumotlar topilmadi'}</span></h3>
            <h4>Market Cap:<span>₹{data.market_data?.market_cap?.inr?.toLocaleString() || 'Malumotlar topilmadi'}M</span></h4>
            
          </div>
        }
        <div className={styles.apexchart}>
          <Chart></Chart>
        </div>
      </div>
    </div>
  )
}

export default ApexChart
