/* eslint-disable react/prop-types */
import "./InstructorsCard.css";

const InstructorsCard = ({ instructor }) => {
  const { photo, name, email } = instructor;
  return (
    <div className="instructors-card">
      <div className="instructors-img">
        <img src={photo} alt={name} />
      </div>
      <div className="instructors-info">
        <p className="instructors-name">{name}</p>
        <p className="instructors-email">{email}</p>
      </div>
    </div>
  );
};

export default InstructorsCard;
