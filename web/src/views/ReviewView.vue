<template>

  <div class="w-full bg-gray-900 text-gray-300 flex p-8 px-16">
    <div class="w-92 flex-shrink-0 flex justify-center items-center">
      <img src="https://i.scdn.co/image/ab67616d00001e02a5d31644260279be8d0c46c0" alt="Album cover" class="object-contain w-full self-start" />
    </div>
    
    <div class="flex-grow ml-8">
      <div class="lg:flex block">
        <div>
          <div class="truncate text-5xl font-bold max-w-lg">Born this way</div>
          <div class="truncate text-2xl">Lady Gaga</div>
          <div class="">{{ "⭐".repeat(5) }}</div>
        </div>
        <div class="ml-auto text-right">
          <div class="">Reviewed: 2022-11-03</div>
          <div class="">Views: 41</div>
          <div class="">Comments: 12</div>
        </div>
      </div>

      <div class="mt-12 p-2 bg-gray-700 rounded">
        <div class="text-3xl font-bold pb-2">
          My review...
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut voluptatibus et soluta minus est eligendi similique pariatur nihil, officia modi sed quae omnis? Debitis temporibus excepturi nemo omnis aperiam ex. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam veritatis, rem perferendis voluptas explicabo iusto accusantium assumenda facere adipisci officia repudiandae cumque optio esse enim. Aliquam praesentium dolorum provident neque.
        </div>
      </div>
    </div>
  </div>

  <Comments review_id="1" />

</template>


<script setup lang="ts">
import Comments from "@/components/Comments.vue";

</script>

<style scoped>
/* div {
  border: 1px solid red;
} */
</style>