import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Pie, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface ChartsProps {
  marks: Record<string, number[]>;
}

const Charts: React.FC<ChartsProps> = ({ marks }) => {
  const [selectedCharts, setSelectedCharts] = useState<string[]>([]);

  if (!marks || Object.keys(marks).length === 0) {
    return <p className="error">No marks data available.</p>;
  }

  const handleCheckboxChange = (subject: string) => {
    setSelectedCharts((prevSelected) =>
      prevSelected.includes(subject)
        ? prevSelected.filter((item) => item !== subject)
        : [...prevSelected, subject]
    );
  };

  const colors = [
    "#4CAF50", "#FFC107", "#36A2EB", "#FF6384", "#FF9F40", "#9966FF", "#FFCD56",
  ];

  // Line Chart Data (Based on Exams)
  const examCount = Math.max(...Object.values(marks).map((examScores) => examScores.length));
  const lineChartData = {
    labels: Array.from({ length: examCount }, (_, i) => `Exam ${i + 1}`),
    datasets: Object.keys(marks).map((subject, index) => {
      const data = Array.from({ length: examCount }, (_, examIndex) => {
        // Get the value for the exam, or use 0 if it's missing
        const score = marks[subject][examIndex] !== undefined ? marks[subject][examIndex] : 0;
  
        return Object.values(marks).reduce((acc, curr) => acc + (curr[examIndex] || 0), 0) / Object.keys(marks).length;
      });
  
      return {
        label: subject,
        data: data,
        borderColor: colors[index % colors.length],
        backgroundColor: `rgba(${colors[index % colors.length].slice(1)}, 0.2)`,
        fill: true,
      };
    }),
  };

  // Line Chart Options
  const lineChartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          title: function (tooltipItems: any) {
            // We can customize the title here, but let's keep it simple
            return `Exam ${tooltipItems[0].label}`;
          },
          label: function (tooltipItem: any) {
            // Show the subject and score for the current point
            const dataset = tooltipItem.dataset;
            return `${dataset.label}: Score - ${tooltipItem.raw}`;
          },
        },
      },
    },
    hover: {
      mode: "nearest", // Only show the nearest point
      intersect: true, // Ensures it only triggers when hovering directly over a point
    },
  };

  return (
    <div className="charts-container">
      {/* Sticky Checkbox Section */}
      <div className="checkbox-container">
        {Object.keys(marks).map((subject) => (
          <div key={subject} className="checkbox-item">
            <input
              type="checkbox"
              id={subject}
              checked={selectedCharts.includes(subject)}
              onChange={() => handleCheckboxChange(subject)}
            />
            <label htmlFor={subject}>{subject}</label>
          </div>
        ))}
      </div>

      {/* Line Chart Based on Exams */}
      <div className="line-chart-container">
        <Line data={lineChartData}  />
      </div>

      {/* Render Selected Bar and Pie Charts */}
      {selectedCharts.map((subject, index) => {
        const scores = marks[subject];
        const totalMarks = scores.length * 100;
        const totalScores = scores.reduce((acc, curr) => acc + curr, 0);
        const marksLost = totalMarks - totalScores;

        const barData = {
          labels: scores.map((_, i) => `Exam ${i + 1}`),
          datasets: [{
            label: subject,
            data: scores,
            backgroundColor: colors[index % colors.length],
          }],
        };

        const pieData = {
          labels: ["Marks Obtained", "Marks Lost"],
          datasets: [{
            data: [totalScores, marksLost],
            backgroundColor: ["#4CAF50", "#FFC107"],
          }],
        };

        return (
          <div key={subject} className="subject-container">
            <div className="bar-chart-container">
              <Bar data={barData} options={{ responsive: true }} />
            </div>
            <div className="pie-chart-container">
              <Pie data={pieData} options={{ responsive: true }} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Charts;
