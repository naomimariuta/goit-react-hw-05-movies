import React, { useEffect, useState } from 'react';
import { getPopularFilms } from 'services/movieService';
import Loader from 'components/Loader/Loader';
import styles from './Home.module.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getPopularFilms();
        setMovies(data.results); // Assuming 'results' contains the movie array
      } catch (err) {
        setError('Failed to fetch trending movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <div className={styles.homeContainer}>
      <h1>Trending Movies</h1>
      {loading && <Loader />}
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.movieList}>
        {movies.map(movie => (
          <div key={movie.id} className={styles.movieCard}>
            <a href={`/movies/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                className={styles.moviePoster}
              />
            </a>
            <h3>{movie.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
