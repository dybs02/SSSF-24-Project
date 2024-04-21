<template>

  <div class="bg-gray-800 py-4">
    <div class="container mx-auto px-24 flex flex-col md:flex-row justify-between items-center">
      <div class="text-white font-bold text-2xl">
        <a href="/">Musicboxd</a>
      </div>
      <div class="hidden md:flex space-x-4 ml-4">
        <div class="text-white">
          <a href="/">Home</a>
        </div>
        <div class="text-white">
          <a href="/user/123">Profile</a>
        </div>
      </div>
      <div class="flex-1 md:max-w-lg">
        <SearchBar />
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import SearchBar from './SearchBar.vue'

</script>

<style scoped>

</style>
