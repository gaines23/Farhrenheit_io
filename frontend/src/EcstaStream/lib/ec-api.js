// API functions for anything related to streaming services

let streaming_services = process.env.REACT_APP_EC_SERVICES;
let new_playlist_url = process.env.REACT_APP_EC_NEW_PLAYLIST;

// EC-Service Details
export async function getServicesDetails() {
  const response = await fetch(streaming_services);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch services.');
  }

  const transformedServices = [];

  for (const key in data) {
    const serviceObj = {
      id: key,
      ...data[key],
    };

    transformedServices.push(serviceObj);
  }

  return transformedServices;
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


export async function addPlaylist({newPlayist}) {
  const response = await fetch(new_playlist_url, {
    method: 'POST',
    body: JSON.stringify({newPlayist}),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return null;

}