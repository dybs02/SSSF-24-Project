<template>
  <!-- TODO add placeholder values for when data is requested ??? -->
  <div class="w-full bg-gray-900 text-gray-300">
    <div>
      <img :src="props.image_url" alt="Album cover" class="" />
    </div>
    <div class="p-1">
      <div class="truncate">{{ props.title }}</div>
      <div class="truncate">{{ props.artist }}</div>
      <div class="">{{ "⭐".repeat(props.review_value) }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  image_url: {
    type: String,
    required: true
  },
  type: {
    type: String, // TODO: make this an enum - album or track
    required: true
  },
  title: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    required: true
  },
  review_value: {
    type: Number,
    required: true
  }
});

</script>

<style scoped>

</style>