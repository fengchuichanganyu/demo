<template>
  <div class="login-box">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="70px"
      class="demo-ruleForm"
    >
      <h2>后台管理系统</h2>
      <el-form-item label="账号：" prop="username">
        <el-input v-model="ruleForm.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input
          v-model="ruleForm.password"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          class="loginbtn"
          type="primary"
          @click="submitForm(ruleFormRef)"
          >登录</el-button
        >
        <el-button class="loginbtn" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import { defineComponent, reactive, toRefs, ref } from 'vue'
import { LoginData } from '../type/login'
import type { FormInstance } from 'element-plus'
import { login } from '../request/api'

export default defineComponent({
  setup() {
    const data = reactive(new LoginData())

    const rules = {
      username: [
        {
          required: true,
          message: '请输入账号',
          trigger: 'blur',
        },
        {
          min: 3,
          max: 10,
          message: '账号长度3到10之间',
          trigger: 'blur',
        },
      ],

      password: [
        {
          required: true,
          message: '请输入密码',
          trigger: 'blur',
        },
        {
          min: 3,
          max: 10,
          message: '密码长度3到10之间',
          trigger: 'blur',
        },
      ],
    }
    //登录
    const ruleFormRef = ref<FormInstance>()
    const router = useRouter()
    const submitForm = async (formEl: FormInstance | undefined) => {
      // console.log(formEl)
      if (!formEl) return
      //对表单的内容验证
      //valid为布尔类型
      formEl.validate(async (valid) => {
        if (valid) {
          // console.log(valid)
          await login(data.ruleForm).then((res) => {
            // console.log(res)
            localStorage.setItem('token', res.data.token)
            router.push('/')
          })
          // .catch((error) => {
          //   console.log('wewqrw', error, 'qwewrfw')
          // })
        } else {
          console.log('error submit!')
        }
      })
    }
    //重置
    const resetForm = () => {
      data.ruleForm.username = ''
      data.ruleForm.password = ''
    }
    return { ...toRefs(data), submitForm, rules, ruleFormRef, resetForm }
  },
})
</script>

<style lang="scss" scoped>
.login-box {
  width: 100%;
  height: 100%;
  background: url('../assets/微信图片_20230828151910.jpg');
  padding: 1px;
  text-align: center;
  .demo-ruleForm {
    width: 500px;
    margin: 200px auto;
    background-color: #fff;
    padding: 40px;
    border-radius: 20px;
  }
  .loginbtn {
    width: 48%;
  }
  h2 {
    margin-bottom: 20px;
  }
}
</style>
