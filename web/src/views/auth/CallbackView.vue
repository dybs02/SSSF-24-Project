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
  const token = document.cookie.split('=')[1];
  store.setToken(token);

  const query = `
  query {
    userCurrent {
      _id
      display_name
      avatar_url
      spotify_id
      email
      country
    }
  }
  `;

  axios({
    method: 'post',
    url: import.meta.env.VITE_BACKEND_URL + '/graphql',
    data: { query: query },
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  .then((response) => {
    const user = response.data.data.userCurrent;
    if (!user) {
      store.clearStorage();
      console.error('No user found');
      return;
    }
    store.setUser(user);
  })
  .catch((error) => {
    console.error('Error fetching users:', error);
  });

  router.push('/');
});

</script>


<style scoped>

</style>
