<template>
  <div>111</div>
  <drag-weektime-vue
      :value="mult_timeRange"
      :data="weektimeData"
      @on-clear="clearWeektime"
  />
</template>

<script setup>
import weektimeData from '@/utils/weektime_data'
import DragWeektimeVue from '../components/darg-weeektime-vue3'
import {computed} from "vue";
const splicing=(list)=>{
  let same
  let i = -1
  const len = list.length
  const arr = []

  if (!len) return
  while (++i < len) {
    const item = list[i]
    if (item.check) {
      if (item.check !== Boolean(same)) {
        arr.push(...['、', item.begin, '~', item.end])
      } else if (arr.length) {
        arr.pop()
        arr.push(item.end)
      }
    }
    same = Boolean(item.check)
  }
  arr.shift()
  return arr.join('')
}
const mult_timeRange=computed(()=>{
  return weektimeData.map((item) => {
    return {
      id: item.row,
      week: item.value,
      value: splicing(item.child)
    }
  })
})
const clearWeektime=()=>{
weektimeData.forEach((item) => {
  item.child.forEach((t) => {
    // this.$set(t, 'check', false)
    t.check=false
  })
})
}
</script>

<style scoped>

</style>