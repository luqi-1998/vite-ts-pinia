<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import {GlobalStore} from '@/store'
import HelloWorld from './components/HelloWorld.vue'
let arr:[]=[]
console.log(arr)
const global = GlobalStore()
</script>
<template>
  <el-button>点击</el-button>
  <img alt="Vue logo" src="./assets/logo.png"/>
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite"/>
</template>

<style scoped lang="less">

</style>
