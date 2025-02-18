import React from "react";

interface StudentTableProps {
  marks: Record<string, number[]>;
  subjects: string[];
}

const StudentTable: React.FC<StudentTableProps> = ({ marks, subjects }) => {
  const examCount = Object.values(marks)[0]?.length || 0;
  const exams = Array.from({ length: examCount }, (_, i) => `Exam ${i + 1}`);

  return (
    <div className="marks-table">
      <h2>Marks</h2>
      <table>
        <thead>
          <tr>
            <th>Exam</th>
            {subjects.map((subject) => (
              <th key={subject}>{subject}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {exams.map((exam, examIndex) => (
            <tr key={exam}>
              <td>{exam}</td>
              {subjects.map((subject) => (
                <td key={subject}>{marks[subject]?.[examIndex] || "-"}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;