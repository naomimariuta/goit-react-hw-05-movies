import React, { useState } from 'react';
import { getMovieByKeyword } from 'services/movieService';
import Loader from 'components/Loader/Loader';
import styles from './Movies.module.css';
import { NavLink } from 'react-router-dom';

const Movies = ({ movies, setMovies }) => {
  const [query, setQuery] = useState('');
  // const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = event => {
    setQuery(event.target.value);
  };

  const handleSearchSubmit = async event => {
    event.preventDefault();
    if (query.trim() === '') {
      setError('Please enter a movie name to search.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await getMovieByKeyword(query);
      setMovies(data.results); // Assuming 'results' contains the movie array
    } catch (err) {
      setError('Failed to fetch movies. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.moviesContainer}>
      <h1>Search for Movies</h1>
      <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
        <input
          type="text"
          placeholder="Search movies by name"
          value={query}
          onChange={handleInputChange}
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>

      {loading && <Loader />}
      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.movieList}>
        {movies.map(movie => (
          <div key={movie.id} className={styles.movieCard}>
            <NavLink to={`/movies/${movie.id}`}>
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                    : '/placeholder-image.png'
                }
                alt={movie.title}
                className={styles.moviePoster}
              />
            </NavLink>
            <h3>{movie.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
