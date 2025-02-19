import React, { useState, useEffect } from "react";
import Select from "react-select"; // Import React-Select
import StudentTable from "./studentTable";
import Charts from "./charts";
import axios from "axios";
import ReactMarkdown from "react-markdown"; // Import react-markdown for parsing markdown

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
  const [feedback, setFeedback] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(`https://studentanalysis4312412fdsfwdgwrff.onrender.com/feedback/${student.Regno}`);
        setFeedback(response.data.feedback);
      } catch (error) {
        console.error("Error fetching feedback:", error);
        setFeedback("Could not generate feedback at this time.");
      }
    };

    fetchFeedback();
  }, [student.Regno]);

  const allSubjects = Object.keys(student.Marks);
  const subjectOptions = [
    { value: "all", label: "All Subjects" },
    ...allSubjects.map((subject) => ({ value: subject, label: subject })),
  ];

  const handleSelection = (selectedOptions: any) => {
    const selectedValues = selectedOptions.map((option: any) => option.value);
    if (selectedValues.includes("all")) {
      setSelectedSubjects(allSubjects); // Select all subjects
    } else {
      setSelectedSubjects(selectedValues);
    }
  };

  return (
    <div className="student-analysis-container">
      {/* Drop-down box for Subjects */}
      <div className="dropdown-box">
        <label htmlFor="subject-select"></label>
        <Select
          id="subject-select"
          options={subjectOptions}
          isMulti
          onChange={handleSelection}
          placeholder="Select Subject"
          className="custom-select"
        />
      </div><br></br>

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
            <StudentTable marks={student.Marks} subjects={selectedSubjects.length ? selectedSubjects : allSubjects} />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-container">
        <Charts marks={student.Marks} />
      </div><br></br><br></br>

      {/* Feedback Section */}
      <div className="feedback-section">
        <h2 className="details-title">Performance overall Feedback</h2>
        <div className="feedback-text">
          {/* Render the markdown feedback using ReactMarkdown */}
          {feedback ? (
            <ReactMarkdown>
              {feedback}
            </ReactMarkdown>
          ) : (
            <p>Generating feedback...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
