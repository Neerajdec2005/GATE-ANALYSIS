import React from "react";

const StudentTable: React.FC<{ marks: Record<string, number[]> }> = ({ marks }) => {
  const examCount = Object.values(marks)[0].length;
  const exams = Array.from({ length: examCount }, (_, i) => `Exam ${i + 1}`);

  return (
    <div className="marks-table">
      <h2>Marks</h2>
      <table>
        <thead>
          <tr>
            <th>Exam</th>
            {Object.keys(marks).map((subject) => (
              <th key={subject}>{subject}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {exams.map((exam, examIndex) => (
            <tr key={exam}>
              <td>{exam}</td>
              {Object.entries(marks).map(([subject, scores]) => (
                <td key={subject}>{scores[examIndex]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
