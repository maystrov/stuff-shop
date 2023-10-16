import React, { useState } from "react";

import styles from "../../styles/User.module.css";
import { createUser, toggleForm } from "./userSlice";
import { useDispatch } from "react-redux";

const UserSignupForm = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
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
      dispatch(createUser(values));
      dispatch(toggleForm(false));
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.close} onClick={() => dispatch(toggleForm(false))}>
        <svg className="icon">
          <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`} />
        </svg>
      </div>

      <div className={styles.title}>Sign Up</div>

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

        <div className={`${styles.group} ${errors.name && styles.error}`}>
          <input
            type="name"
            placeholder="Your name"
            name="name"
            value={values.name}
            autoComplete="off"
            onChange={handleChange}
          />
        </div>
        {errors.name && <div className={styles.errorMessage}>Fill name field</div>}

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

        <div className={`${styles.group} `}>
          <input
            className={`${errors.avatar && styles.error}`}
            type="avatar"
            placeholder="Your avatar"
            name="avatar"
            value={values.avatar}
            autoComplete="off"
            onChange={handleChange}
          />
        </div>
        {errors.avatar && <p className={styles.errorMessage}>Fill avatar field</p>}

        <div className={styles.link}>I already have an account</div>

        <button type="submit" className={styles.submit}>
          Create an account
        </button>
      </form>
    </div>
  );
};

export default UserSignupForm;
