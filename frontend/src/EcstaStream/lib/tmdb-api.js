import { 
    SEARCH_RESULTS_TMDB, 
    DETAIL_DROPDOWN_CARD_TMDB, 
    TMDB_API_URL,
    MOVIE_DETAILS_URL,
    TV_DETAILS_URL,
    STREAMING_LIST_URL,
    CREDITS_DETAILS_URL,
    IMDB_TO_TMDB,
} from "./constants";
import format from "date-fns/format";


let url = process.env.REACT_APP_TMBD_URL;
let mdba_url = process.env.REACT_APP_MDBA_URL;
let imdb_url_full_credits = process.env.REACT_APP_IMDB_FULL_CREDITS_URL;
let imdb_awards = process.env.REACT_APP_IMDB_AWARDS_URL;
let imdb_bio = process.env.REACT_APP_IMDB_GET_BIO;
let imdb_credit_awards = process.env.REACT_APP_IMDB_CREDIT_AWARDS;
let imdb_credit_awards_summary = process.env.REACT_APP_IMDB_CREDIT_AWARD_SUMMARY;
let imdb_actor_credits = process.env.REACT_APP_ACTOR_FULL_CREDITS;

//let ec_genres = process.env.REACT_APP_EC_GENRES;

const options = { 
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_MBDA_KEY,
	    'X-RapidAPI-Host': process.env.REACT_APP_MBDA_HEADERS
    }
}

const imdbOptions = {
    method: 'GET',
	headers: {
		'X-RapidAPI-Key': process.env.REACT_APP_IMDB_KEY,
		'X-RapidAPI-Host': process.env.REACT_APP_IMDB_HEADERS
    }
}

// Searches: Movies, Tv, People
export async function getMultiSearchResults(search) {
    const response = await fetch(`${SEARCH_RESULTS_TMDB}${search}`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(response.status_message);
    }

    const results = await data['results'];
    const searchResults = [];

    for (const key in results) {
        const listObj = {
            id: key,
            ...results[key],
        };
        searchResults.push(listObj);
    }
    
    return searchResults;
}

// Gets movie details for movie card modal
export async function getMovieCardDetails(movieId) {
    const response = await fetch(`${url}/movie/${movieId}${DETAIL_DROPDOWN_CARD_TMDB}`);
    const data = await response.json();

    if(!response.ok) {
        throw new Error(response.status_message);
    }

    const loadedDetails = {
        id: movieId,
        ...data,
    };

    return loadedDetails;

}

// Gets tv details for tv card modal
export async function getTVCardDetails(tvId) {
    const response = await fetch(`${url}/tv/${tvId}${DETAIL_DROPDOWN_CARD_TMDB}`);
    const data = await response.json();

    if(!response.ok) {
        throw new Error(response.status_message);
    }

    const loadedDetails = {
        id: tvId,
        ...data,
    };

    return loadedDetails;

}

export async function getMovieDetails({media_type, id}) {
    const response = await fetch(`${url}/${media_type}/${id}${MOVIE_DETAILS_URL}`);
    const data = await response.json();

    const imdb = await data['external_ids'].imdb_id;
    const mdba_response = await fetch(`${mdba_url}${imdb}`, options);
    const mdba_data = await mdba_response.json();

    if(!response.ok) {
        throw new Error(response.status_message);
    }
    
    let tmdb_id = data.id;
    let bg_pic = data.backdrop_path;
    let poster = data.poster_path;
    let trailer = data.videos.results[0].key;    
    let title = mdba_data.Title;
    let release_year = mdba_data.Year;
    let rated = mdba_data.Rated;
    let runtime = mdba_data.Runtime;
    let genres = mdba_data.Genre;
    let plot = mdba_data.Plot;
    let ratings = mdba_data.Ratings;
    let boxOffice = mdba_data.BoxOffice;
    let imdb_id = imdb;
    let similar = data.recommendations['results'];
    let media = media_type;
    let credits = data.credits['cast'].slice(0,16);
    let crew = data.credits['crew'];
    let series = data.belongs_to_collection;

    const movieDetails = {
        bg_pic,
        poster, 
        title, 
        release_year,
        rated,
        runtime,
        genres,
        plot,
        boxOffice,
        ratings,
        imdb_id,
        trailer,
        similar,
        media,
        tmdb_id,
        credits,
        series,
        crew,
    };

    return movieDetails;
}

export async function getTvDetails({id, media_type}) {
    const response = await fetch(`${url}/${media_type}/${id}${TV_DETAILS_URL}`);
    const data = await response.json();

    const imdb = await data['external_ids'].imdb_id;
    const mdba_response = await fetch(`${mdba_url}${imdb}`, options);
    const mdba_data = await mdba_response.json();

    if(!response.ok || !mdba_response.ok) {
        throw new Error(response.status_message);
    }

    let tmdb_id = data.id;
    let bg_pic = data.backdrop_path;
    let poster = data.poster_path;
    let trailer = data.videos.results[0].key;    
    let title = mdba_data.Title;
    let release_year = mdba_data.Year;
    let rated = mdba_data.Rated;
    let runtime = mdba_data.Runtime;
    let genres = mdba_data.Genre;
    let plot = mdba_data.Plot;
    let ratings = mdba_data.Ratings;
    let imdb_id = imdb;
    let similar = data.recommendations['results'];
    let media = media_type;
    let creators = data.created_by;
    let air_date = data.first_air_date;
    let finale_date = data.last_air_date; 
    let num_episodes = data.number_of_episodes;
    let num_seasons = data.number_of_seasons;
    let next_ep = data.next_episode_to_air;
    let seasons = data.seasons;
    let credits = data.aggregate_credits['cast'].slice(0,16);
    let crew = data.aggregate_credits['crew'].slice(0,16);

    const tvDetails = {
        bg_pic,
        poster, 
        title, 
        release_year,
        rated,
        runtime,
        genres,
        plot,
        ratings,
        imdb_id,
        trailer,
        similar,
        media,
        creators,
        air_date,
        finale_date,
        num_episodes,
        num_seasons,
        next_ep,
        seasons,
        tmdb_id,
        credits,
        crew
    };
    
    return tvDetails;
}

export async function getStreamingDetails({id, media_type}) {
    const response = await fetch(`${url}/${media_type}/${id}/${STREAMING_LIST_URL}`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(response.status_message);
    }

    let streaming = await data['results'].US;

    if (streaming === undefined) {
        return
    }

    let rent = data['results'].US.rent;
    let free = data['results'].US.flatrate;
    let buy = data['results'].US.buy;
    let ads = data['results'].US.ads;

    const streamingDetails = {
        rent,
        free,
        buy,
        ads
    }

    return streamingDetails;
}


export async function getSeriesDetails(id) {
    const response = await fetch(`${url}/collection/${id}${TMDB_API_URL}`);
    const data = await response.json();
    
    if(!response.ok) {
        throw new Error(response.status_message);
    }

    const seriesDetails ={
        ...data,
    }

    return seriesDetails;
}

// Cast/Crew IMDB id
export async function getCastCrewImdbId(id) {
    const response = await fetch(`${url}/person/${id}${TMDB_API_URL}`);
    const data = await response.json();

    const imdb_id = await data['imdb_id'];

    if(!response.ok) {
        throw new Error(response.status_message);
    }

    const loadedImdbId = {
        id: id,
        imdb_id,
    }

    return loadedImdbId;
}

// Cast/Crew list for Movies/Tv
export async function getCastCrewDetails(id) {
    const response = await fetch(`${imdb_url_full_credits}${id}`, imdbOptions);
    const data = await response.json();

    if(!response.ok) {
        throw new Error(response.status_message);
    }

    let cast = data['cast'];
    let crew = data['crew'];

    const loadedDetails = {
        cast,
        crew
    }

    return loadedDetails;
}

export async function getMediaAwards(id) {
    const response = await fetch(`${imdb_awards}${id}`, imdbOptions);
    const data = await response.json();

    const mdba_response = await fetch(`${mdba_url}${id}`, options);
    const mdba_data = await mdba_response.json();

    if (!response.ok) {
        throw new Error(response.status_message);
    }

    let awards = data['resource']['awards'];
    let nominations = awards['nominations'];
    let summary = mdba_data['Awards'];

    const loadedAwards = {
        awards,
        summary,
        nominations,
    }

    return loadedAwards;
}


// Credits Page - Actor/Crew Person Details
export async function getCreditDetails({tmdbId, imdbId}) {
    const tmdb_response = await fetch(`${url}/person/${tmdbId}${CREDITS_DETAILS_URL}`);
    const tmdb_data = await tmdb_response.json();

    const imdb_response = await fetch(`${imdb_bio}${imdbId}`, imdbOptions);
    const imdb_data = await imdb_response.json();

    if (!tmdb_response.ok || !imdb_response.ok) {
        throw new Error(tmdb_response.status_message || imdb_response.status_message);
    }

    let name = tmdb_data.name;
    let img = imdb_data.image;
    let birthday = format(new Date(tmdb_data.birthday), "MM/dd/yyyy");;
    let birthplace = tmdb_data.place_of_birth;
    let feet = Math.floor(imdb_data.heightCentimeters/30.48);
    let inches = Math.floor(imdb_data.heightCentimeters%12);
    let bio = tmdb_data.biography;
    let known_for = tmdb_data.known_for_department;
    let total_credits = (tmdb_data.combined_credits.cast.length + tmdb_data.combined_credits.crew.length);

    let top_credits = tmdb_data.combined_credits.cast
    .sort((a, b) => a.popularity < b.popularity)
    .sort((a,b) => a.vote_count < b.vote_count)
    .sort((e, f) => e.vote_average < f.vote_average)
    .sort((a) => a.episode_count <= 10)
    .sort((a) => a.order >= 3)
    .slice(0,8);
    
    const loadedDetails = {
        name,
        img,
        birthday,
        birthplace,
        feet,
        inches,
        bio,
        known_for,
        top_credits,
        total_credits,
    }

    return loadedDetails;
}

// Credits Page - movie, tv, crew info
export async function getActorCredits({imdbId}) {
    const response = await fetch(`${imdb_actor_credits}${imdbId}`, imdbOptions);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(response.status_message);
    }

    let acting = await data.filmography
        .sort(data.filmography.year)
        .filter(item => (item.category === 'actress') || (item.category === 'actor')).slice(0,20);
    
    
    
    // let self = data.filmography.filter(item => item.category === 'self');
    // let producer = data.filmography.filter(item => item.category === 'producer');
    // let writer = data.filmography.filter(item => item.category === 'writer');
    // let director = data.filmography.filter(item => item.category === 'director');
    

    const loadedActorCredits = {
        acting,
        // self,
        // producer,
        // writer,
        // director,
    }

    return loadedActorCredits;
}

// Credits Page - Imdb_Id -> Tmdb_Id
export async function getCreditsTmdbId(imdbId) {
    const tmdb_response = await fetch(`${url}/find/${imdbId}${IMDB_TO_TMDB}`);
    const tmdb_data = await tmdb_response.json();

    const results = [];
    if (tmdb_data.movie_results !== '') {
        results.push(tmdb_data.movie_results);
    }

    if (tmdb_data.tv_results !== '') {
        results.push(tmdb_data.tv_results);
    }

    return results;
}

// Credits Page - awards info
export async function getCreditAwards({imdbId}) {
    const response = await fetch(`${imdb_credit_awards}${imdbId}`, imdbOptions);
    const data = await response.json();

    const summary = await fetch(`${imdb_credit_awards_summary}${imdbId}`, imdbOptions);
    const summary_data = await summary.json();

    if (!response.ok) {
        throw new Error(response.status_message);
    }

    let summary_totals = summary_data.awardsSummary;
    const all_awards = await data.resource.awards;

    // const x = new Date(all_awards.awards['year']);
    // const by_year = x.getFullYear();

    const sort_awards = all_awards.sort(all_awards.year).slice(-15);

    const loadedAwards = {
        all_awards,
        sort_awards,
        summary_totals
    }

    return loadedAwards;
}