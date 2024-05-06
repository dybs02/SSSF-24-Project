<template>
  <div class="w-full bg-gray-900 text-gray-300 p-8 px-16">

    <div class="flex">
      <div class="w-92 flex-shrink-0 flex justify-center items-center">
        <img :src="album.image" alt="Album cover" class="object-contain w-full self-start w-80" />
      </div>
      
      <div class="flex-grow ml-8">
        <div class="lg:flex block">
          <div>
            <div class="truncate text-5xl font-bold max-w-lg">{{ album.name }}</div>
            <div class="truncate text-2xl">{{ album.artist }}</div>
          </div>
        </div>
      </div>
    </div>


    <div class="mt-12 rounded">
      <div class="text-3xl font-bold pb-2">
        Write your review
      </div>
      <v-form @submit.prevent="submit">
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
        <v-btn
          type="submit"
          variant="tonal"
          >Post review</v-btn>
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


const formData = ref({
  albumId: route.params.id,
  title: '',
  content: '',
  rating: 0,
});

const { mutate: postReview, onDone } = useMutation(gql`
    mutation CreateReview($albumId: String!, $title: String!, $content: String!, $rating: Float!) {
      createReview(album_id: $albumId, title: $title, content: $content, rating: $rating) {
        id
      }
    }
  `, { variables: formData.value }
)


const submit = () => {
  postReview();
  onDone(result => {
    router.push({ name: 'review', params: { id: result.data.createReview.id } })
    console.log('Review posted!')
  })
}

</script>

<style scoped>
/* div {
  border: 1px solid red;
} */
</style>