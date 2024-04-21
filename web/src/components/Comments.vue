<template>

<div class="text-white pb-8">
  <div class="px-14 pt-8 pb-2 text-3xl">
    Comments
  </div>

  <div v-for="c in comments" class="p-2 px-4 mx-14 my-2 bg-gray-600">
    <div class="flex">
      <div class="rounded-full overflow-hidden h-12 w-12">
        <img src="https://picsum.photos/200/300" alt="User avatar" class="object-cover w-full h-full" />
      </div>
      <div class="ml-4">
        <div class="text-lg font-bold">{{ c.username }}</div>
        <div class="text-xs text-gray-400">{{ c.created_at }}</div>
      </div>

      <div class="pl-8 pt-2"> 
        {{ c.content }}
      </div>
    </div>
  </div>

  <div class="px-14 pt-8 pb-2 ">
    <textarea class="w-full h-24 bg-gray-600 p-2" placeholder="Add a comment..."></textarea>
    <button class="bg-gray-700 text-white p-2">Submit</button>
  </div>
</div>

</template>

<script setup lang="ts">

const props = defineProps({
  review_id: {
    type: String,
    required: true
  }
});

const comments = [
  {
    id: 1,
    username: "Lexie",
    content: "This is a comment",
    created_at: "2022-11-03"
  },
  {
    id: 2,
    username: "Jimmy",
    content: "This is another comment",
    created_at: "2022-11-04"
  }
];

</script>

<style scoped>


</style>
