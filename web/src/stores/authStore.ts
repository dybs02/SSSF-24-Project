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

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)

  const isSignedIn = computed(() => !!user.value)

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
    deleteUser()
  }

  // Persist the token across page refreshes
  const userFromLocalStorage = localStorage.getItem(LOCAL_STORAGE_KEY_USER)
  if (userFromLocalStorage) {
    user.value = JSON.parse(userFromLocalStorage)
  }

  return {
    isSignedIn,
    setUser,
    getUser,
    deleteUser,
    clearStorage,
  }
})
