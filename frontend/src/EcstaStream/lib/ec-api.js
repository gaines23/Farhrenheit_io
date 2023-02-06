// API functions for anything related to streaming services

let user_profile = process.env.REACT_APP_EC_PROFILE;
let streaming_services = process.env.REACT_APP_EC_SERVICES;
let user_playlists_url = process.env.REACT_APP_EC_USER_PLAYLISTS;
let all_playlists_url = process.env.REACT_APP_EC_ALL_PLAYLISTS;
let use_streaming_services = process.env.REACT_APP_EC_USER_STREAMING;

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

// EC-Service Details
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

export async function getGenres() {
  const response = await fetch(process.env.REACT_APP_EC_GENRES);
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


export async function addPlaylist(newPlayist) {
  const response = await fetch(user_playlists_url, {
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

export async function getAllUserPlaylists() {
  const response = await fetch(user_playlists_url, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user_token}`,
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch playlists.');
  }

  const userPlaylists = [];

  for (const key in data) {
    const playlistObj = {
      id: key,
      ...data[key],
    };

    userPlaylists.push(playlistObj);
  }

  return userPlaylists;
}


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



