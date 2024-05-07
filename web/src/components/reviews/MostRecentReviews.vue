<template>

  <div class="py-10">
    <div class="mx-24 pb-1 mb-5 text-white text-4xl border-b">
      Most Recently Reviewed
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 px-24">
      <div v-for="review in reviews" class="w-full">
        <CompactReview
          :review="review"
        />
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import CompactReview from '@/components/reviews/CompactReview.vue'
import { useQuery } from '@vue/apollo-composable'
import { gql } from "@apollo/client/core";
import { computed, ref } from 'vue';

const { result } = useQuery(gql`
  query ReviewsMostRecent($limit: Int!) {
    reviewsMostRecent(limit: $limit) {
      author {
        _id
        avatar_url
        display_name
      }
      album {
        artist
        image
        name
        id
      }
      id
      rating
    }
  }
`, {
  limit: 4
}, {
  fetchPolicy: 'no-cache'
})
const reviews = computed(() => result.value?.reviewsMostRecent ?? []);

</script>

<style scoped>

</style>
