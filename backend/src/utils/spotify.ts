import axios from 'axios';

const getAlbumsByQuery = async (query: string) => {
  const reqOptions = {
    method: 'get',
    url: `https://api.spotify.com/v1/search?q=${query}&type=album&market=FI&limit=10`,
    headers: {
      'Authorization': `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`,
    }
  }
  return axios(reqOptions);
}

const getAlbumById = async (id: string) => {
  const reqOptions = {
    method: 'get',
    url: `https://api.spotify.com/v1/albums/${id}`,
    headers: {
      'Authorization': `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`,
    }
  }
  return axios(reqOptions);
}

export { getAlbumsByQuery, getAlbumById }