// API functions for anything related to streaming services

let user_profile = process.env.REACT_APP_EC_PROFILE;
let streaming_services = process.env.REACT_APP_EC_SERVICES;
let all_playlists_url = process.env.REACT_APP_EC_ALL_PLAYLISTS;
let playlist_details_url = process.env.REACT_APP_EC_PLAYLIST_DETAILS;
let use_streaming_services = process.env.REACT_APP_EC_USER_STREAMING;
let genres_url = process.env.REACT_APP_EC_GENRES;
let playlist_data = process.env.REACT_APP_EC_PLAYLIST_DATA;
let get_playlist_data = process.env.REACT_APP_EC_GET_PLAYLIST_DATA;
let watchlist_details_url = process.env.REACT_APP_EC_WATCHLIST_DETAILS;
let favorites_details_url = process.env.REACT_APP_EC_FAVORITES_DETAILS;

let user_token = localStorage.getItem('token');

export async function getUserProfile() {
  const response = await fetch(user_profile, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user_token}`,
    },
  });

  const data = await response.json();

  const userProfile = {
      ...data,
  }

  return userProfile;
}

export async function postEcProfile(streaming_services) {
  const response = await fetch(user_profile, {
    method: 'POST',
    body: JSON.stringify(streaming_services),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user_token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return null;  
}

// Gets EC-Service Details
export async function getAllServices() {
  const response = await fetch(streaming_services);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch services.');
  }

  const loadedServices = [];

  for (const key in data) {
    const serviceObj = {
      id: key,
      ...data[key],
    };

    loadedServices.push(serviceObj);
  }

  return loadedServices;
}


// Posts new services chosen by user
export async function sendUserStreamingList(streamingList) {
  const response = await fetch(use_streaming_services, {
    method: 'POST',
    body: JSON.stringify(streamingList),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user_token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return null;

}




export async function getGenres() {
  const response = await fetch(genres_url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch services');
  }
  
  const genreList = [];

  //const res = data.filter(data => data.id === id);

  for (const key in data) {
    const objList = {
      id: key, 
      ...data[key],
    }
    genreList.push(objList);
    //console.log(query)
  }

  return genreList;

}


// All User's playlists they created
// User is logged in
export async function getAllUserPlaylists() {
  const response = await fetch(user_profile, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user_token}`,
    },
  });
  
  const data = await response.json();
  const playlists = data.user_playlists;

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch playlists.');
  }

  const userPlaylists = [];

  for (const key in playlists) {
    const playlistObj = {
      id: key,
      ...playlists[key],
    };
    userPlaylists.push(playlistObj);
  }

  return userPlaylists;
}


// All Playlists
// User doesn't have to be logged in
export async function getAllPlaylists() {
  const response = await fetch(all_playlists_url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch playlists.');
  }

  const allPlaylists = [];

  for (const key in data) {
    const playlistObj = {
      id: key,
      ...data[key],
    };

    allPlaylists.push(playlistObj);
  }

  return allPlaylists;
}


// Adds new user created playlist 
export async function addPlaylist(newPlayist) {
  const response = await fetch(playlist_details_url, {
    method: 'POST',
    body: JSON.stringify(newPlayist),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user_token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return null;

}


// Gets Playlist details
export async function getPlaylistDetails({id}) {
  const response = await fetch(`${playlist_details_url}/${id}/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      //'Authorization': `Bearer ${user_token}`,
    },
  });

  const data = await response.json();

  const playlistDetails = {
      ...data,
  }

  return playlistDetails;
}

export async function getWatchlilstDetails() {
  const response = await fetch(`${watchlist_details_url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  const data = await response.json()

  const watchlistDetails = {
    ...data
  }

  return watchlistDetails;
}



export async function getWatchlistDetails() {
  const response = await fetch(`${watchlist_details_url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  const data = await response.json()

  const watchlistDetials = {
    ...data
  }

  return watchlistDetials;
}




export async function getFavoritesDetails() {
  const response = await fetch(`${favorites_details_url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  const data = await response.json()

  const favoritesDetials = {
    ...data
  }

  return favoritesDetials;
}



// Gets Playlist data
export async function getPlaylistData(id) {
  const response = await fetch(`${get_playlist_data}${id}/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      //'Authorization': `Bearer ${user_token}`,
    },
  });

  const data = await response.json();

  const playlistData = [
      ...data,
  
]
  return playlistData;
}

export async function addItemToPlaylist(info) {
  const response = await fetch(`${playlist_data}`, {
    method: 'POST',
    body: JSON.stringify(info),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user_token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return null;
}

export async function deleteItemFromPlaylist(pl_data_id) {
  const response = await fetch(`${playlist_data}`, {
    method: 'DELETE',
    body: JSON.stringify(pl_data_id),
    headers: {
      'Content-Type': 'application/json',
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return null;

}