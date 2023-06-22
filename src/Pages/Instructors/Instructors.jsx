import { useLoaderData } from "react-router-dom";
import DynamicTitle from "../../Routes/DynamicTitle";
import InstructorsCard from "../InstructorsCard/InstructorsCard";
import "./Instructors.css";

const Instructors = () => {
  DynamicTitle("Our Instructors");
  const instructors = useLoaderData();
  return (
    <section className="instructors-section">
      <div className="instructors-container desktop-max">
        {instructors.map((instructor) => (
          <InstructorsCard
            key={instructor._id}
            instructor={instructor}
          ></InstructorsCard>
        ))}
      </div>
    </section>
  );
};

export default Instructors;
