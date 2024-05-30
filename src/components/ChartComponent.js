import React from 'react';
import { Bar } from 'react-chartjs-2';

const ChartComponent = ({ users }) => {
  const data = {
    labels: users.map(user => new Date(user.lastLogin).toLocaleDateString()),
    datasets: [
      {
        label: 'User Count',
        data: users.map(user => user.count),
        backgroundColor: 'rgba(75, 192, 192, 0.6)'
      }
    ]
  };

  return <Bar data={data} />;
};

export default ChartComponent;
