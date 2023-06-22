/* eslint-disable react/prop-types */
import "./InstructorCard.css";

const InstructorCard = ({ instructor }) => {
  const { photo, name } = instructor;
  return (
    <div>
      <div className="instructor-card">
        <div className="instructor-img">
          <img src={photo} alt={name} />
        </div>
      </div>
    </div>
  );
};

export default InstructorCard;
