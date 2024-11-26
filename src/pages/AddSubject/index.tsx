import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid"; // Import UUID library for generating unique IDs

function AddSubject() {
  const [name, setName] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Generate a unique ID for the subject
      const id = uuidv4();

      const res = await axios.post("http://localhost:8000/add-subject", {
        id, // Include the generated ID
        name,
        thumbnail,
      });

      if (res.status === 200) {
        setSuccess(res.data.message);
        setTimeout(() => navigate("/"), 1500); // Redirect to main page after success
      }
    } catch (error) {
      setError(
        error.response?.data?.detail
          ? JSON.stringify(error.response.data.detail)
          : "Failed to add subject. Please try again."
      );
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div
        className="card shadow-lg"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <div className="card-header text-center bg-primary text-white">
          <h3>Add New Subject</h3>
        </div>
        <div className="card-body">
          {success && <div className="alert alert-success">{success}</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Subject Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter subject name"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="thumbnail" className="form-label">
                Thumbnail URL
              </label>
              <input
                type="url"
                className="form-control"
                id="thumbnail"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                placeholder="Enter thumbnail URL"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Add Subject
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddSubject;
