import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import './IncomeExpenseChart.css'

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const IncomeExpenseChart = ({ transaction }) => {

  const incomeData = [];
  const expenseData = [];
  const labels = [];

  transaction.forEach(transaction => {
    labels.push(transaction.date);
    if (transaction.type === 'income') {
      incomeData.push(transaction.amount);
      expenseData.push(null); 
    } else if (transaction.type === 'expense') {
      expenseData.push(transaction.amount);
      incomeData.push(null); 
    }
  });

  const data = {
    labels,
    datasets: [
      {
        label: 'Income',
        data: incomeData,
        borderColor: 'green',
        fill: false,
      },
      {
        label: 'Expense',
        data: expenseData,
        borderColor: 'red',
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Amount',
        },
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return (
    <div>
      {transaction.length> 0 && 
      <>
       <h2 className='title'>Income and Expenses</h2>
       <Line data={data} options={options} className='displayChart'/>
      </>
      }
    </div>
  );
};

export default IncomeExpenseChart;
