import "./NewsLetter.css";

const NewsLetter = () => {
  return (
    <div className="subscribe-container">
      <h1 className="subscribe-title">
        Subscribe now to get
        <br /> latest information
      </h1>
      <p className="subscribe-description">
        Fill your email address and subscribe now to get more information about
        the <br /> Martial-art
      </p>
      <form className="subscribe-form">
        <input className="subscribe" type="email" placeholder="Email address" />
        <input type="submit" value={"subscribe"} />
      </form>
    </div>
  );
};

export default NewsLetter;
