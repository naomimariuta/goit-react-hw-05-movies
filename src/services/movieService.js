import axios from 'axios';
import { Notify } from 'notiflix';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'b4a37daab61b0e2cbc84b0608fc0fe04';

const parameters = {
  position: 'center-center',
  timeout: 4000,
  width: '750px',
  fontSize: '30px',
};

export async function getPopularFilms(page = 1) {
  try {
    const response = await axios.get(`${BASE_URL}/trending/movie/day`, {
      params: { api_key: API_KEY, page: page || 1 },
    });
    return response.data;
  } catch (error) {
    onError(error);
  }
}

export async function getMovieInfo(id) {
  const response = await axios.get(`${BASE_URL}/movie/${id}`, {
    params: { api_key: API_KEY },
  });
  return response.data;
}

export async function getMovieCast(id) {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}/credits?`, {
      params: { api_key: API_KEY },
    });
    return response.data;
  } catch (error) {
    onError(error);
  }
}

export async function getMovieReviews(id) {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}/reviews?`, {
      params: { api_key: API_KEY },
    });
    return response.data;
  } catch (error) {
    onError(error);
  }
}

// export async function getMovieByKeyword(keyword, page = 1) {
//   const response = await axios.get(
//     `${BASE_URL}/search/movie?include_adult=false?language=en-US&page=1`,
//     {
//       params: { api_key: API_KEY, query: keyword, page: page },
//     }
//   );
//   return response.data;
// }

export async function getMovieByKeyword(keyword, page = 1) {
  const response = await axios.get(`${BASE_URL}/search/movie`, {
    params: {
      api_key: API_KEY,
      query: keyword,
      page: page,
      language: 'en-US',
      include_adult: false,
    },
  });
  return response.data;
}

export async function getMoviesByGenres() {
  try {
    const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
      params: { api_key: API_KEY, language: 'en' },
    });
    return response.data;
  } catch (error) {
    onError(error.message);
  }
}

export async function getMovieTrailer(id) {
  const response = await axios.get(`${BASE_URL}/movie/${id}/videos`, {
    params: { api_key: API_KEY },
  });
  return response.data;
}

export function onError(error) {
  console.error('An error occurred:', error);
  Notify.failure(
    'Oops! Something went wrong! Try reloading the page or make another choice!',
    parameters
  );
}
