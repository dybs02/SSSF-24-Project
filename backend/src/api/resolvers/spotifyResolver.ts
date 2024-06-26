import { authenticate } from '../../middlewares';
import { getAlbumById, getAlbumsByQuery } from '../../utils/spotify';

export default {
  Query: {
    spotifyAlbumsByQuery: async (
      _parent: undefined,
      args: { query: string },
      context: any
    ) => {
      await authenticate(context.req, context.res);
      const response = await getAlbumsByQuery(args.query);

      return response.data.albums.items.map((album: any) => {
        return {
          id: album.id,
          name: album.name,
          artist: album.artists.map((artist: any) => artist.name).join(", "),
          image: album.images[0].url,
        }
      });
    },
    spotifyAlbumById: async (
      _parent: undefined,
      args: { id: string },
    ) => {
      const response = await getAlbumById(args.id);

      const album = response.data;
      console.log(album);
      return {
        id: album.id,
        name: album.name,
        artist: album.artists.map((artist: any) => artist.name).join(", "),
        image: album.images[0].url,
      }
    },

  },
};