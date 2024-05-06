<template>
  <div class="w-full bg-gray-900 text-gray-300 p-8 px-16">

    <div class="flex">
      <div class="w-92 flex-shrink-0 flex justify-center items-center">
        <img :src="album.image" alt="Album cover" class="object-contain w-full self-start w-80" />
      </div>
      
      <div class="flex-grow ml-8 overflow-hidden" id="huj">
        <div class="lg:flex block">
          <div>
            <div class="truncate text-5xl pb-4 font-bold">{{ album.name }}</div>
            <div class="truncate text-2xl">{{ album.artist }}</div>
          </div>
        </div>
      </div>
    </div>


    <div class="mt-12 rounded">
      <div class="text-3xl font-bold pb-2">
        Write your review
      </div>
      <v-form @submit.prevent="">
        <div>
          <v-rating
            v-model="formData.rating"
            active-color="yellow"
            color="grey"
            half-increments
            hover
          ></v-rating>
        </div>
        <div>
          <v-text-field
            v-model="formData.title"
            type="text"
            placeholder="Title"
            required
          ></v-text-field>
        </div>
        <div>
          <v-textarea
            v-model="formData.content"
            placeholder="Description"
            required
          ></v-textarea>
        </div>
        <div v-if="isReviewed">
          <v-btn
            @click="update"
            type="submit"
            variant="tonal"
            >Edit review</v-btn>
        </div>
        <div v-else>
          <v-btn
            @click="submit"
            type="submit"
            variant="tonal"
            >Post review</v-btn>
        </div>
      </v-form>
    </div>

  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useQuery, useMutation } from '@vue/apollo-composable'
import { gql } from "@apollo/client/core";
import { computed } from 'vue';
import router from '@/router';

const route = useRoute();
const { result } = useQuery(gql`
  query SpotifyAlbumById($spotifyAlbumByIdId: ID!) {
    spotifyAlbumById(id: $spotifyAlbumByIdId) {
      id
      name
      artist
      image
    }
  }
`, {
  spotifyAlbumByIdId: route.params.id
})
const album = computed(() => result.value?.spotifyAlbumById ?? {})

const { result: reviewResult, onResult: onReviewResult } = useQuery(gql`
  query ReviewByAlbumId($albumId: String!) {
    reviewByAlbumId(album_id: $albumId) {
      id
      rating
      title
      content
      album_id
    }
  }
`, {
  albumId: route.params.id
}, {
  fetchPolicy: 'no-cache'
})

const review = computed(() => reviewResult.value?.reviewByAlbumId)
const isReviewed = computed(() => reviewResult.value?.reviewByAlbumId !== undefined)
const formData = ref({
  albumId: route.params.id,
  updateReviewId: '',
  title: '',
  content: '',
  rating: 0,
});

onReviewResult(queryResult => {
  console.log(queryResult.data.reviewByAlbumId)
  formData.value.content = queryResult.data.reviewByAlbumId.content;
  formData.value.title = queryResult.data.reviewByAlbumId.title;
  formData.value.rating = queryResult.data.reviewByAlbumId.rating;
  formData.value.updateReviewId = queryResult.data.reviewByAlbumId.id;
  console.log(formData.value)
})

const { mutate: postReview, onDone: onPostDone } = useMutation(gql`
    mutation CreateReview($albumId: String!, $title: String!, $content: String!, $rating: Float!) {
      createReview(album_id: $albumId, title: $title, content: $content, rating: $rating) {
        id
      }
    }
  `, { variables: formData.value }
)

const { mutate: updateReview, onDone: onUpdateDone } = useMutation(gql`
    mutation UpdateReview($updateReviewId: ID!, $title: String, $content: String, $rating: Float) {
      updateReview(id: $updateReviewId, title: $title, content: $content, rating: $rating) {
        id
      }
    }
  `, { variables: formData.value }
)



const submit = () => {
  postReview();
  onPostDone(result => {
    router.push({ name: 'review', params: { id: result.data.createReview.id }, query: { _r: Date.now() } })
    console.log('Review posted!')
  })
}

const update = () => {
  updateReview();
  onUpdateDone(result => {
    router.push({ name: 'review', params: { id: result.data.updateReview.id }, query: { _r: Date.now() } })
    console.log('Review updated!')
  })
}

</script>

<style scoped>
/* div {
  border: 1px solid red;
} */
</style>