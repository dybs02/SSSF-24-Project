<template>

  <div class="bg-gray-800 py-4">
    <div class="container mx-auto px-24 flex flex-col md:flex-row justify-between items-center">
      <div class="text-white font-bold text-2xl">
        <a href="/">Musicboxd</a>
      </div>
      <div class="hidden md:flex space-x-4 ml-4">
        <div class="text-white pr-16">
          <div v-if="store.isSignedIn">
            <a @click="logout" href="/">LOGOUT</a>
          </div>
          <div v-else>
            <a href="http://localhost:3001/api/v1/auth/login/spotify">LOGIN</a>
          </div>
        </div>
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
import { useAuthStore } from '@/stores/authStore';
import SearchBar from './SearchBar.vue'
import axios from 'axios';

const store = useAuthStore();

const logout = async () => {
  const res = await axios.get(
    'http://localhost:3001/api/v1/auth/logout',
    { withCredentials: true }
  )
  store.clearStorage();
}
</script>

<style scoped>

</style>
