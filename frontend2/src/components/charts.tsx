import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

interface ChartsProps {
  marks: Record<string, number[]>;
}

const Charts: React.FC<ChartsProps> = ({ marks }) => {
  if (!marks || Object.keys(marks).length === 0) {
    return <p className="error">No marks data available.</p>;
  }

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

  const colors = ["#4CAF50", "#FFC107", "#36A2EB", "#FF6384", "#FF9F40", "#9966FF", "#FFCD56"];

  return (
    <div className="charts-container">
      {Object.entries(marks).map(([subject, scores], index) => {
        const examCount = scores.length;
        const totalMarks = examCount * 100;
        const totalScores = scores.reduce((acc, curr) => acc + curr, 0);
        const marksLost = totalMarks - totalScores;

        const barData = {
          labels: scores.map((_, i) => `Exam ${i + 1}`),
          datasets: [
            {
              label: subject,
              data: scores,
              backgroundColor: colors,
            },
          ],
        };

        const pieData = {
          labels: ["Marks Obtained", "Marks Lost"],
          datasets: [
            {
              data: [totalScores, marksLost],
              backgroundColor: ["#4CAF50", "#FFC107"],
              hoverBackgroundColor: ["#388E3C", "#FFA000"],
            },
          ],
        };

        return (
          <div key={subject} className="subject-container">
            <div className="bar-chart-container">
              <Bar data={barData} options={{ responsive: true }} />
            </div>
            <div className="pie-chart-container">
              <Pie data={pieData} options={pieOptions} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Charts;
