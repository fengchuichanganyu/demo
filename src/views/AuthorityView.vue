<template>
  <div>
    <el-tree
      ref="treeRef"
      :data="list"
      show-checkbox
      node-key="roleId"
      :default-checked-keys="authority"
      :check-strictly="true"
      :props="{ children: 'roleList', label: 'name' }"
    />
  </div>
  <el-button @click="changeAuthority">确认修改</el-button>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { InitData } from '@/type/authority'
import { getAuthorityList } from '../request/api'
export default defineComponent({
  setup() {
    const route = useRoute()
    // console.log(route)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params: any = route.params
    const data = reactive(new InitData(params.id, params.authority))
    onMounted(() => {
      getAuthorityList().then((res) => {
        console.log(res.data)
        data.list = res.data
      })
    })

    const changeAuthority = () => {
      console.log(
        data.treeRef.getCheckedKeys().sort(function (a: number, b: number) {
          return a - b
        })
      )
    }
    return { ...toRefs(data), changeAuthority }
  },
})
</script>

<style scoped></style>
