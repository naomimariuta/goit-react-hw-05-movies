import React, { useEffect, useState } from 'react';
import { getMovieReviews } from 'services/movieService';
import Loader from 'components/Loader/Loader';
import styles from './Reviews.module.css';

const Reviews = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getMovieReviews(movieId);
        setReviews(data.results);
      } catch (err) {
        setError('Failed to fetch reviews. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      fetchReviews();
    }
  }, [movieId]);

  return (
    <div className={styles.reviewsContainer}>
      {loading && <Loader />}
      {error && <p className={styles.error}>{error}</p>}
      <h2>Reviews</h2>
      {reviews.length > 0 ? (
        reviews.map(review => (
          <div key={review.id} className={styles.reviewItem}>
            <h3>{review.author}</h3>
            <p>{review.content}</p>
          </div>
        ))
      ) : (
        <p>No reviews available for this movie.</p>
      )}
    </div>
  );
};

export default Reviews;
