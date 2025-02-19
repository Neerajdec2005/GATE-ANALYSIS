import express from "express";
import mongoose from "mongoose";
import cors from 'cors';

const app = express();
const PORT = 5079;

// Enable CORS
app.use(cors({
  origin: "http://localhost:5173",
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://nira:123@cluster1.zbkf6.mongodb.net/testinsert?retryWrites=true&w=majority&appName=Cluster1"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection failed:", err));

// Define the student schema
const studentSchema = new mongoose.Schema(
  {
    Name: String,
    Regno: String,
    Year: String,
    Dept: String,
    Marks: Object, // Dynamic subject keys
    TotalQuestions: Number,
    TotalQuestionsAttempted: Number,
    TotalMarks: Number,
    TotalMarksObtained: Number,
    Qualified: String,
  },
  { collection: "testing" }
);

const Student = mongoose.model("Student", studentSchema);

// API to get subjects for a particular discipline
app.get('/api/subjects/:discipline', async (req, res) => {
  const discipline = req.params.discipline;
  try {
    const students = await Student.find({ Dept: discipline });
    const subjects = new Set();

    students.forEach((student) => {
      Object.keys(student.Marks).forEach((subject) => {
        subjects.add(subject);
      });
    });

    res.json([...subjects]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching subjects" });
  }
});

// API to get leaderboard for a particular subject and discipline
app.get('/api/leaderboard/:discipline/:subject', async (req, res) => {
  const { discipline, subject } = req.params;
  try {
    const students = await Student.find({ Dept: discipline });
    const leaderboard = [];

    students.forEach((student) => {
      const marksArray = student.Marks[subject];
      if (marksArray) {
        const avgMarks =
          marksArray.reduce((acc, mark) => acc + mark, 0) / marksArray.length;

        leaderboard.push({
          name: student.Name,
          regno: student.Regno,
          average: avgMarks.toFixed(2),
        });
      }
    });

    // Sort leaderboard by average marks in descending order
    leaderboard.sort((a, b) => b.average - a.average);

    res.json(leaderboard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching leaderboard" });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));