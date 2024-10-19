import React, { Suspense, lazy, useState } from 'react';
import { Route, Routes, NavLink, Navigate } from 'react-router-dom';
import Loader from './Loader/Loader';
import styles from './App.module.css';
import Scroll from './Scroll/Scroll';

const Home = lazy(() => import('../pages/Home/Home'));
const Movies = lazy(() => import('../pages/Movies/Movies'));
const MovieDetails = lazy(() => import('../pages/MovieDetails/MovieDetails'));
const Cast = lazy(() => import('../pages/Cast/Cast'));
const Reviews = lazy(() => import('../pages/Reviews/Reviews'));

const App = () => {
  const [movies, setMovies] = useState([]);

  return (
    <>
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
          <Routes>
            <Route index element={<Home />} />
            <Route
              path="/movies"
              element={<Movies movies={movies} setMovies={setMovies} />}
            />
            <Route path="/movies/:movieId" element={<MovieDetails />}>
              <Route path="cast" element={<Cast />} />
              <Route path="reviews" element={<Reviews />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </div>
      <Scroll />
    </>
  );
};

export default App;
