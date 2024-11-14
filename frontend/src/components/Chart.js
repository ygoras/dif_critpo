import React, { useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const CryptoChart = ({ data }) => {
  const chartData = {
    labels: data.map(point => point.time),
    datasets: [
      {
        label: 'Preço',
        data: data.map(point => point.price),
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
    ],
  };

  return <Line data={chartData} />;
};

export default CryptoChart;
