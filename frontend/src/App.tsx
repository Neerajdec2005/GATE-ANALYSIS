import React, { useEffect, useState } from "react";
import {
  BarChart3,
  BookOpen,
  BrainCircuit,
  GraduationCap,
  LineChart,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const monthlyData = [
  { name: "2018", students: 850, avgScore: 680 },
  { name: "2019", students: 920, avgScore: 695 },
  { name: "2020", students: 980, avgScore: 705 },
  { name: "2021", students: 1050, avgScore: 715 },
  { name: "2022", students: 1150, avgScore: 725 },
  { name: "2023", students: 1250, avgScore: 685 },
  { name: "2024", students: 1250, avgScore: 685 },
];

const subjectData = [
  { name: "CS", students: 425, progress: 85 },
  { name: "DA", students: 380, progress: 72 },
  { name: "EC", students: 310, progress: 65 },
  { name: "EE", students: 395, progress: 78 },
  { name: "BM", students: 275, progress: 58 },
  { name: "CE", students: 275, progress: 58 },
  { name: "ME", students: 275, progress: 58 },
];

const COLORS = [
  "#004d9f",
  "#ff9300",
  "#22c55e",
  "#3b82f6",
  "#e6e62d",
  "#ef4444",
  "#a855f7",
];



function App() {
  const [totalStudents, setTotalStudents] = useState<number | null>(null);
  const [averageScore, setAverageScore] = useState<string | null>(null);
  const [successRate, setSuccessRate] = useState<string | null>(null);
  const [qualifiedStudents, setQualifiedStudents] = useState<number | null>(null);
  const [monthlyData, setMonthlyData] = useState([]);
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch("http://localhost:5002/");
        const data = await response.json();
  
        if (data.collectionCounts && data.collections) {
          // Get total students count
          setTotalStudents(data.collectionCounts.Students_Data);
  
          // Fetch all students
          const students = data.collections.Students_Data;
          if (!students || students.length === 0) return;
  
          // Compute Total Marks Obtained & Total Marks
          const totalMarksObtained = students.reduce((sum, student) => sum + student["Total Marks Obtained"], 0);
          const totalMarks = students.reduce((sum, student) => sum + student["Total Marks"], 0);
          const average = totalMarks ? ((totalMarksObtained / totalMarks) * 1000).toFixed(2) : "0";
  
          // Compute Qualified Students
          const qualified = students.filter(student => student["Qualified"] === "YES").length;
  
          // Compute Success Rate
          const successRateValue = ((qualified / students.length) * 100).toFixed(2);
  
          setAverageScore(average);
          setQualifiedStudents(qualified);
          setSuccessRate(successRateValue);

          const yearlyData = students.reduce((acc, student) => {
            const year = student.Year;
            if (!acc[year]) {
              acc[year] = { students: 0, totalMarksObtained: 0, totalMarks: 0 };
            }
            acc[year].students += 1;
            acc[year].totalMarksObtained += student["Total Marks Obtained"];
            acc[year].totalMarks += student["Total Marks"];
            return acc;
          }, {});

          // Convert processed data into required format
          const computedMonthlyData = Object.keys(yearlyData).map((year) => ({
            name: year,
            students: yearlyData[year].students,
            avgScore: yearlyData[year].totalMarks
              ? (yearlyData[year].totalMarksObtained / yearlyData[year].totalMarks) * 1000
              : 0,
          }));

          setMonthlyData(computedMonthlyData);
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
  
    fetchStudentData();
  }, []);
  

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6">
    {/* Navigation Bar */}
    <nav className="flex items-center justify-between bg-white shadow-md px-6 py-4 mb-6 rounded-lg">
      <span className="text-xl font-bold">Exam Tracker</span>
      <div className="flex items-center gap-6">
        <a href="#" className="text-gray-800 hover:text-indigo-600 no-underline">Explore</a>
        <a href="#" className="text-gray-800 hover:text-indigo-600 no-underline">Analysis</a>
        <a href="#" className="text-gray-800 hover:text-indigo-600 no-underline">Feedback</a>
      </div>
    </nav>

    {/* Dashboard Header */}
    <header className="mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
            <Users className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gate Analytics Dashboard</h1>
            <p className="text-gray-600">GATE Students Performance</p>
          </div>
        </div>
        <div className="ml-auto">
          <select className="bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm">
            <option>GATE</option>
            <option>GRE</option>
          </select>
        </div>
      </div>
    </header>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<Users className="h-6 w-6 text-indigo-600" />}
          title="Total Students"
          value={totalStudents !== null ? totalStudents.toLocaleString() : "Loading..."}
          trend=""
          trendUp={true}
        />
      <StatCard
  icon={<BarChart3 className="h-6 w-6 text-green-600" />}
  title="Average Score"
  value={averageScore !== null ? averageScore : "Loading..."}
  trend=""
  trendUp={true}
/>

<StatCard
  icon={<TrendingUp className="h-6 w-6 text-purple-600" />}
  title="Success Rate (%)"
  value={successRate !== null ? successRate + "%" : "Loading..."}
  trend=""
  trendUp={true}
/>

<StatCard
  icon={<GraduationCap className="h-6 w-6 text-purple-600" />}
  title="Qualified Students"
  value={qualifiedStudents !== null ? qualifiedStudents : "Loading..."}
  trend=""
  trendUp={true}
/>

      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard title="Student Growth & Performance">
          <AreaChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Area yAxisId="left" dataKey="students" stroke="#6366f1" fillOpacity={0.1} />
            <Area yAxisId="right" dataKey="avgScore" stroke="#22c55e" fillOpacity={0.1} />
          </AreaChart>
        </ChartCard>

        <ChartCard title="Department-wise Distribution">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={subjectData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="students"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {subjectData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        </ChartCard>
      </div>
      <ChartCard title="Department Performance Analysis">
      <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="progress" fill="#6366f1" name="Progress">
                  {subjectData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
</ChartCard>

<br />
      {/* Online References */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Online References</h2>
        <div className="space-y-4">
          <InsightCard title="" url="https://gateflix.in/gate-free-zone/" img="https://gateflix.in/wp-content/uploads/2020/04/logo-01.png" />
          <InsightCard title="" url="https://www.vidyalankar.org/gate/study-material" img="https://www.vidyalankar.org/assets/img/logo.png" />
          <InsightCard title="" url="https://www.gatexplore.com/study-material/" img="https://i0.wp.com/www.gatexplore.com/wp-content/uploads/2017/10/GATExplore-Logo.png?fit=536%2C141&ssl=1" />
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, trend, trendUp }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-4 mb-4">{icon}</div>
      <h3 className="font-medium text-gray-600">{title}</h3>
      <div className="flex items-end justify-between">
  <span className="text-2xl font-bold text-gray-900">{value}</span>
  <span className={`text-sm ${trendUp ? "text-green-600" : "text-red-600"}`}>{trend}</span>
</div>

    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">{title}</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">{children}</ResponsiveContainer>
      </div>
    </div>
  );
}

function InsightCard({ title, url, img }) {
  return (
    <a href={url} target="_blank" className="block p-4 bg-gray-50 rounded-lg">
      <img src={img} alt={title} className="h-10 w-auto" />
      <p className="text-gray-900 font-medium mt-2">{title}</p>
    </a>
  );
}

export default App;
