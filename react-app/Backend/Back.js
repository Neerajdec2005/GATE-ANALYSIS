import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://nira:123@cluster1.zbkf6.mongodb.net/Testdb?retryWrites=true&w=majority&appName=Cluster1')
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection failed:', err));

// Define Schema and Model
const marksSchema = new mongoose.Schema({
    Name: String,
    Regno: String,
    Year: String,
    Dept: String,
    Marks: {
        "Probability and Statistics": [Number],
        "Linear Algebra": [Number],
        "Calculus and Optimization": [Number],
        "Programs and DSA": [Number],
        "DBMS": [Number],
        "Machine Learning": [Number],
        "AI": [Number]
    },
    TotalQuestions: Number,
    TotalQuestionsAttempted: Number,
    TotalMarks: Number,
    TotalMarksObtained: Number,
    Qualified: String
},{ collection: 'Students_Data' });

const Marks = mongoose.model('Marks', marksSchema);

// Calculate average and provide feedback for all subjects
app.get('/feedback/:regno', async (req, res) => {
    try {
        const { regno } = req.params;
        const studentData = await Marks.findOne({Regno:String(regno)});
        // console.log("Student Data:", studentData);
        if (!studentData) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const feedbackReport = {};

        for (const [subject, marks] of Object.entries(studentData.Marks)) {
            if (marks.length > 0) {
                const avg_marks = marks.reduce((a, b) => a + b, 0) / marks.length;
                let feedback;

                if (avg_marks >= 90) {
                    feedback = "Excellent work! Keep it up. 🌟";
                } else if (avg_marks >= 75) {
                    feedback = "Good job! A little more practice can get you to the top. 👍";
                } else if (avg_marks >= 50) {
                    feedback = "Decent effort! Focus more on the weak areas. 📖";
                } else if (avg_marks >= 35) {
                    feedback = "Needs improvement. Let’s work on the fundamentals. 💡";
                } else {
                    feedback = "At risk! Immediate attention required. 🚨";
                }

                feedbackReport[subject] = { average: avg_marks, feedback };
            } else {
                feedbackReport[subject] = { average: 0, feedback: "No marks available" };
            }
        }

        res.json({ name: studentData.Name, regno: studentData.Regno, feedbackReport });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

app.listen(5020, () => console.log('Server running on port 5000'));
