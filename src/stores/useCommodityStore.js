import { ref, computed,reactive } from 'vue'
import { defineStore } from 'pinia'

export const useCommodityStore = defineStore('commodity', () => {
  const state=reactive({
    commodityList:[],
    categories:[],
    categorytree:[]
  })
  return {
    state
  }
})