import { useLoaderData } from "react-router-dom";
import DynamicTitle from "../../Routes/DynamicTitle";
import ClassesCard from "../ClassesCard/ClassesCard";
import "./Classes.css";

const Classes = () => {
  DynamicTitle("Classes");
  const classes = useLoaderData();
  return (
    <section className="classes-section">
      <div className="classes-container desktop-max">
        {classes.map((cls) => (
          <ClassesCard key={cls._id} cls={cls}></ClassesCard>
        ))}
      </div>
    </section>
  );
};

export default Classes;
