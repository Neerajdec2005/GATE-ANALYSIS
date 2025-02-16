import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

interface ChartsProps {
  totalMarks: number;
  marksObtained: number;
}

const Charts: React.FC<ChartsProps> = ({ totalMarks, marksObtained }) => {
  const marksLost = totalMarks - marksObtained;

  const pieData = {
    labels: ["Marks Obtained", "Marks Lost"],
    datasets: [
      {
        data: [marksObtained, marksLost],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverBackgroundColor: ["#2B8BC6", "#D94A5F"],
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            let value = tooltipItem.raw;
            return ` ${value} Marks`;
          },
        },
      },
    },
  };

  return (
    <div className="charts-container">
      <h2 className="chart-title">Marks Distribution</h2>
      <div className="chart-item">
        <div className="chart-wrapper">
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>
      <h3 className="exam-count">Total Exams: 5</h3>
    </div>
  );
};

export default Charts;
