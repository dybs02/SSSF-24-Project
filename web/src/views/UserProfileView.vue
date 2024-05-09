<template>

  <div class="flex pb-10 pt-8">
    <div class="w-1/3 flex items-center justify-center">
      <div class="rounded-full overflow-hidden h-48 w-48">
        <img :src="user.avatar_url" alt="User avatar" class="object-cover w-full h-full" />
      </div>
    </div>
    <div class="w-2/3 flex flex-col justify-center text-white pl-10">
      <h1 class="text-4xl my-3 w-fit bg-gray-700 p-4 rounded">{{ user.display_name }}</h1>
      <!-- TODO -->
      <!-- <p>Joined: 2021-10-01</p> 
      <p>Reviews: 5</p> -->
      <div class=" w-fit bg-gray-600 p-2 rounded">
        <p>Country: {{ user.country }}</p>
        <a :href="'https://open.spotify.com/user/' + user.spotify_id" target="_blank" class="text-blue-400">Spotify Profile</a>
      </div>
    </div>
    <!-- <div>
      <button class="bg-gray-800 text-white px-4 py-2 rounded-lg">Edit Profile</button>
    </div> -->
  </div>

  <MostRecentUserReviews
    :user_id="user_id"
  />

</template>

<script setup lang="ts">

import MostRecentUserReviews from '@/components/reviews/MostRecentUserReviews.vue';
import { useQuery } from '@vue/apollo-composable'
import { gql } from "@apollo/client/core";
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const user_id: string = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;

const { result } = useQuery(gql`
  query UserById($userByIdId: ID!) {
    userById(id: $userByIdId) {
      _id
      display_name
      avatar_url
      spotify_id
      email
      country
    }
  }
`, {
  userByIdId: user_id
})
const user = computed(() => result.value?.userById ?? {})


</script>

<style scoped>


</style>
