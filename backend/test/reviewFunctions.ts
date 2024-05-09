import request from 'supertest';
import {Application} from 'express';
import { Review } from '../src/interfaces/Review';
import { ReviewComment } from '../src/interfaces/ReviewComment';



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


const postReviewComment = (
  url: string | Application,
  vars: {reviewId: string, content: string},
  token: string,
): Promise<Partial<ReviewComment>> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `mutation CreateReviewComment($reviewId: ID!, $content: String!) {
          createReviewComment(review_id: $reviewId, content: $content) {
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
        }`,
        variables: vars,
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          console.log(response.body);
          const reviewComment = vars;
          const newReviewComment: Partial<ReviewComment> = response.body.data.createReviewComment;
          expect(reviewComment.content).toBe(newReviewComment.content);
          expect(newReviewComment).toHaveProperty('date');
          expect(newReviewComment).toHaveProperty('author');
          expect(newReviewComment.author).toHaveProperty('_id');
          resolve(newReviewComment);
        }
      });
  });
};


const updateReview = (
  url: string | Application,
  vars: {updateReviewId: string, title: string, content: string, rating: number},
  token: string,
): Promise<Partial<Review>> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `mutation UpdateReview($updateReviewId: ID!, $title: String, $content: String, $rating: Float) {
          updateReview(id: $updateReviewId, title: $title, content: $content, rating: $rating) {
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
          const newReview: Partial<Review> = response.body.data.updateReview;
          expect(newReview).toHaveProperty('id');
          expect(newReview).toHaveProperty('album_id');
          expect(newReview.title).toBe(review.title);
          expect(newReview.content).toBe(review.content);
          expect(newReview.rating).toBe(review.rating);
          expect(newReview).toHaveProperty('author');
          expect(newReview.author).toHaveProperty('_id');
          expect(newReview).toHaveProperty('date');
          expect(newReview).toHaveProperty('comments');
          expect(Array.isArray(newReview.comments)).toBe(true);
          if (newReview.comments) {
            expect(newReview.comments[0]).toHaveProperty('author');
            expect(newReview.comments[0]).toHaveProperty('content');
            expect(newReview.comments[0]).toHaveProperty('date');
          }
          resolve(newReview);
        }
      });
  });
};


const deleteReview = (
  url: string | Application,
  vars: {deleteReviewId: string},
  token: string,
): Promise<Partial<Review>> => {
  return new Promise((resolve, reject) => {
    console.log(vars);
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `mutation DeleteReview($deleteReviewId: ID!) {
          deleteReview(id: $deleteReviewId) {
            id
            author
            album_id
            title
            content
            rating
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
          const newReview: Partial<Review> = response.body.data.deleteReview;
          expect(newReview).toHaveProperty('id');
          expect(newReview.id).toBe(review.deleteReviewId);
          expect(newReview).toHaveProperty('album_id');
          expect(newReview).toHaveProperty('title');
          expect(newReview).toHaveProperty('content');
          expect(newReview).toHaveProperty('rating');
          expect(newReview).toHaveProperty('date');
          resolve(newReview);
        }
      });
  });
};


export {
  postReview,
  postReviewComment,
  updateReview,
  deleteReview,
};