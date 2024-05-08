import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

type User = {
  _id: string;
  display_name: string;
  avatar_url: string;
  spotify_id: string;
  email: string;
  country: string;
};

const LOCAL_STORAGE_KEY_USER = 'user'
const LOCAL_STORAGE_KEY_TOKEN = 'token'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const user = ref<User | null>(null)

  const isSignedIn = computed(() => !!token.value)

  const setToken = (newValue: string) => {
    token.value = newValue
    localStorage.setItem(LOCAL_STORAGE_KEY_TOKEN, JSON.stringify(newValue))
  }

  const getToken = () => {
    return token.value
  }

  const deleteToken = () => {
    token.value = null
    localStorage.removeItem(LOCAL_STORAGE_KEY_TOKEN)
  }

  const setUser = (newValue: User) => {
    user.value = newValue
    localStorage.setItem(LOCAL_STORAGE_KEY_USER, JSON.stringify(newValue))
  }

  const getUser = () => {
    return user.value
  }

  const deleteUser = () => {
    user.value = null
    localStorage.removeItem(LOCAL_STORAGE_KEY_USER)
  }

  const clearStorage = () => {
    deleteToken()
    deleteUser()
  }

  // Persist the token across page refreshes
  const userFromLocalStorage = localStorage.getItem(LOCAL_STORAGE_KEY_USER)
  if (userFromLocalStorage) {
    user.value = JSON.parse(userFromLocalStorage)
  }
  const tokenFromLocalStorage = localStorage.getItem(LOCAL_STORAGE_KEY_TOKEN)
  if (tokenFromLocalStorage) {
    token.value = JSON.parse(tokenFromLocalStorage)
  }

  return {
    isSignedIn,
    setToken,
    getToken,
    deleteToken,
    setUser,
    getUser,
    deleteUser,
    clearStorage,
  }
})
