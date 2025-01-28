import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({ title, value, color }) => {
  const data = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        data: [value, 100 - value],
        backgroundColor: [color, "#eaeaea"],
        hoverBackgroundColor: [color, "#eaeaea"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow the chart to resize with its container
    cutout: "70%", // Inner radius
    plugins: {
      legend: {
        display: false, // Hide legend
      },
    },
  };

  return (
    <div className="grid-container">
      <div className="donut-chart">
      <h3>{title}</h3>
      <Doughnut data={data} options={options} />
    </div>
    </div>
  );
};

export default DonutChart;
