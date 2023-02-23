// Base API URLs - reduces duplicate data
const tmbd = process.env.REACT_APP_TMBD_URL;
const key = process.env.REACT_APP_TMBD_KEY;

// TMBD URLs
const TMDB_API_URL = `?api_key=${key}&language=en-US`;
const IMDB_TO_TMDB = `?api_key=${key}&language=en-US&external_source=imdb_id`;

const SEARCH_RESULTS_TMDB = `${tmbd}/search/multi?api_key=${key}&language=en-US&page=1&include_adult=false&region=us&query=`;
const TRENDING_TMBD = `${tmbd}/trending/all/week?api_key=${key}`;
const DETAIL_DROPDOWN_CARD_TMDB = `?api_key=${key}&language=en-US&append_to_response=videos`;

const MOVIE_DETAILS_URL = `?api_key=${key}&language=en-US&append_to_response=videos%2Crecommendations%2Cexternal_ids%2Ccredits`;
const TV_DETAILS_URL = `?api_key=${key}&language=en-US&append_to_response=videos%2Crecommendations%2Cexternal_ids%2Caggregate_credits`;
const STREAMING_LIST_URL = `watch/providers?api_key=${key}`;
const CREDITS_DETAILS_URL = `?api_key=${key}&language=en-US&append_to_response=combined_credits`;


// TMBD API
const TMBD_POSTER_w500 = 'https://image.tmdb.org/t/p/w500';
const TMBD_POSTER_w780 = 'https://image.tmdb.org/t/p/w780';
const TMBD_POSTER_w45 = 'https://image.tmdb.org/t/p/w45';
const TMDB_POSTER_w92 = 'https://image.tmdb.org/t/p/w92';


export {
    SEARCH_RESULTS_TMDB,
    TRENDING_TMBD,
    TMBD_POSTER_w500,
    DETAIL_DROPDOWN_CARD_TMDB,
    TMBD_POSTER_w780,
    TMBD_POSTER_w45,
    TMDB_API_URL,
    MOVIE_DETAILS_URL,
    TV_DETAILS_URL,
    STREAMING_LIST_URL,
    CREDITS_DETAILS_URL,
    IMDB_TO_TMDB,
    TMDB_POSTER_w92,
}