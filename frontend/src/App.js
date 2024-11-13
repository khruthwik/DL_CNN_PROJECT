import React, { useState, useCallback } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi"; // Icon for upload indication

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    setSelectedFile(acceptedFiles[0]);
    setResult(null);
    setError(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    maxFiles: 1,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setError("Please select an image file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    setIsLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:8000/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(response.data);
    } catch (err) {
      setError("Error occurred while processing the image.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-600">
      <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-lg transform transition duration-500 hover:scale-105">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Potato Disease Classifier</h1>
        
        <div
          {...getRootProps()}
          className={`flex flex-col items-center w-full p-6 border-2 border-dashed rounded-lg transition duration-200 ${
            isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-100"
          } cursor-pointer`}
        >
          <input {...getInputProps()} />
          <FiUploadCloud className="text-blue-500 text-5xl mb-3" />
          {isDragActive ? (
            <p className="text-blue-600">Drop the image here...</p>
          ) : (
            <p className="text-gray-500">Drag & drop an image here, or click to select one</p>
          )}
        </div>

        {selectedFile && (
          <p className="text-green-600 text-sm mt-2 text-center">Selected file: {selectedFile.name}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4 mt-6">
          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-lg text-white font-semibold transition duration-300 ${
              isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Predict"}
          </button>
        </form>

        {result && (
          <div className="mt-8 p-6 bg-green-100 rounded-lg text-green-800 shadow-inner">
            <h2 className="text-lg font-semibold text-center">Prediction Result</h2>
            <p className="text-center">Class: <span className="font-bold">{result.class}</span></p>
            <p className="text-center">Confidence: <span className="font-bold">{(result.confidence * 100).toFixed(2)}%</span></p>
          </div>
        )}

        {error && <p className="mt-4 text-center text-red-500 font-medium">{error}</p>}
      </div>
    </div>
  );
}

export default App;
