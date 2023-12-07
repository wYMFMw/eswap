import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePageStore = defineStore('pageStore', () => {
  const pagename = ref("首页")
  return {
    pagename
  }
})