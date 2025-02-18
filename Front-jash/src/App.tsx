import React, { useState } from "react";
import axios from "axios";
import StudentDetails from "./components/StudentDetails";
import "./styles.css";

const App: React.FC = () => {
  const [Regno, setRegno] = useState(""); 
  const [student, setStudent] = useState<any>(null);
  const [error, setError] = useState(""); 

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.get(`https://studentanalysis4312412fdsfwdgwrff.onrender.com/students/${Regno}`);
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
<nav
  style={{
    backgroundColor: 'white',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '12px 24px',
    marginBottom: '16px',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1250px', // Limits navbar width
    width: '100%', // Ensures it adapts to smaller screens
    margin: '0 auto', // Centers the navbar
  }}
>
  <a
    href="#"
    style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: '20px', color: 'black' }}
  >
    Exam Tracker
  </a>
  <div style={{ display: 'flex', gap: '16px' }}>
    <a href="#" style={{ color: 'black', textDecoration: 'none', fontSize: '16px' }}>
      Department
    </a>
    <a href="#" style={{ color: 'black', textDecoration: 'none', fontSize: '16px' }}>
      Student
    </a>
    <a href="#" style={{ color: 'black', textDecoration: 'none', fontSize: '16px' }}>
      Topic-Wise
    </a>
    <a href="#" style={{ color: 'black', textDecoration: 'none', fontSize: '16px' }}>
      Upload
    </a>
  </div>
</nav>
<br />
<h1
  style={{
    textAlign: 'center', 
    width: '100%',
    fontSize: '28px',
    fontWeight: 'bold',
    margin: '20px 0'
  }}
>
  Student Exam Analysis
</h1>

<br />
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
