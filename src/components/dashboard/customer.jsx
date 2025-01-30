// CustomerPage.jsx
import { DualAxes } from '@ant-design/plots';
import React from 'react';

const CustomerPage = (props) => {
  const totalSales = props.totalMonthlySale;
  const totalMonthlyRatio = props.totalMonthlyRatio;
  console.log("totalMonthlyRatio", totalMonthlyRatio);
  const config = {
    xField: 'month',
    legend: {
      color: {
        position: 'bottom',
        layout: { justifyContent: 'center' },
      },
    },
    scale: { color: { range: ['#5B8FF9', '#5D7092', '#5AD8A6'] } },
    children: [
      {
        data: totalSales,
        type: 'interval',
        yField: 'totalSum',
        colorField: 'type',    
        group: true,
        style: { maxWidth: 50 },
        label: { position: 'inside' },
        interaction: { elementHighlight: { background: true } },
      },
      {
        data: totalMonthlyRatio,
        type: 'line',
        yField: '売上高総利益率',
        style: { lineWidth: 2 },
        axis: { y: { position: 'right' } },
        interaction: {
          tooltip: {
            crosshairs: false,
            marker: false,
          },
        },
      },
    ],
  };
  return <DualAxes {...config} />;
};

export default CustomerPage; // Ensure this line is present