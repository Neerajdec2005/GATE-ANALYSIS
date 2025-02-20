import { useEffect, useState } from "react";
import { Trophy, User, BookOpen, PieChart, School, BookOpenCheck, Loader2 } from "lucide-react";

interface Student {
  name: string;
  regno: string;
  average: string;
}

const mapDisciplineToShortForm = (discipline: string): string => {
  const disciplineMap: Record<string, string> = {
    "COMPUTER SCIENCE": "CSE",
    "ELECTRICAL AND COMMUNICATION": "ECE",
    "ARTIFICIAL INTELLIGENCE AND DATASCIENCE": "AIDS",
    "BIO MEDICAL": "BME",
    "CIVIL": "CE",
    "ELECTRICAL AND ELECTRONICS": "EEE",
    "MECHANICAL": "ME",
  };

  return disciplineMap[discipline] || discipline;
};

function LeaderboardPage() {
  const [subjects, setSubjects] = useState<string[]>([]);
  const [leaderboard, setLeaderboard] = useState<Student[]>([]);
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedDiscipline) {
      setLoading(true);
      setError(null);
      const mappedDiscipline = mapDisciplineToShortForm(selectedDiscipline);
      fetch(`https://subjectwisedvnerfnvojfdgj.onrender.com/api/subjects/${mappedDiscipline}`)
        .then((res) => {
          if (!res.ok) throw new Error('Failed to fetch subjects');
          return res.json();
        })
        .then((data) => {
          setSubjects(data);
          setSelectedSubject(""); // Reset subject selection when discipline changes
        })
        .catch((err) => {
          console.error("Failed to fetch subjects:", err);
          setError("Failed to load subjects. Please try again.");
        })
        .finally(() => setLoading(false));
    }
  }, [selectedDiscipline]);

  useEffect(() => {
    if (selectedSubject && selectedDiscipline) {
      setLoading(true);
      setError(null);
      const mappedDiscipline = mapDisciplineToShortForm(selectedDiscipline);
      fetch(`https://subjectwisedvnerfnvojfdgj.onrender.com/api/leaderboard/${mappedDiscipline}/${selectedSubject}`)
        .then((res) => {
          if (!res.ok) throw new Error('Failed to fetch leaderboard');
          return res.json();
        })
        .then((data) => setLeaderboard(data))
        .catch((err) => {
          console.error("Failed to fetch leaderboard:", err);
          setError("Failed to load leaderboard. Please try again.");
        })
        .finally(() => setLoading(false));
    }
  }, [selectedSubject, selectedDiscipline]);

  const getRankStyle = (rank: number) => {
    if (rank === 1) return "bg-yellow-100 text-yellow-800";
    if (rank === 2) return "bg-gray-100 text-gray-800";
    if (rank === 3) return "bg-orange-100 text-orange-800";
    return "bg-blue-50 text-blue-800";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <nav className="flex items-center justify-between bg-white shadow-md px-6 py-4 mb-6 rounded-lg">
        <a href="https://gate-dashboard-fdf.vercel.app/"><span className="text-xl font-bold">Exam Tracker</span></a>
        <div className="flex items-center gap-6">
          <a href="https://gate-department-bfdbbrgbrg.vercel.app/" className="text-gray-800 hover:text-indigo-600 no-underline">Department</a>
          <a href="https://gate-gamma.vercel.app/" className="text-gray-800 hover:text-indigo-600 no-underline">Student</a>
          <a href="https://subject-wise-analysis-fdsgern.vercel.app/" className="text-gray-800 hover:text-indigo-600 no-underline">Topic-Wise</a>
          <a href="https://student-upload.vercel.app/" className="text-gray-800 hover:text-indigo-600 no-underline">Upload</a>
        </div>
      </nav>
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
            <div className="flex items-center justify-center gap-3 mb-2">
              <School className="w-8 h-8" />
              <h1 className="text-4xl font-extrabold">Subject-Wise Leaderboard</h1>
            </div>
            <p className="text-center text-blue-100">Track top performers across department</p>
          </div>

          {/* Filters */}
          <div className="p-6 bg-white border-b">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <BookOpen className="w-4 h-4 inline-block mr-2" />
                  Select Department
                </label>
                <select
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all"
                  value={selectedDiscipline}
                  onChange={(e) => setSelectedDiscipline(e.target.value)}
                >
                  <option value="">Choose department...</option>
                  <option value="COMPUTER SCIENCE">Computer Science</option>
                  <option value="ELECTRICAL AND COMMUNICATION">Electrical & Communication</option>
                  <option value="ARTIFICIAL INTELLIGENCE AND DATASCIENCE">AI & Data Science</option>
                  <option value="BIO MEDICAL">Biomedical</option>
                  <option value="CIVIL">Civil</option>
                  <option value="ELECTRICAL AND ELECTRONICS">Electrical & Electronics</option>
                  <option value="MECHANICAL">Mechanical</option>
                </select>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <BookOpenCheck className="w-4 h-4 inline-block mr-2" />
                  Select Subject
                </label>
                <select
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  disabled={!selectedDiscipline || subjects.length === 0}
                >
                  <option value="">Choose subject...</option>
                  {subjects.map((subject, index) => (
                    <option key={index} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          )}

          {/* Leaderboard */}
          {!loading && !error && leaderboard.length > 0 && (
            <div className="p-6">
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="p-4 text-left font-semibold text-gray-900">
                        <Trophy className="w-5 h-5 inline-block mr-2 text-blue-600" />
                        Rank
                      </th>
                      <th className="p-4 text-left font-semibold text-gray-900">
                        <User className="w-5 h-5 inline-block mr-2 text-blue-600" />
                        Name
                      </th>
                      <th className="p-4 text-left font-semibold text-gray-900">
                        <BookOpen className="w-5 h-5 inline-block mr-2 text-blue-600" />
                        Register No.
                      </th>
                      <th className="p-4 text-left font-semibold text-gray-900">
                        <PieChart className="w-5 h-5 inline-block mr-2 text-blue-600" />
                        Average
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {leaderboard.map((student, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 transition-colors duration-200"
                      >
                        <td className="p-4">
                          <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold ${getRankStyle(index + 1)}`}>
                            {index + 1}
                          </span>
                        </td>
                        <td className="p-4 font-medium text-gray-900">{student.name}</td>
                        <td className="p-4 text-gray-600">{student.regno}</td>
                        <td className="p-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                            {student.average}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && selectedSubject && leaderboard.length === 0 && (
            <div className="text-center p-12">
              <BookOpenCheck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Data Available</h3>
              <p className="text-gray-500">No leaderboard data found for the selected subject.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LeaderboardPage;
