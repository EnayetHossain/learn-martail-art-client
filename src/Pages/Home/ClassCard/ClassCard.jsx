/* eslint-disable react/prop-types */
import "./ClassCard.css";

const ClassCard = ({ cls }) => {
  const { class_name, picture, price, students } = cls;

  return (
    <div>
      <div className="class-card">
        <div className="class-img">
          <img src={picture} alt={class_name} />
        </div>

        <div className="class-info">
          <p className="class-name">{class_name}</p>
          <div className="price-seats">
            <p className="price">price: ${price}</p>
            <p className="seats">Students: {students}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
