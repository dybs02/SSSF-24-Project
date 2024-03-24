# SSSF-24-Project
## Project Description
A web application that will allow users to review, rate and comment music, similar to how [Letterboxd](https://letterboxd.com/film/dune-part-two/) does it for movies. The app is targetted for music fans and/or Spotify users. On the homepage users will be able to see most recently commented/reviewed pieces, and be able to search for any albums, tracks or artists. This will be achived with the help of [Spotify API](https://developer.spotify.com/documentation/web-api). Users will be able to post content after loging in, authentication will be done with a Spotify account.

All user posted content will be storend in a NoSQL database, with a reference to _id_ provided by Spotify. 

There is also possibility of adding a global and/or artist specific chat using WebSockets. 
