import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { LoginUser } from "../../actions/auth-actions";

import NavigationBar from "../NavigationBar";
import HomeScreen from "../HomeScreen";
import { GetUser } from "../../actions/user-actions";

const LoginScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.userReducer);

  const [user, setUser] = useState({});
  const [loginError, setError] = useState({});

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const loginBtn = () => {
    if (user.username && user.password) {
      LoginUser(dispatch, user)
        .then(() => {
          navigate("/home");
        })
        .catch((e) => {
          setError({ err: "Wrong username/password!" });
        });
    } else {
      setError({ err: "Input both username and password!" });
    }
  };

  useEffect(() => {
    GetUser(dispatch);
  }, [dispatch]);

  if (loggedInUser) {
    return <HomeScreen />;
  } else {
    return (
      <>
        <NavigationBar />

        <div className="container col-sm-9 col-md-6 col-lg-5 col-xl-4 mt-5 border p-4 border-secondary">
          <h1 className="text-center">Login</h1>
          <div className="ps-3 pe-3">
            <div className="mt-2">
              <label className="form-label" htmlFor="username-input">
                Username
              </label>
              <input
                onChange={(e) => {
                  inputChangeHandler(e);
                }}
                className="form-control"
                type="text"
                id="username-input"
                placeholder="Username"
                name="username"
              />
            </div>
            <div className="mt-2 mb-2">
              <label className="form-label" htmlFor="password-input">
                Password
              </label>
              <input
                onChange={(e) => {
                  inputChangeHandler(e);
                }}
                className="form-control"
                type="password"
                id="password-input"
                placeholder="Password..."
                name="password"
              />
              {loginError.err && (
                <div className="text-danger">{loginError.err}</div>
              )}
            </div>
            <div className="d-grid">
              <button onClick={loginBtn} className="btn btn-primary">
                Login
              </button>
            </div>
          </div>
          <label className="mt-2 ms-3">Need an Account?</label>{" "}
          <Link to="/register" className="mt-0 text-decoration-none">
            Signup now!
          </Link>{" "}
          It's free!
        </div>
        <footer className="text-center mb-2">
          &copy; Calvin Lee 2022 -
          <Link to="/privacypol" className="text-decoration-none">
            <span className="ms-2">Privacy Policy</span>
          </Link>
        </footer>
      </>
    );
  }
};

export default LoginScreen;
