<template>

  <div class="pt-10">
    <div class="mx-24 pb-1 mb-5 text-white text-2xl border-b">
      Recently Reviewed
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 px-24">
      <div v-for="i in [1,2,3,4]" class="w-full">
        <CompactReview
          :image_url="'https://i.scdn.co/image/ab67616d00001e02631810af03785dbad83f5c81'"
          :type="'album'"
          :title="'The Fameeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'"
          :artist="'Lady Gaga'"
          :review_value=4
        />
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import CompactReview from '@/components/CompactReview.vue'

</script>

<style scoped>

</style>
