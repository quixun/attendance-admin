import React from "react";
import { Link } from "react-router-dom";

function SubjectCard({ subject }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        <img
          src={subject.thumbnail}
          className="card-img-top h-100"
          alt={subject.name}
          style={{ objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title">{subject.name}</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <Link className="btn btn-primary" to={`/subjects/${subject.id}`}>
            Manager Student Attendance
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SubjectCard;
