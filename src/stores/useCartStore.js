import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', () => {
  const state = reactive({
    cart: []
  })
  const addToCart = (item) => {
    state.cart.push(item)
  }
  const listids = computed(() => {
    return state.cart.map(item => item.id);
  })
  const removeFromCart = (cid) => {
    //我真tm服了，终于知道为啥出错了，删除一定要根据id删除，而不是根据整个对象删除，对象在修改count过程中改变了md
    state.cart.splice(listids.value.indexOf(cid), 1);
  }
  const clearCart = () => {
    state.cart.splice(0);
  }
  const getCommodityCount = (cid) => {
    return state.cart.filter(item => item.id == cid).length;
  }
  const sumMoney = computed(() => {
    const priceList=state.cart.map(item=>item.price/100);
    return priceList.reduce((sum,cur)=>sum+cur,0);
  })
  return {
    cart: state.cart,
    addToCart,
    removeFromCart,
    clearCart,
    getCommodityCount,
    sumMoney
  }
})