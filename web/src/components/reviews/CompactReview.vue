<template>
  <div class="w-full bg-gray-900 text-gray-300 p-3 rounded select-none cursor-pointer" @click="openReview">
    <div class="">
      <img :src="props.review.album.image" alt="Album cover" class="" />
    </div>
    <div class="bg-gray-800 rounded-b p-2">
      <div class="truncate font-bold">{{ props.review.album.name }}</div>
      <div class="truncate text-gray-400">{{ props.review.album.artist }}</div>
      <div>
        <v-rating 
          v-model="props.review.rating"
          active-color="yellow"
          color="yellow"
          density="compact"
          size="small"
          half-increments
          readonly
        ></v-rating>
      </div>
      <!-- TODO profile link -->
      <div class="flex">
        <div>
          <img :src="props.review.author.avatar_url" alt="User avatar" class="w-8 h-8 rounded-full" />
        </div>
        <div class="text-gray-300 justify-center my-auto ml-3 truncate">{{ props.review.author.display_name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router';

const props = defineProps({
  review: {
    type: Object,
    required: true
  }
});

const openReview = () => {
  router.push({ name: 'review', params: { id: props.review.id } });
}

</script>

<style scoped>

</style>