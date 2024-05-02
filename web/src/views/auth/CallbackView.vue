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
  
  axios.post(
    // TODO env variable
    'http://localhost:3000/graphql',
    { query: query },
    { withCredentials: true }
  )
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
