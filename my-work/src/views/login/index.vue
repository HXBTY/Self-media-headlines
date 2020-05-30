<template>
  <div class="login-container">
    <img
      src="../../assets/images/logo.gif"
      alt
      style="position: absolute; top: 0px; left: 0px; width: 220px;"
    />
    <div class="login-box">
      <!-- ref: 必须属性, 用于之后的表单的使用 -->
      <!-- :rules 绑定表单教养轨辙 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules">
        <span style="text-align: center; display:block;">手机号登录/注册</span>
        <hr
          style="background-color: #d9d9d9; height: 1px; border: none; margin: 13px 0;"
        />
        <!-- prop: 必须属性, 使得校验规则与当前项目表单联系起来, 属性值必须是表单对象的成员名称 -->
        <el-form-item prop="phone">
          <el-input
            v-model="loginForm.phone"
            placeholder="请输入手机号码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="yz_code">
          <el-button>获取验证码</el-button>
          <el-input
            v-model="loginForm.yz_code"
            placeholder="请输入校验码"
            style="width: 190px; padding-left: 5px;"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <span>
            登录 / 注册即表示同意
            <a style="color: #406599;">用户协议</a> 和
            <a style="color: #406599;">隐私条款</a>
          </span>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%;" type="primary" @click="login()"
            >确定</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  // 注意：属性绑定、双向数据绑定的值需要通过data做支持
  data() {
    return {
      loginForm: {
        phone: "13234721566", // 手机号码
        yz_code: "1234" // 校验码
      },
      loginFormRules: {
        phone: [
          { required: true, message: "手机号码必填" },
          { pattern: /^1[35789]\d{9}$/, message: "手机号码格式不对" }
        ],
        yz_code: [{ required: true, message: "验证码必填" }]
      }
    };
  },
  methods: {
    // 登录系统
    login() {
      // 在点击确定后, 获取登录表单的所有内容校验内容是否正确
      this.$refs.loginFormRef.validate((valid, obj) => {
        // validate用于表单校验, 若是通过, 则返回连个参数: 布尔值和校验规则
        if (valid) {
          const pro = this.$http.post("/login", this.loginForm);
          pro
            .then(result => {
              if (result.data.status === 0) {
                // 将后端发送过来的用户信息添加到localStorage中
                window.localStorage.setItem(
                  "userinfo",
                  JSON.stringify(result.data.data)
                );
                this.$router.push({ name: "home" });
              } else {
                return this.$message({
                  type: "error",
                  message: "用户名或密码错误:" + result.data.message,
                  duration: 3000
                });
              }
            })
            .catch(err => {
              return this.$message({
                type: "error",
                message: "用户名或密码错误:" + err,
                duration: 3000
              });
            });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login-container {
  height: 100%;
  background-color: gray;
  background-image: url("../../assets/images/login_bg.png");
  display: flex;
  justify-content: center;
  align-items: center;
  .login-box {
    width: 410px;
    height: 345px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    .el-form {
      width: 75%;
    }
  }
}
</style>
