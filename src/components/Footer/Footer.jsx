import React from "react";

import { ROUTES } from "../../utils/routes";

import styles from "../../styles/Footer.module.css";
import { Link } from "react-router-dom";
import LOGO from "../../images/logo.svg";

const Footer = () => {
  return (
    <section className={styles.footer}>
      <div className={styles.logo}>
        <Link to={ROUTES.HOME} />
        <img src={LOGO} alt="Stuff" />
      </div>

      <div className={styles.rights}>
        Developed by&nbsp;
        <a href="https://github.com/maystrov" target="_blank" rel="noreferrer">
          Maystrov Evgeniy
        </a>
      </div>

      <div className={styles.socials}>
        <a href="https://instagram.com/jekamai" target="_blank" rel="noreferrer">
          <svg className="icon">
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#instagram`} />
          </svg>
        </a>
        <a href="https://www.youtube.com/@user-hm3lt3yz3k" target="_blank" rel="noreferrer">
          <svg className="icon">
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#youtube`} />
          </svg>
        </a>
        <a href="https://facebook.com" target="_blank" rel="noreferrer">
          <svg className="icon">
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#facebook`} />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Footer;
