import DynamicTitle from "../../../Routes/DynamicTitle";
import Banner from "../Banner/Banner";
import NewsLetter from "../NewsLetter/NewsLetter";
import PopularClasses from "../PopularClasses/PopularClasses";
import PopularInstructor from "../PopularInstructor/PopularInstructor";
import "./Home.css";

const Home = () => {
  DynamicTitle("Home Page");
  return (
    <div>
      <Banner></Banner>
      <PopularClasses></PopularClasses>
      <PopularInstructor></PopularInstructor>
      <NewsLetter></NewsLetter>
    </div>
  );
};

export default Home;
