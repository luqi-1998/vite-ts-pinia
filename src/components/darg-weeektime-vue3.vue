<template>
  <div class="c-weektime">
    <div class="c-schedue"></div>
    <div
        :class="{ 'c-schedue': true, 'c-schedue-notransi': state.mode }"
        :style="styleValue"
    ></div>

    <table :class="{ 'c-min-table': props.colspan < 2 }" class="c-weektime-table">
      <thead class="c-weektime-head">
      <tr>
        <th rowspan="8" class="week-td">星期/时间</th>
        <th :colspan="12 * props.colspan">00:00 - 12:00</th>
        <th :colspan="12 * props.colspan">12:00 - 24:00</th>
      </tr>
      <tr>
        <td v-for="t in theadArr" :key="t" :colspan="props.colspan">{{ t }}</td>
      </tr>
      </thead>
      <tbody class="c-weektime-body">
      <tr v-for="t in data" :key="t.row">
        <td>{{ t.value }}</td>
        <td
            v-for="n in t.child"
            :key="`${n.row}-${n.col}`"
            :data-week="n.row"
            :data-time="n.col"
            :class="selectClasses(n)"
            @mouseenter="cellEnter(n)"
            @mousedown="cellDown(n)"
            @mouseup="cellUp(n)"
            class="weektime-atom-item"
        ></td>
      </tr>
      <tr>
        <td colspan="49" class="c-weektime-preview">
          <div class="g-clearfix c-weektime-con">
              <span class="g-pull-left">{{
                  selectState ? '已选择时间段' : '可拖动鼠标选择时间段'
                }}</span>
            <a @click.prevent="$emit('on-clear')" class="g-pull-right"
            >清空选择</a
            >
          </div>
          <div v-if="selectState" class="c-weektime-time">
            <div v-for="t in selectValue" :key="t.id">
              <p v-if="t.value">
                <span class="g-tip-text">{{ t.week }}：</span>
                <span>{{ t.value }}</span>
              </p>
            </div>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import {computed, reactive} from "vue";

const createArr=(len)=>{
  return Array.from(Array(len)).map((ret,id)=>id)
}
const props=defineProps({
  value: {
    type: Array,
    required: true
  },
  data: {
    type: Array,
    required: true
  },
  colspan: {
    type: Number,
    default() {
      return 2
    }
  }
})
const state=reactive({
  width: 0,
  height: 0,
  left: 0,
  top: 0,
  mode: 0,
  row: 0,
  col: 0,
  theadArr: []
})
const styleValue=computed(()=>{
  return {
    width: `${state.width}px`,
    height: `${state.height}px`,
    left: `${state.left}px`,
    top: `${state.top}px`
  }
})
const selectValue=computed(()=>{
  return props.value
})
const selectState=computed(()=>{
  return props.value.some((ret)=>ret.value)
})
const selectClasses=computed(()=>{
  return (n)=>(n.check?'ui-selected':'')
})
state.theadArr=createArr(24)
const cellEnter=(item)=>{
  const ele = document.querySelector(
      `td[data-week='${item.row}'][data-time='${item.col}']`
  )
  if (ele && !state.mode) {
    state.left = ele.offsetLeft
    state.top = ele.offsetTop
  } else if (item.col <= state.col && item.row <= state.row) {
    state.width = (state.col - item.col + 1) * ele.offsetWidth
    state.height = (state.row - item.row + 1) * ele.offsetHeight
    state.left = ele.offsetLeft
    state.top = ele.offsetTop
  } else if (item.col >= state.col && item.row >= state.row) {
    state.width = (item.col - state.col + 1) * ele.offsetWidth
    state.height = (item.row - state.row + 1) * ele.offsetHeight
    if (item.col > state.col && item.row === state.row)
      state.top = ele.offsetTop
    if (item.col === state.col && item.row > state.row)
      state.left = ele.offsetLeft
  } else if (item.col > state.col && item.row < state.row) {
    state.width = (item.col - state.col + 1) * ele.offsetWidth
    state.height = (state.row - item.row + 1) * ele.offsetHeight
    state.top = ele.offsetTop
  } else if (item.col < state.col && item.row > state.row) {
    state.width = (state.col - item.col + 1) * ele.offsetWidth
    state.height = (item.row - state.row + 1) * ele.offsetHeight
    state.left = ele.offsetLeft
  }
}
const cellDown=(item)=>{
  const ele = document.querySelector(
      `td[data-week='${item.row}'][data-time='${item.col}']`
  )
  state.check = Boolean(item.check)
  state.mode = 1
  if (ele) {
    state.width = ele.offsetWidth
    state.height = ele.offsetHeight
  }

  state.row = item.row
  state.col = item.col
}
const selectWeek=(row, col, check)=>{
  const [minRow, maxRow] = row
  const [minCol, maxCol] = col
  props.data.forEach((item) => {
    item.child.forEach((t) => {
      if (
          t.row >= minRow &&
          t.row <= maxRow &&
          t.col >= minCol &&
          t.col <= maxCol
      ) {
        this.$set(t, 'check', check)
      }
    })
  })
}
const cellUp=(item)=>{
  if (item.col <= state.col && item.row <= state.row) {
    selectWeek([item.row, state.row], [item.col, state.col], !state.check)
  } else if (item.col >= state.col && item.row >= state.row) {
    selectWeek([state.row, item.row], [state.col, item.col], !state.check)
  } else if (item.col > state.col && item.row < state.row) {
    selectWeek([item.row, state.row], [state.col, item.col], !state.check)
  } else if (item.col < state.col && item.row > state.row) {
    selectWeek([state.row, item.row], [item.col, state.col], !state.check)
  }

  state.width = 0
  state.height = 0
  state.mode = 0
}
</script>


<style lang="less" scoped>
.c-weektime {
  min-width: 640px;
  position: relative;
  display: inline-block;
}
.c-schedue {
  background: #598fe6;
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0.6;
  pointer-events: none;
}
.c-schedue-notransi {
  transition: width 0.12s ease, height 0.12s ease, top 0.12s ease,
  left 0.12s ease;
}
.c-weektime-table {
  border-collapse: collapse;
  th {
    vertical-align: inherit;
    font-weight: bold;
  }
  tr {
    height: 30px;
  }
  tr,
  td,
  th {
    user-select: none;
    border: 1px solid #dee4f5;
    text-align: center;
    min-width: 12px;
    line-height: 1.8em;
    transition: background 0.2s ease;
  }
  .c-weektime-head {
    font-size: 12px;
    .week-td {
      width: 70px;
    }
  }
  .c-weektime-body {
    font-size: 12px;
    td {
      &.weektime-atom-item {
        user-select: unset;
        background-color: #f5f5f5;
      }
      &.ui-selected {
        background-color: #598fe6;
      }
    }
  }
  .c-weektime-preview {
    line-height: 2.4em;
    padding: 0 10px;
    font-size: 14px;
    .c-weektime-con {
      line-height: 46px;
      user-select: none;
    }
    .c-weektime-time {
      text-align: left;
      line-height: 2.4em;
      p {
        max-width: 625px;
        line-height: 1.4em;
        word-break: break-all;
        margin-bottom: 8px;
      }
    }
  }
}
.c-min-table {
  tr,
  td,
  th {
    min-width: 24px;
  }
}
.g-clearfix {
  &:after,
  &:before {
    clear: both;
    content: ' ';
    display: table;
  }
}
.g-pull-left {
  float: left;
}
.g-pull-right {
  float: right;
}
.g-tip-text {
  color: #999;
}
</style>