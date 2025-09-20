import React, { useRef, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

function Upload() {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex flex-col items-center justify-center h-[50vh]">
      <div
        onClick={handleUploadClick}
        className="w-[400px] h-[200px] border-2 border-dashed border-gray-400 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-amber-500 transition"
      >
        <FaCloudUploadAlt className="text-5xl text-amber-500 mb-2" />
        <p className="text-gray-600 text-sm">
          Drag & drop your job description here
        </p>
        <p className="text-gray-500 text-xs">(.pdf, .doc, .docx only)</p>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {fileName && (
        <div className="mt-4 p-2 px-4 bg-gray-100 rounded-lg text-gray-700 text-sm shadow">
          <strong>Selected:</strong> {fileName}
        </div>
      )}

      <button
        className="mt-6 bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600 transition"
        disabled={!fileName}
      >
        Upload
      </button>
    </div>
  );
}

export default Upload;
