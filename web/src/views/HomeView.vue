<template>

  <MostRecentReviews />
  <MostRecentUserReviews v-if="store.isSignedIn" />

</template>

<script setup lang="ts">
import MostRecentReviews from '@/components/reviews/MostRecentReviews.vue';
import MostRecentUserReviews from '@/components/reviews/MostRecentUserReviews.vue';
import { useAuthStore } from '@/stores/authStore';

const store = useAuthStore();

</script>

<style scoped>

</style>
