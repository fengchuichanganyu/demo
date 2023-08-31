<template>
  <div>角色列表</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { getRoleList } from '../request/api'
import { InitData } from '../type/role'
export default defineComponent({
  setup() {
    const data = reactive(new InitData())
    onMounted(() => {
      getRoleList().then((res) => {
        console.log(res)
      })
    })
    return { ...toRefs(data) }
  },
})
</script>

<style scoped></style>
