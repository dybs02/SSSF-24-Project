<template>

  <div class="flex pb-10 pt-8">
    <div class="w-1/3 flex items-center justify-center">
      <div class="rounded-full overflow-hidden h-48 w-48">
        <img :src="currentUser.avatar_url" alt="User avatar" class="object-cover w-full h-full" />
      </div>
    </div>
    <div class="w-2/3 flex flex-col justify-center text-white pl-10">
      <h1 class="text-4xl my-3">{{ currentUser.display_name }}</h1>
      <!-- TODO -->
      <p>Joined: 2021-10-01</p> 
      <p>Reviews: 5</p>
    </div>
    <!-- <div>
      <button class="bg-gray-800 text-white px-4 py-2 rounded-lg">Edit Profile</button>
    </div> -->
  </div>

  <MostRecentUserReviews />

</template>

<script setup lang="ts">

import MostRecentUserReviews from '@/components/reviews/MostRecentUserReviews.vue';
import { useQuery } from '@vue/apollo-composable'
import { gql } from "@apollo/client/core";
import { computed } from 'vue';

const { result } = useQuery(gql`
  query UserCurrent {
    userCurrent {
      _id
      display_name
      avatar_url
      spotify_id
      email
      country
    }
  } 
`)
const currentUser = computed(() => result.value?.userCurrent ?? {})


</script>

<style scoped>


</style>
