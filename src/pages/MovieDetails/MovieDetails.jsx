import React, { useEffect, useState } from 'react';
import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import Loader from 'components/Loader/Loader';
import { getMovieInfo } from 'services/movieService';
import styles from './MovieDetails.module.css';

const MovieDetails = () => {
  const { movieId } = useParams();
  const location = useLocation();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getMovieInfo(movieId);
        setMovie(data);
      } catch (err) {
        setError('Failed to fetch movie details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  if (!movie) {
    return null;
  }

  return (
    <div className={styles.movieDetailsContainer}>
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <p>{movie.overview}</p>

      <nav className={styles.detailsContainer}>
        <Link
          to="cast"
          className={
            location.pathname.includes('cast') ? styles.activeLink : styles.link
          }
        >
          Cast
        </Link>
        <Link
          to="reviews"
          className={
            location.pathname.includes('reviews')
              ? styles.activeLink
              : styles.link
          }
        >
          Reviews
        </Link>
      </nav>

      <Outlet />
    </div>
  );
};

export default MovieDetails;
