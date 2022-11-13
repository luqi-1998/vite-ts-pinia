<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import {GlobalStore} from '@/store'
import HelloWorld from './components/HelloWorld.vue'
import Axios from "axios";
import {ref} from "vue";
// import HTTP from './utils/fetch'
const url=ref()
const global = GlobalStore()
Axios.get('/api/download',{responseType:'blob'}).then(res=>{
  console.log(res)
  url.value=window.URL.createObjectURL(res.data)
})
console.log(global)
</script>
<template>
  <el-button>点击</el-button>
  <iframe class="prism-player" :src="url" width="100%" height="1000px%"></iframe>

</template>

<style scoped lang="less">

</style>
