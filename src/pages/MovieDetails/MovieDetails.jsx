import React, { useEffect, useState, useRef } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import Loader from 'components/Loader/Loader';
import { getMovieInfo } from 'services/movieService';
import Cast from 'pages/Cast/Cast';
import Reviews from 'pages/Reviews/Reviews';
import styles from './MovieDetails.module.css';

const MovieDetails = () => {
  const { movieId } = useParams();
  const location = useLocation();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState(''); // To track active section

  const castRef = useRef(null);
  const reviewsRef = useRef(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getMovieInfo(movieId);
        setMovie(data);
        console.log(data);
      } catch (err) {
        setError('Failed to fetch movie details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    console.log(movieId);
    fetchMovieDetails();
  }, [movieId]);

  useEffect(() => {
    const path = location.pathname.split('/');
    if (path.includes('cast')) {
      setActiveSection('cast');
    } else if (path.includes('reviews')) {
      setActiveSection('reviews');
    } else {
      setActiveSection('');
    }
  }, [location]);

  const scrollToSection = section => {
    if (section === 'cast' && castRef.current) {
      castRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'reviews' && reviewsRef.current) {
      reviewsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  if (!movie) {
    return null && <Loader />;
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
          className={styles.link}
          onClick={() => {
            setActiveSection('cast');
            scrollToSection('cast');
          }}
        >
          Cast
        </Link>
        <Link
          to="reviews"
          className={styles.link}
          onClick={() => {
            setActiveSection('reviews');
            scrollToSection('reviews');
          }}
        >
          Reviews
        </Link>
      </nav>

      <div ref={castRef}>
        {activeSection === 'cast' && <Cast movieId={movieId} />}
      </div>
      <div ref={reviewsRef}>
        {activeSection === 'reviews' && <Reviews movieId={movieId} />}
      </div>
    </div>
  );
};

export default MovieDetails;
