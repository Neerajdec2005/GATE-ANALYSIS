import { useState } from "react";

type FeedbackInfo = {
  average: number;
  feedback: string;
};

type FeedbackReport = Record<string, FeedbackInfo>;

type FeedbackData = {
  name: string;
  regno: string;
  feedbackReport: FeedbackReport;
};

function Feedback() {
  const [regno, setRegno] = useState<string>("");
  const [feedbackData, setFeedbackData] = useState<FeedbackData | null>(null);

  const fetchFeedback = async () => {
    if (!regno) {
      alert("Please enter a roll number");
      return;
    }
    try {
      const response = await fetch(`http://localhost:5020/feedback/${regno}`);
      if (!response.ok) {
        throw new Error("Failed to fetch feedback data");
      }
      const data: FeedbackData = await response.json();
      setFeedbackData(data);
    } catch (error) {
      console.error("Error fetching feedback data:", error);
    }
  };

  return (
    <div className="p-6">
      <br />
      <h1 className="text-xl font-bold mb-4">Search Student Feedback</h1>
      <div className="mb-4" id="show1">
        <input
          type="text"
          placeholder="Enter Roll Number"
          value={regno}
          onChange={(e) => setRegno(e.target.value)}
          className="border border-gray-400 p-2 mr-2 rounded"
        />
        <button
          onClick={fetchFeedback}
          className="button"
        >
          Get Feedback
        </button>
      </div>

      {feedbackData && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold">
            Feedback for {feedbackData.name} (Reg No: {feedbackData.regno})
          </h2>
          <ul className="mt-4">
            {Object.entries(feedbackData.feedbackReport).map(
              ([subject, info]) => (
                <li key={subject} className="mb-2">
                  <strong>{subject.replace(/_/g, " ")}:</strong> Average:{" "}
                  {info.average}, Feedback: {info.feedback}
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Feedback;
