import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const StudentModal = ({ isOpen, student, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    Name: "",
    Regno: "",
    Year: "",
    Dept: "",
    "Total Marks Obtained": "",
    Qualified: "",
  });

  useEffect(() => {
    if (student) {
      setFormData({
        Name: student.Name || "",
        Regno: student.Regno || "",
        Year: student.Year || "",
        Dept: student.Dept || "",
        "Total Marks Obtained": student["Total Marks Obtained"] || "",
        Qualified: student.Qualified || "",
      });
    }
  }, [student]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return isOpen ? (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <div className="edit-form-container">
          <h2>Edit Student Details</h2>
          <form onSubmit={handleSubmit} className="student-form">
            <div className="form-group">
              <label htmlFor="Name">Name:</label>
              <input
                type="text"
                id="Name"
                value={formData.Name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="Regno">Register Number:</label>
              <input
                type="text"
                id="Regno"
                value={formData.Regno}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="Year">Year:</label>
              <input
                type="number"
                id="Year"
                value={formData.Year}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="Dept">Department:</label>
              <input
                type="text"
                id="Dept"
                value={formData.Dept}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="Total Marks Obtained">Total Marks:</label>
              <input
                type="number"
                id="Total Marks Obtained"
                value={formData["Total Marks Obtained"]}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="Qualified">Qualified (Yes/No):</label>
              <input
                type="text"
                id="Qualified"
                value={formData.Qualified}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="submit-btn">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  ) : null;
};

const App = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState(null);

  const studentsPerPage = 10;

  useEffect(() => {
    fetchStudents();
  }, [sortOrder]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("https://departmentdatafinal.onrender.com/students");
      const sortedStudents = response.data.sort((a, b) => 
        sortOrder === "desc" ? b["Total Marks Obtained"] - a["Total Marks Obtained"] : a["Total Marks Obtained"] - b["Total Marks Obtained"]
      );
      setStudents(sortedStudents);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleEditStudent = (student) => {
    setIsModalOpen(true);
    setStudentToEdit(student);
  };

  const handleSaveStudent = async (student) => {
    try {
      await axios.put(`https://departmentdatafinal.onrender.com/students/${student.Regno}`, student);
      fetchStudents();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving student:", error);
    }
  };

  const departmentMapping = {
    CS: ["CSBS", "CSE", "CS", "IT"],
    DA: ["AIDS", "AIML"],
    CE: ["CIVIL"],
    BM: ["BME"],
    ME: ["MECH", "MCT"],
    EE: ["EEE"],
    EC: ["ECE", "ACT", "VLSI"]
  };
  
  const allDepartments = ["All", ...Object.keys(departmentMapping)];

  const filteredStudents = students.filter(student =>
    selectedDepartment === "All" || [selectedDepartment, ...(departmentMapping[selectedDepartment] || [])].includes(student.Dept)
  );

  const searchedStudents = filteredStudents.filter(student =>
    student.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.Regno.includes(searchTerm) ||
    student.Dept.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = searchedStudents.slice(indexOfFirstStudent, indexOfLastStudent);

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
    href="https://gate-analysis.vercel.app/"
    style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: '20px', color: 'black' }}
  >
    Exam Tracker
  </a>
  <div style={{ display: 'flex', gap: '16px' }}>
    <a href="https://department-analysis-fegrvrfgv34325.vercel.app/" style={{ color: 'black', textDecoration: 'none', fontSize: '16px' }}>
      Department
    </a>
    <a href="https://student-analyze-bfdfgr3245.vercel.app/" style={{ color: 'black', textDecoration: 'none', fontSize: '16px' }}>
      Student
    </a>
    <a href="https://subject-wise-analysis-fdsgern.vercel.app/" style={{ color: 'black', textDecoration: 'none', fontSize: '16px' }}>
      Topic-Wise
    </a>
    <a href="https://gate-analysis-kfcf.vercel.app/" style={{ color: 'black', textDecoration: 'none', fontSize: '16px' }}>
      Upload
    </a>
  </div>
</nav>
<br />


      <h2>Student Ranking Analysis</h2>
      <input type="text" placeholder="Search by Name, Register Number" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="search-box" />

      <div className="department-buttons">
        {allDepartments.map(dept => (
          <button key={dept} onClick={() => setSelectedDepartment(dept)} className={selectedDepartment === dept ? "active" : ""}>{dept}</button>
        ))}
      </div>

      <table className="student-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Register Number</th>
            <th>Year</th>
            <th>Department</th>
            <th>
              Marks
              <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="sort-marks-dropdown">
                <option value="desc">Highest to Lowest</option>
                <option value="asc">Lowest to Highest</option>
              </select>
            </th>
            <th>Qualified</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentStudents.map((student, index) => (
            <tr key={student.Regno}>
              <td>{indexOfFirstStudent + index + 1}</td>
              <td>{student.Name}</td>
              <td>{student.Regno}</td>
              <td>{student.Year}</td>
              <td>{student.Dept}</td>
              <td>{student["Total Marks Obtained"]}</td>
              <td style={{ color: student.Qualified === "YES" ? "green" : "red" }}>{student.Qualified}</td>
              <td><button onClick={() => handleEditStudent(student)}>Edit</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span> Page {currentPage} </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={indexOfLastStudent >= filteredStudents.length}
        >
          Next
        </button>
      </div>

      <StudentModal isOpen={isModalOpen} student={studentToEdit} onClose={() => setIsModalOpen(false)} onSave={handleSaveStudent} />
    </div>
  );
};

export default App;
