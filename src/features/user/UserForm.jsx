import React from "react";
import { useDispatch, useSelector } from "react-redux";
import UserSignupForm from "./UserSignupForm";
import styles from "../../styles/User.module.css";
import { toggleForm } from "./userSlice";
const UserForm = () => {
  const { showForm } = useSelector(({ user }) => user);
  const dispatch = useDispatch();

  return showForm ? (
    <>
      <div className={styles.overlay} onClick={() => dispatch(toggleForm(false))} />
      <UserSignupForm />
    </>
  ) : (
    <></>
  );
};

export default UserForm;
