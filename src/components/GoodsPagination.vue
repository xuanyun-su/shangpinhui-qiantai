<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="emits('getPageNo', pageNo - 1)">上一页</button>
    <button v-if="startNumAndEndNum.start > 1" @click="emits('getPageNo', 1)" :class="{active:pageNo == 1}">
      1
    </button>
    <button v-if="startNumAndEndNum.start > 2">···</button>

    <template v-for="(page, index) in startNumAndEndNum.end">
      <button
        :key="index"
        v-if="page >= startNumAndEndNum.start"
        @click="emits('getPageNo', page)"
        :class="{active:pageNo == page}"
      >
        {{ page }}
      </button>
    </template>

    <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
    <button v-if="startNumAndEndNum.end < totalPage" @click="emits('getPageNo', totalPage)" :class="{active:pageNo == totalPage}">
      {{ totalPage }}
    </button>
    <button :disabled="pageNo == totalPage" >下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  pageNo: number
  pageSize: number
  total: number
  countinues: number
}>()
let totalPage = computed(() => {
  // 向上取整
  return Math.ceil(props.total / props.pageSize)
})
let startNumAndEndNum = computed(() => {
  let start = 0,
    end = 0
  if (props.countinues > totalPage.value) {
    start = 1
    end = totalPage.value
  } else {
    start = props.pageNo - Math.floor(props.countinues / 2)
    end = props.pageNo + Math.floor(props.countinues / 2)
  }
  if (start < 1) (start = 1), (end = props.countinues)
  if (end > totalPage.value) (end = totalPage.value), (start = totalPage.value - props.countinues)

  return { start, end }
})

const emits = defineEmits<{ getPageNo: [pageNo: number] }>()
</script>

<style scoped lang="less">
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
