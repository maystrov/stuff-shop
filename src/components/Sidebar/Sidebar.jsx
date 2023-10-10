import React, { useEffect } from "react";

import styles from "../../styles/Sidebar.module.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../features/categories/categoriesSlice";

const Sidebar = () => {
  const { list } = useSelector((store) => store.categories);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <section className={styles.sidebar}>
      <div className={styles.title}>Categories</div>
      <nav>
        <ul className={styles.menu}>
          {list.slice(0, 5).map((item) => (
            <li key={item.id}>
              <NavLink
                to={`/categories/${item.id}`}
                className={({ isActive }) => `${styles.link}  ${isActive ? styles.active : ""}`}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.footer}>
        <a href="/help" target="_blank" className={styles.link}>
          Help
        </a>
        <a
          href="/terms"
          target="_blank"
          className={styles.link}
          style={{ textDecoration: "underline" }}
        >
          Terms and conditions
        </a>
      </div>
    </section>
  );
};

export default Sidebar;
