<template>
  <div>
    <el-tree
      :data="list"
      show-checkbox
      node-key="roleId"
      :default-checked-keys="authority"
      :check-strictly="true"
      :props="{ children: 'roleList', label: 'name' }"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { InitData } from '@/type/authority'
import { getAuthorityList } from '../request/api'
export default defineComponent({
  setup() {
    const route = useRoute()
    console.log(route)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params: any = route.params
    const data = reactive(new InitData(params.id, params.authority))
    onMounted(() => {
      getAuthorityList().then((res) => {
        console.log(res)
        data.list = res.data
      })
    })
    return { ...toRefs(data) }
  },
})
</script>

<style scoped></style>
