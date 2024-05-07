<template>

<div class="flex justify-center relative">
  
  <div class="z-20 flex w-full">
    <input
      type="text"
      placeholder="Search..."
      class="container pl-4 px-4 py-1 rounded-l-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-gray-600"
      v-model="searchTerm"
      @input="handleInput"
    />
    <button class="px-4 py-1 rounded-r-lg text-white bg-gray-600 focus:outline-none">
      🔍
    </button>
  </div>

  <div v-if="showResults" class="absolute top-0 left-0 z-10 w-full pt-7 mt-1 bg-gray-700 text-white rounded-md rounded-t-lg shadow-lg">
    <div v-for="result in results" class="hover:bg-gray-600 hover:cursor-pointer px-4 truncate border-t border-gray-600 flex py-2 overflow-hidden" @click="openReview(result)">
      <img :src="result.image" alt="Album cover" class="object-contain w-8 h-8 " />
      <div class="pl-4 my-auto">
        <span class="text-gray-100">{{ result.name }}</span>
        <span class="text-gray-400"> - {{ result.artist }}</span>
      </div>
    </div>
  </div>
</div>


</template>

<script setup lang="ts">
import { provideApolloClient } from "@vue/apollo-composable";
import { useQuery } from '@vue/apollo-composable'
import { gql } from "@apollo/client/core";
import router from '@/router';
import { computed, ref } from 'vue';
import { apolloClient } from './../main';

interface Result {
  id: number;
  name: string;
  artist: string;
  image: string;
}

const searchTerm = ref('');
const showResults = ref(false);
let results = ref<Result[]>([]);
let timer: any;


const handleInput = () => {
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(fetchResults, 300);
};

const fetchResults = async () => {
  if (searchTerm.value === '') {
    results.value = [];
    showResults.value = false;
    return;
  }

  const variables = ref({
    query: searchTerm.value,
  })

  const { result } = provideApolloClient(apolloClient)(() => useQuery(gql`
    query SpotifyAlbumsByQuery($query: String!) {
      spotifyAlbumsByQuery(query: $query) {
        id
        name
        artist
        image
      }
    },
  `, variables))


  results = computed(() => result.value?.spotifyAlbumsByQuery ?? {});

  // needed to refresh the results
  showResults.value = false;
  showResults.value = true;
};

const openReview = (album :Result) => {
  searchTerm.value = '';
  showResults.value = false;
  router.push({ name: 'album', params: { id: album.id } });
}

</script>

<style scoped>

</style>
