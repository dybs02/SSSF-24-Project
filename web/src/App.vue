<template>

  <a href="http://localhost:3001/api/v1/auth/login/spotify">LOGIN</a>
  <button>LOGOUT</button>
  <TopBar />

  <div class="flex justify-center">
    <div class="w-2/3 bg-gray-800 pt-7">
      <RouterView />
    </div>
  </div>

</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import TopBar from '@/components/TopBar.vue'

</script>

<style>

body {
  background-color: #374151;  
}

/* div {
  border: 1px solid red;
} */

</style>
