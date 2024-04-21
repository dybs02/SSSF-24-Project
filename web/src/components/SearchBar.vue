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
    <!-- Render the top 10 results here -->
    <div v-for="result in results" class="hover:bg-gray-600 px-4" @click="openReview">
      {{ result.name }}
    </div>
  </div>
</div>


</template>

<script setup lang="ts">

// TODO Search with Spotify API

import axios from 'axios';
import router from '@/router';
import { ref } from 'vue';

interface Result {
  id: number;
  name: string;
}

const searchTerm = ref('');
const showResults = ref(false);
const results = ref<Result[]>([]);
let timer: any;


const handleInput = () => {
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(fetchResults, 300);
};

const fetchResults = () => {
  // TODO - API call
  if (searchTerm.value === '') {
    results.value = [];
    showResults.value = false;
    return;
  }

  results.value = [
    { id: 1, name: 'Result 1' },
    { id: 2, name: 'Result 2' },
    { id: 3, name: 'Result 3' },
    { id: 4, name: 'Result 4' },
    { id: 5, name: 'Result 5' },
    { id: 6, name: 'Result 6' },
    { id: 7, name: 'Result 7' },
    { id: 8, name: 'Result 8' },
    { id: 9, name: 'Result 9' },
    { id: 10, name: 'Result 10' },
  ];
  showResults.value = true;
};

const openReview = () => {
  searchTerm.value = '';
  showResults.value = false;
  router.push({ name: 'review', params: { id: 1 } });
}

</script>

<style scoped>

</style>
