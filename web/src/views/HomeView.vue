<template>

  <MostRecentReviews />
  <MostRecentUserReviews
    :user_id="user_id"
    v-if="store.isSignedIn"
  />

</template>

<script setup lang="ts">
import MostRecentReviews from '@/components/reviews/MostRecentReviews.vue';
import MostRecentUserReviews from '@/components/reviews/MostRecentUserReviews.vue';
import { useAuthStore } from '@/stores/authStore';
import { computed } from 'vue';

const store = useAuthStore();

const user_id = computed(() => {
  const id = store.getUser()?._id;
  return id ? id : '';
});

</script>

<style scoped>

</style>
