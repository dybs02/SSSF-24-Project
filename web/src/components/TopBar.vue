<template>

  <div class="bg-gray-800 py-4">
    <div class="container sm:mx-auto sm:px-24 flex flex-col md:flex-row justify-between items-center">
      <div class="text-white font-bold text-2xl">
        <a href="/">Musicboxd</a>
      </div>
      <div class="block md:flex space-x-4 mx-4">
        <div class="text-white md:pr-16">
          <div v-if="store.isSignedIn">
            <a @click="logout" href="/">LOGOUT</a>
          </div>
          <div v-else>
            <a :href="login_url">LOGIN</a>
          </div>
        </div>
        <div class="text-white">
          <a href="/">Home</a>
        </div>
        <div class="text-white hover:cursor-pointer">
          <a @click="openProfile">Profile</a>
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
import router from '@/router';

const store = useAuthStore();

const login_url = import.meta.env.VITE_AUTH_URL + '/api/v1/auth/login/spotify';

const logout = async () => {
  store.clearStorage();
}

const openProfile = () => {
  const user_id = store.getUser()?._id;
  router.push({ name: 'user', params: { id: user_id } });
}

</script>

<style scoped>

</style>
