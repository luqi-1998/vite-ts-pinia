<template>
  <el-upload
      v-model:file-list="fileList"
      class="upload-demo"
      action
      multiple
      :before-upload="beforeUpload"
      :limit="3"
  >
    <el-button type="primary">Click to upload</el-button>
    <template #tip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500KB.
      </div>
    </template>
  </el-upload>
</template>

<script>
export default {
  name: "upload.vue"
}
</script>
<script setup>
import {ref} from "vue";
const beforeUpload=(files)=>{
  console.log(files)
}
const fileList=ref()
</script>

<style scoped>

</style>