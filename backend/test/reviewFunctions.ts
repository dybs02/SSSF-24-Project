import request from 'supertest';
import {Application} from 'express';
import { Review } from '../src/interfaces/Review';



const postReview = (
  url: string | Application,
  vars: {albumId: string, title: string, content: string, rating: number},
  token: string,
): Promise<Partial<Review>> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `mutation CreateReview($albumId: String!, $title: String!, $content: String!, $rating: Float!) {
          createReview(album_id: $albumId, title: $title, content: $content, rating: $rating) {
            id
            author {
              _id
              display_name
              avatar_url
              spotify_id
              email
              country
            }
            album_id
            title
            content
            rating
            comments {
              author {
                _id
                display_name
                avatar_url
                spotify_id
                email
                country
              }
              content
              date
            }
            date
          }
        }`,
        variables: vars,
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          console.log(response.body);
          const review = vars;
          const newReview: Partial<Review> = response.body.data.createReview;
          expect(newReview).toHaveProperty('id');
          expect(newReview.album_id).toBe(review.albumId);
          expect(newReview.title).toBe(review.title);
          expect(newReview.content).toBe(review.content);
          expect(newReview.rating).toBe(review.rating);
          expect(newReview).toHaveProperty('author');
          expect(newReview.author).toHaveProperty('_id');
          expect(newReview).toHaveProperty('date');
          resolve(newReview);
        }
      });
  });
};

export {
  postReview
};