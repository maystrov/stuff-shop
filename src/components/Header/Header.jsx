import React from "react";

import styles from "../../styles/Header.module.css";
import { Link } from "react-router-dom";

import { ROUTES } from "../../utils/routes";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Link to={ROUTES.HOME} />
      </div>
    </div>
  );
};

export default Header;
