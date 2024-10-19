import React, { Suspense } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import styles from './SharedLayout.module.css';
import Scroll from 'components/Scroll/Scroll';
import Loader from 'components/Loader/Loader';

const SharedLayout = () => {
  return (
    <div className={styles.App}>
      <nav className={styles.navbar}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? styles['active-link'] : styles['link']
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/movies"
          className={({ isActive }) =>
            isActive ? styles['active-link'] : styles['link']
          }
        >
          Movies
        </NavLink>
      </nav>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
      <Scroll />
    </div>
  );
};

export default SharedLayout;
