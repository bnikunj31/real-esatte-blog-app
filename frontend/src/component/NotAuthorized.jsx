// NotAuthorized.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const NotAuthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-gray-100">
      <div className="max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="mb-4 text-2xl font-bold text-red-600">Access Denied</h1>
        <p className="mb-6 text-gray-700">
          You are not authorized to access the admin page. Please return to the
          home page.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default NotAuthorized;
