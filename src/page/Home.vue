<template>
<!--  <div>-->
<!--    1111-->
<!--  </div>-->
  <drag-weektime
      v-model="mult_timeRange"
      :data="weektimeData"
      @on-clear="clearWeektime"
  />
</template>

<script>
import weektimeData from '@/utils/weektime_data'
import DragWeektime from '@/components/drag-weektime'
import {computed} from "vue";
function splicing(list) {
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
export default {
  name: "Home",
  components: { DragWeektime },
  computed : {
  mult_timeRange() {
    return weektimeData.map((item) => {
      return {
        id: item.row,
        week: item.value,
        value: splicing(item.child)
      }
    })
  },
  methods: {
    clearWeektime() {
      this.weektimeData.forEach((item) => {
        item.child.forEach((t) => {
          this.$set(t, 'check', false)
        })
      })
    },
  }
}
}
</script>
<script setup>

</script>
<style scoped>

</style>