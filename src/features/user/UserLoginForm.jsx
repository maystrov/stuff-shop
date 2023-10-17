import React, { useState } from "react";

import styles from "../../styles/User.module.css";
import { loginUser, toggleForm } from "./userSlice";
import { useDispatch } from "react-redux";

const UserSignupForm = ({ closeForm, toggleCurrentFormType }) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: null });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = {};

    Object.keys(values).forEach((key) => {
      if (!values[key]) {
        validationErrors[key] = "error";
      }
    });

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      dispatch(loginUser(values));
      closeForm();
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.close} onClick={() => dispatch(toggleForm(false))}>
        <svg className="icon">
          <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`} />
        </svg>
      </div>

      <div className={styles.title}>Log In</div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={`${styles.group} ${errors.email && styles.error}`}>
          <input
            type="email"
            placeholder="Your email"
            name="email"
            value={values.email}
            autoComplete="off"
            onChange={handleChange}
          />
        </div>
        {errors.email && <div className={styles.errorMessage}>Fill email field</div>}

        <div className={`${styles.group} ${errors.password && styles.error}`}>
          <input
            type="password"
            placeholder="Your password"
            name="password"
            value={values.password}
            autoComplete="off"
            onChange={handleChange}
          />
        </div>
        {errors.password && <div className={styles.errorMessage}>Fill password field</div>}

        <div className={styles.link} onClick={() => toggleCurrentFormType("signup")}>
          Create an account
        </div>

        <button type="submit" className={styles.submit}>
          Login
        </button>
      </form>
    </div>
  );
};

export default UserSignupForm;
