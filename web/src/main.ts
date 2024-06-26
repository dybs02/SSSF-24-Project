import { createApp, provide, h } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { ApolloClient, ApolloLink, InMemoryCache, concat, createHttpLink } from '@apollo/client/core';
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { useAuthStore } from './stores/authStore'


const httpLink = createHttpLink({
  uri: import.meta.env.VITE_BACKEND_URL + '/graphql',
  credentials: 'include',
});

const authMiddleware = new ApolloLink((operation, forward) => {
  const store = useAuthStore();
  const token = store.getToken();
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });
  return forward(operation);
});

const apolloClient = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
});

const app = createApp({
  setup () {
    provide(DefaultApolloClient, apolloClient)
  },

  render: () => h(App),
})

app.use(router)

const pinia = createPinia()
app.use(pinia)

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})
app.use(vuetify)

app.mount('#app')

export {apolloClient}