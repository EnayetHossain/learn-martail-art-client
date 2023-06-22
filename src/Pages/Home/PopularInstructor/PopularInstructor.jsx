import { useEffect, useState } from "react";
import InstructorCard from "../InstrcutorCard/InstructorCard";
import "./PopularInstructor.css";

const PopularInstructor = () => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    fetch("https://learn-martial-server.vercel.app/instructors?limit=6")
      .then((res) => res.json())
      .then((data) => setInstructors(data));
  }, []);

  return (
    <section className="popular-instructor-section">
      <div className="cover-section">
        <h1>Popular instructor</h1>
      </div>
      <div className="popular-instructor-container desktop-max">
        {instructors.map((instructor) => (
          <InstructorCard
            key={instructor._id}
            instructor={instructor}
          ></InstructorCard>
        ))}
      </div>
    </section>
  );
};

export default PopularInstructor;
