<template>

  <div class="flex pb-10">
    <div class="w-1/3 flex items-center justify-center">
      <div class="rounded-full overflow-hidden h-48 w-48">
        <img src="https://picsum.photos/200/300" alt="User avatar" class="object-cover w-full h-full" />
      </div>
    </div>
    <div class="w-2/3 flex flex-col justify-center text-white pl-10">
      <h1 class="text-2xl">Username</h1>
      <p>Joined: 2021-10-01</p>
      <p>Reviews: 5</p>
    </div>
    <div>
      <button class="bg-gray-800 text-white px-4 py-2 rounded-lg">Edit Profile</button>
    </div>
  </div>

  <div class="pt-10">
    <div class="mx-24 pb-1 mb-5 text-white text-2xl border-b">
      Favourite Four
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 px-24">
      <div v-for="i in [1,2,3,4]" class="w-full">
        <CompactReview
          :image_url="'https://i.scdn.co/image/ab67616d00001e02a5d31644260279be8d0c46c0'"
          :type="'album'"
          :title="'Born this way'"
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
