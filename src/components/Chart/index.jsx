import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import React, { useEffect, useState } from 'react';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// const [item, setItem] = useState({})

// useEffect(() => {
//     fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
//       .then(res => res.json())
//       .then((el) => {
//         setItem(el)
//         console.log(el, 72);
//       })
//       .catch(err => {
//         console.log(err);
//       })
//   }, [id])

const LineChart = () => {
  const data = {
    labels: ['24 Hours',"30 Days","3 Months","1 Year"],
    datasets: [
      {
        label: 'Sotuvlar 2024',
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Oylik Sotuvlar',
      },
    },
  };

  return <Line data={data} options={options} />;
}

export default LineChart;
