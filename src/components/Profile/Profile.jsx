import React, { useEffect, useState } from "react";
import styles from "../../styles/Profile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../features/user/userSlice";

const Profile = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (currentUser) {
      setValues((prevValues) => {
        const updatedValues = { ...prevValues };
        for (const key in currentUser) {
          updatedValues[key] = currentUser[key] || "";
        }
        return updatedValues;
      });
    } else {
      //   setValues((prevValues) => {
      //     const updatedValues = {};
      //     Object.keys(prevValues).forEach((key) => {
      //       updatedValues[key] = "";
      //     });
      //     return updatedValues;
      //   });
      setValues({ ...values });
    }
  }, [currentUser]);

  function handleChange({ target: { value, name } }) {
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: null });
  }

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
      dispatch(updateUser(values));
    }
  };

  return (
    <section className={styles.profile}>
      {!currentUser ? (
        <span>You need to log in or create an account</span>
      ) : (
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

          <button type="submit" className={styles.submit}>
            Update profile
          </button>
        </form>
      )}
    </section>
  );
};

export default Profile;
