<template>

  <div class="w-full bg-gray-900 text-gray-300 flex p-8 px-16">
    <div class="w-1/3 flex-shrink-0 flex justify-center items-center">
      <img :src="review.album.image" alt="Album cover" class="object-contain w-full self-start w-80" />
    </div>
    
    <div class="flex-none ml-8 w-2/3">
      <div class="lg:flex block">
        <div>
          <v-tooltip :text="review.album.name">
            <template v-slot:activator="{ props }">
              <div v-bind="props" class="truncate text-5xl font-bold max-w-lg">{{ review.album.name }}</div>
            </template>
          </v-tooltip>
          <v-tooltip :text="review.album.artist">
            <template v-slot:activator="{ props }">
              <div v-bind="props" class="truncate text-2xl w-fit">{{ review.album.artist }}</div>
            </template>
          </v-tooltip>
          <div>
            <v-rating 
              v-model="review.rating"
              active-color="yellow"
              color="yellow"
              density="compact"
              half-increments
              readonly
            ></v-rating>
          </div>
          <div class="flex">
            <div>
              <img :src="review.author.avatar_url" alt="User avatar" class="w-8 h-8 rounded-full" />
            </div>
            <div class="text-gray-300 justify-center my-auto ml-3 truncate">{{ review.author.display_name }}</div>
          </div>
        </div>
        <div class="ml-auto text-right">
          <div class="mt-2">Reviewed: {{ (new Date(review.date)).toLocaleDateString("en-GB") }}</div>
          <!-- <div class="">Views: 41</div> -->
          <div class="">Comments: {{ review.comments.length }}</div>
        </div>
      </div>

      <div class="mt-8 p-2 bg-gray-700 rounded">
        <div class="text-3xl font-bold p-2 overflow-hidden">
          {{ review.title }}
        </div>
        <div class="bg-gray-500 p-2 rounded" style="white-space: pre;">
          {{ review.content }}
        </div>
      </div>

      <div class="pt-2">
        <v-btn
          @click="editReview"
          variant="tonal"
        >Edit review</v-btn>
      </div>
    </div>
  </div>

  <Comments :comments=review.comments />

</template>


<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useQuery, useMutation } from '@vue/apollo-composable'
import { gql } from "@apollo/client/core";
import { computed, ref } from 'vue';
import Comments from "@/components/Comments.vue";
import router from '@/router';

const route = useRoute();
const { result: reviewResult } = useQuery(gql`
  query ReviewById($reviewByIdId: ID!) {
    reviewById(id: $reviewByIdId) {
      album_id
      author {
        avatar_url
        display_name
        _id
      }
      comments {
        author {
          avatar_url
          _id
          display_name
        }
        content
        date
      }
      content
      id
      rating
      title
      date
      album {
        id
        name
        artist
        image
      }
    }
  }
`, {
  reviewByIdId: route.params.id
}, {
  fetchPolicy: 'no-cache'
})
const review = computed(() => reviewResult.value?.reviewById ?? {});

const editReview = () => {
  router.push({ name: 'album', params: { id: review.value.album_id }, query: { _r: Date.now() } })
}

</script>

<style scoped>
/* div {
  border: 1px solid red;
} */
</style>