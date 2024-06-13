import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import SubjectCard from "./components/SubjectCard";

function App() {
  const [subjects, setSubjects] = useState([]);

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
    </div>
  );
}

export default App;
