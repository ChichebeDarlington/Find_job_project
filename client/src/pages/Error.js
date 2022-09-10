import { Link } from "react-router-dom";
import img from "../assets/images/not-found.svg";
import Wrapper from "../assets/wrappers/ErrorPage";

const Error = () => {
  return (
    <Wrapper className="full-page">
      <div>
        <img src={img} alt="not found" />
        <p>We can't seem seem to find the page you looking for</p>
        <Link to="/">Back to Home</Link>
      </div>
    </Wrapper>
  );
};

export default Error;
