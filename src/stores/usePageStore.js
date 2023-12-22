import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { reactive } from 'vue'
export const usePageStore = defineStore('pageStore', () => {
  const state = reactive({
    pagename:"登录页"
  })
  return {
    state
  }
})