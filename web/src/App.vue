<template>

  <TopBar />

  <div class="flex justify-center">
    <div class="lg:w-2/3 bg-gray-800" v-if="$route.fullPath">
      <RouterView :key="$route.fullPath" />
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
  min-width: 880px;
}

/* div {
  border: 1px solid red;
} */

</style>
