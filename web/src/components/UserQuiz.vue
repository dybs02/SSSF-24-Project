<template>


<div class="pt-10 text-white">
  <div class="mx-24 pb-1 mb-5 text-white text-2xl border-b">
    My Quiz
  </div>
  <div class="px-24">
    <div class="text-xl pb-2">
      Who is my favourite artist?
    </div>
    <form  @submit.prevent="handleSubmit" >
      <div>
        <input type="radio" id="lady-gaga" name="artist" value="lady-gaga">
        <label for="lady-gaga">  Lady Gaga</label>
      </div>
      <div>
        <input type="radio" id="ariana-grande" name="artist" value="ariana-grande">
        <label for="ariana-grande">  Ariana Grande</label>
      </div>
      <div>
        <input type="radio" id="taylor-swift" name="artist" value="taylor-swift">
        <label for="taylor-swift">  Taylor Swift</label>
      </div>
      <div>
        <input type="radio" id="beyonce" name="artist" value="beyonce">
        <label for="beyonce">  Beyonce</label>
      </div>
      <div class="flex">
        <button class="bg-gray-700 text-white px-4 py-2 rounded-lg mt-5" >Submit</button>
        <div class="pl-3 pt-7 text-green-500" v-if="isCorrect">
          {{ answer }}
        </div>
        <div class="pl-3 pt-7 text-red-500" v-if="!isCorrect">
          {{ answer }}
        </div>
      </div>
    </form>
  </div>
</div>


</template>

<script setup lang="ts">
import { ref } from 'vue';

const answer = ref('');
const isCorrect = ref(false);

const handleSubmit = (event: any) => {
  const formData = new FormData(event.target);
  const selectedArtist = formData.get('artist');

  if (selectedArtist === 'lady-gaga') {
    answer.value = 'Correct! Lady Gaga is my favourite artist';
    isCorrect.value = true;
  } else {
    answer.value = 'Incorrect! Try again';
    isCorrect.value = false;
  }
}
</script>

<style scoped>

</style>
