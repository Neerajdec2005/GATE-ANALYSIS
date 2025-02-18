import React, { useState } from "react";
import axios from "axios";
import StudentDetails from "./components/StudentDetails";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";



const App: React.FC = () => {
  const [Regno, setRegno] = useState(""); // User input for RegNo
  const [student, setStudent] = useState<any>(null); // Student data
  const [error, setError] = useState(""); // Error handling

  // Fetch student details
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.get(`https://jashwanth-1.onrender.com/students/${Regno}`);
      setStudent(response.data);
    } catch (error) {
      console.error("Error fetching student:", error);
      setError("Student not found!");
      setTimeout(() => setError(""), 3000);
      setStudent(null);
    }
  };

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4 py-3 mb-4 rounded">
  <a href="https://gate-analysis.vercel.app/" className="text-decoration-none"><span className="navbar-brand fw-bold">Exam Tracker</span></a>
  <div className="d-flex gap-3"> <br />
    <a href="#" className="text-dark text-decoration-none">Explore</a>
    <a href="https://gate-analyze.vercel.app/" className="text-dark text-decoration-none">Analysis</a>
    <a href="https://gate-feedback.vercel.app/" className="text-dark text-decoration-none">Feedback</a>
  </div>
</nav>
<br />
      <h3 className="analysis-title">Student Exam Analysis</h3>
<br /><br />
      {/* Search Form */}
      <form onSubmit={handleSearch} className="search-bar-container">
        <input
          type="text"
          className="search-input"
          placeholder="Enter Reg No"
          value={Regno}
          onChange={(e) => setRegno(e.target.value)}
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      {/* Display Results */}
      {error && <p className="error">{error}</p>}
      {student && <StudentDetails student={student} />}
    </div>
  );
};

export default App;
