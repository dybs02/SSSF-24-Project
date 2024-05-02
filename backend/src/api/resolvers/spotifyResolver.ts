import axios from 'axios';

export default {
  Query: {
    spotifyAlbumsByQuery: async (
      _parent: undefined,
      args: { query: string },
    ) => {
      const reqOptions = {
        method: 'get',
        url: `https://api.spotify.com/v1/search?q=${args.query}&type=album&market=FI&limit=10`,
        headers: {
          'Authorization': `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`,
        }
      }
      const response = await axios(reqOptions);

      return response.data.albums.items.map((album: any) => {
        return {
          id: album.id,
          name: album.name,
          artist: album.artists[0].name,
          image: album.images[0].url,
        }
      });
    },
    spotifyAlbumById: async (
      _parent: undefined,
      args: { id: string },
    ) => {
      const reqOptions = {
        method: 'get',
        url: `https://api.spotify.com/v1/albums/${args.id}`,
        headers: {
          'Authorization': `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`,
        }
      }
      const response = await axios(reqOptions);

      const album = response.data;
      return {
        id: album.id,
        name: album.name,
        artist: album.artists[0].name,
        image: album.images[0].url,
      }
    },

  },
};