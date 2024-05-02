import axios from 'axios';
import app from './app';
import mongoConnect from './utils/db';

// TODO messy, should be moved/refactored
const getSpotifyToken = async () => {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  var authOptions = {
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (Buffer.from(clientId + ':' + clientSecret).toString('base64'))
    },
    params: {
      grant_type: 'client_credentials'
    },
    json: true
  };

  axios(authOptions)
  .then(response => {
    if (response.status === 200) {
      const token = response.data.access_token;
      process.env.SPOTIFY_ACCESS_TOKEN = token;
      console.log('Retrieved access token successfuly');
    } else {
      console.error('Failed to retrieve access token:', response.status, response.statusText);
    }
  })
  .catch(error => {
    console.error('Error occurred while fetching access token:', error.message);
  });
}


const port = process.env.PORT || 3000;
(async () => {
  try {
    await mongoConnect();
    await getSpotifyToken();
    setInterval(async () => {
      try {
        await getSpotifyToken();
        console.log('Spotify token refreshed.');
      } catch (error: any) {
        console.log('Error refreshing Spotify token:', error.message);
      }
    }, 3600 * 1000);
    app.listen(port, () => {
      /* eslint-disable no-console */
      console.log(`Listening: http://localhost:${port}`);
      /* eslint-enable no-console */
    });
  } catch (error) {
    console.log('Server error', (error as Error).message);
  }
})();
