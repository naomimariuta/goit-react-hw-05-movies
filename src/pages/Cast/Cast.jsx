import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from 'components/Loader/Loader';
import styles from './Cast.module.css';
import { getMovieCast } from 'services/movieService';

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]); // Default to an empty array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCast = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getMovieCast(movieId);
        console.log(data);
        // Check if data and data.cast are defined and is an array
        if (data && Array.isArray(data.cast)) {
          setCast(data.cast);
        } else {
          throw new Error('Invalid cast data received from API');
        }
      } catch (err) {
        setError('Failed to fetch cast information. Please try again later.');
        console.error(err); // Log the error for debugging
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      fetchCast();
    }
  }, [movieId]);

  return (
    <div className={styles.castContainer}>
      {loading && <Loader />}
      {error && <p className={styles.error}>{error}</p>}
      <h2>Cast</h2>
      <ul className={styles.castList}>
        {cast.length > 0 ? (
          cast.map(actor => (
            <li key={actor.cast_id}>
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
                className={styles.actorImage}
              />
              <p>
                {actor.name} as {actor.character}
              </p>
            </li>
          ))
        ) : (
          <p>No cast information available.</p>
        )}
      </ul>
    </div>
  );
};

export default Cast;
