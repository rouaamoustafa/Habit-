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
    cutout: "70%",
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="donut-chart">
      <h3>{title}</h3>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DonutChart;
