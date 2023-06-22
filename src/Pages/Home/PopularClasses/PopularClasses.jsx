import { useEffect, useState } from "react";
import ClassCard from "../ClassCard/ClassCard";
import "./PopularClasses.css";

const PopularClasses = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetch("https://learn-martial-server.vercel.app/classes?limit=6")
      .then((res) => res.json())
      .then((data) => setClasses(data));
  }, []);

  return (
    <section className="popular-class-section">
      <div className="cover-section">
        <h1>Popular classes</h1>
      </div>
      <div className="popular-class-container desktop-max">
        {classes.map((cls) => (
          <ClassCard key={cls._id} cls={cls}></ClassCard>
        ))}
      </div>
    </section>
  );
};

export default PopularClasses;
