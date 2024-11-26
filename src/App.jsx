import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import SubjectCard from "./components/SubjectCard";
import { useNavigate } from "react-router-dom";

function App() {
  const [subjects, setSubjects] = useState([]);

  const navigate = useNavigate();

  const getSubjects = async () => {
    try {
      const res = await axios.get("http://localhost:8000/get-subjects");
      setSubjects(res.data.subjects);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  useEffect(() => {
    getSubjects();
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        {subjects.map((subject, index) => (
          <SubjectCard subject={subject} key={index} />
        ))}
      </div>
      <button
        className="btn btn-primary mt-3"
        onClick={() => navigate("/add-subject")}
      >
        <i className="bi bi-plus me-2"></i> Add New Subject
      </button>
    </div>
  );
}

export default App;
