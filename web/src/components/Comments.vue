<template>

<div class="text-white pb-8">
  <div class="px-14 pt-8 pb-2 text-3xl">
    Comments
  </div>

  <div v-for="c in comments_cpy" class="p-2 px-4 mx-14 my-2 bg-gray-600 rounded">
    <div class="flex">
      <div class="flex w-48">
        <div class="rounded-full overflow-hidden flex-none h-12 w-12">
          <img :src="c.author.avatar_url" alt="User avatar" class="object-cover w-full h-full" />
        </div>
        <div class="ml-4 flex-none w-36 overflow-hidden">
          <div class="text-lg font-bold">{{ c.author.display_name }}</div>
          <div class="text-xs text-gray-400">{{ (new Date(c.date)).toLocaleDateString("en-GB") }}</div>
          <div class="text-xs text-gray-400">{{ (new Date(c.date)).toLocaleTimeString("en-GB") }}</div>
        </div>
      </div>

      <div class="ml-4 px-4 py-2 w-full bg-gray-500 rounded overflow-hidden"> 
        {{ c.content }}
      </div>
    </div>
  </div>

  <div class="px-14 pt-8 pb-2 ">
    <v-form @submit.prevent="submit">
      <v-textarea
        v-model="formData.content"
        placeholder="Add a comment..."
        rows="2"
        required
        @keydown.enter.prevent
      ></v-textarea>
      <v-btn
        type="submit"
        variant="tonal"
      >Post comment</v-btn>
    </v-form>
  </div>
</div>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useQuery, useMutation } from '@vue/apollo-composable'
import { gql } from "@apollo/client/core";


type Comment = {
  author: {
    avatar_url: string;
    _id: string;
    display_name: string;
  };
  content: string;
  date: Date;
};

const props = defineProps({
  comments: {
    type: Array<Comment>,
    required: true
  }
});

const comments_cpy = ref([...props.comments]);

const route = useRoute();
const formData = ref({
  reviewId: route.params.id,
  content: '',
});


const { mutate: postComment, onDone } = useMutation(gql`
  mutation CreateReviewComment($reviewId: ID!, $content: String!) {
    createReviewComment(review_id: $reviewId, content: $content) {
      author {
        display_name
        avatar_url
        _id
      }
      content
      date
    }
  }
  `, { variables: formData.value }
)


const submit = () => {
  postComment();
  onDone(result => {
    formData.value.content = '';
    comments_cpy.value.push(result.data.createReviewComment);
  })
};

</script>

<style scoped>
/* div {
  border: 1px solid red;
} */

</style>
