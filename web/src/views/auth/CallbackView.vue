<template>
  <div>
    <h1 class="text-5xl text-white font-bold">Loading...</h1>
    <!-- TODO loading indicator -->
  </div>
</template>


<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';
import router from '../../router';
import axios from 'axios';
import { onMounted } from 'vue';

const store = useAuthStore();

onMounted(() => {
  axios({
    method: 'get',
    url: import.meta.env.VITE_AUTH_URL + '/api/v1/auth/jwt',
    withCredentials: true,
    params: {
      state: (new URLSearchParams(window.location.search)).get('state'),
    },
  })
  .then((response) => {
    const user = response.data.user;
    const token = response.data.jwt;

    if (!user || !token) {
      store.clearStorage();
      console.error('No data found');
      return;
    }
    store.setUser(user);
    store.setToken(token);
  })
  .catch((error) => {
    console.error('Error fetching jwt:', error);
  });

  router.push('/');
});

</script>


<style scoped>

</style>
