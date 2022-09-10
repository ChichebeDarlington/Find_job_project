import { useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { Logo, FormRow, Alert } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../context/appContext";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
  //   showAlert: false,
};

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);

  const {
    isLoading,
    showAlert,
    displayAlert,
    registerUser,
    loginUser,
    user,
    setUpUser,
  } = useAppContext();

  //global state and useNavigate;

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    // console.log(e.target);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }

    const currentUser = { email, name, password };
    if (isMember) {
      setUpUser({
        currentUser,
        endPoint: "login",
        alertText: "You have successfully logged in!",
      });
    } else {
      setUpUser({
        currentUser,
        endPoint: "register",
        alertText: "You have successfully registered",
      });
    }

    // console.log(values);
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {showAlert && <Alert />}
        {/* {name input} */}
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            handleChange={handleChange}
            value={values.name}
          />
        )}
        {/* {email input} */}
        <FormRow
          type="email"
          name="email"
          handleChange={handleChange}
          value={values.email}
        />{" "}
        {/* {password input} */}
        <FormRow
          type="password"
          name="password"
          handleChange={handleChange}
          value={values.password}
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          submit
        </button>
        <p>
          {values.isMember ? "Already a member?" : "Not yet a member?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {!values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
