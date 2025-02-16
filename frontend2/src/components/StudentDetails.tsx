import React from "react";
import StudentTable from "./studentTable";
import Charts from "./charts";

interface Student {
  Name: string;
  Regno: string;
  Year: string;
  Dept: string;
  Qualified: string;
  Marks: Record<string, number[]>; 
  "Total Questions": number;
  "Total Questions Attempted": number;
  "Total Marks": number;
  "Total Marks Obtained": number;
}

const StudentDetails: React.FC<{ student: Student }> = ({ student }) => {
  return (
    <div className="student-analysis-container">
      <div className="content-layout">
        {/* Left Section: Student Info */}
        <div className="left-section">
          <h2 className="details-title">Student Details</h2>
          <div className="student-card">
            <p><strong>Name:</strong> {student.Name}</p>
            <p><strong>Reg No:</strong> {student.Regno}</p>
            <p><strong>Year:</strong> {student.Year}</p>
            <p><strong>Department:</strong> {student.Dept}</p>
            <p><strong>Total Questions:</strong> {student["Total Questions"]}</p>
            <p><strong>Questions Attempted:</strong> {student["Total Questions Attempted"]}</p>
            <p><strong>Total Marks:</strong> {student["Total Marks"]}</p>
            <p><strong>Marks Obtained:</strong> {student["Total Marks Obtained"]}</p>
            <p><strong>Qualified:</strong> {student["Qualified"]}</p>
          </div>
        </div>

        {/* Right Section: Scrollable Table */}
        <div className="right-section">
          <h2 className="details-title">Exam Marks</h2>
          <div className="table-container">
            <StudentTable marks={student.Marks} />
          </div>
        </div>
      </div>

      {/* Center Section: Subject-wise Calculations */}
      <div className="subject-calculations">
        <h2 className="details-title">Subject-wise Calculations</h2>
        {/* Calculation details go here */}
      </div>

      {/* Bottom Section: Charts */}
      <div className="charts-container">
        <Charts marks={student.Marks} />
      </div>
    </div>
  );
};

export default StudentDetails;
