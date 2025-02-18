import React, { useState } from "react";
import axios from "axios";
import { UploadCloud, CheckCircle, XCircle } from "lucide-react"; // Icons

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [key, setKey] = useState(Date.now()); // Reset file input after upload

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("❌ Please select a file first.");
      return;
    }

    setIsUploading(true); // Show loading state

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("https://uploadstudentdata124234asfdgergreff.onrender.com/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(response.data.message);
      setFile(null);
      setKey(Date.now());
    } catch (error) {
      console.error("❌ Upload failed:", error);
      setMessage("❌ Error uploading file.");
    } finally {
      setIsUploading(false); // Hide loading state
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
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
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upload Student Data</h2>
        
        <label className="cursor-pointer border-dashed border-2 border-gray-300 p-6 rounded-lg w-full flex flex-col items-center justify-center mb-4 hover:bg-gray-50">
          <UploadCloud className="w-10 h-10 text-blue-500 mb-2" />
          <span className="text-gray-600">Click to select file</span>
          <input key={key} type="file" accept=".xlsx, .xls" onChange={handleFileChange} className="hidden" />
        </label>

        {file && <p className="text-gray-700 text-sm mb-2">📂 {file.name}</p>}

        <button
          onClick={handleUpload}
          className={`w-full py-2 rounded-lg text-white font-medium transition ${
            isUploading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Upload File"}
        </button>

        {message && (
          <div
            className={`mt-4 flex items-center justify-center gap-2 text-sm font-medium p-2 rounded-lg ${
              message.includes("✅") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {message.includes("✅") ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
            <span>{message}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
