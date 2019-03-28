<!-- 登录注册页面 -->
<template>
  <div class="loginBox">
    <el-tabs v-model="activeName" ref="loginRef" stretch>
      <el-tab-pane label="登录" name="first">
        <div class="fromOne">
          <el-form
            :model="loginDate"
            status-icon
            :rules="rules"
            ref="loginDate"
            label-width="40px"
            class="demo-ruleForm"
          >
            <el-form-item label="账号" prop="user">
              <el-input type="username" v-model="loginDate.user" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="loginDate.pass" autocomplete="off"></el-input>
            </el-form-item>
            <div class="loginBtn">
              <el-form-item label-width="0px">
                <el-button type="primary" size="medium" @click="submitForm('loginDate')">登录</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="注册" name="second">
        <div class="fromTow">
          <el-form
            :model="registerData"
            status-icon
            :rules="rules2"
            ref="register"
            label-width="80px"
            class="demo-ruleForm"
            label-position="left"
          >
            <el-form-item label="账号" prop="user">
              <el-input v-model="registerData.user" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="registerData.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" v-model="registerData.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="昵称" prop="nickname">
              <el-input v-model="registerData.nickname" autocomplete="off"></el-input>
            </el-form-item>
            <div class="registerBtn">
              <el-form-item label-position="right" label-width="0px">
                <el-button type="primary" @click="submitForm2('register')">提交</el-button>
                <el-button @click="resetForm('register')">重置</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    var loUser = (rule, value, callback) => {
      // console.log(value);
      if (value === "") {
        callback(new Error("请输入账号"));
      } else if (
        !/^([a-zA-Z0-9]{6,14})$/.test(value) ||
        /^([a-zA-Z]+)$/.test(value) ||
        /^([0-9]+)$/.test(value)
      ) {
        callback(new Error("账号格式不正确"));
        // if (this.loginDate.pass !== "") {
        //   this.$refs.loginDate.validateField("pass");
        // }
      } else {
        this.loginDate.isuser = true;
        callback();
      }
    };
    var loPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else if (!/^([\w]){6,16}$/.test(value)) {
        // console.log(value);
        callback(new Error("输入密码格式不正确"));
      } else {
        // console.log(value);
        this.loginDate.ispass = true;
        callback();
      }
    };

    // ==========注册表单格式============

    var reUser = (rule, value, callback) => {
      // console.log(value);
      if (value === "") {
        callback(new Error("请输入账号"));
      } else if (
        !/^([a-zA-Z0-9]{6,14})$/.test(value) ||
        /^([a-zA-Z]+)$/.test(value) ||
        /^([0-9]+)$/.test(value)
      ) {
        callback(new Error("账号必须由6-14位的字母和数字组成"));
      } else {
        callback();
      }
    };
    var rePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!/^([\w]){6,16}$/.test(value)) {
        callback(new Error("密码长度需为6-16位的数字,字母或下划线组成"));
      } else {
        if (this.registerData.checkPass !== "") {
          this.$refs.register.validateField("checkPass");
        }
        callback();
      }
    };
    var reCheckPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerData.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var reNickname = (rule, value, callback) => {
      // console.log(value);
      if (value === "") {
        callback(new Error("请输入昵称"));
      } else if (!/^([\u4e00-\u9fa5a-zA-Z0-9]){1,8}$/.test(value)) {
        callback(new Error("昵称只能由最高8位汉字,字母和数字组成"));
      } else {
        callback();
      }
    };
    return {
      activeName: "first",
      //登录信息
      loginDate: {
        user: "",
        pass: ""
      },
      //注册信息
      registerData: {
        user: "",
        pass: "",
        checkPass: "",
        nickname: ""
      },
      //登录表单元素配置
      rules: {
        user: [{ validator: loUser, trigger: "blur" }],
        pass: [{ validator: loPass, trigger: "blur" }]
      },
      // 注册表单元素配置
      rules2: {
        user: [{ required: true, validator: reUser, trigger: "blur" }],
        pass: [{ required: true, validator: rePass, trigger: "blur" }],
        checkPass: [
          { required: true, validator: reCheckPass, trigger: "blur" }
        ],
        nickname: [{ required: true, validator: reNickname, trigger: "blur" }]
      }
    };
  },
  methods: {
    //登录
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.dispatch("login", this.loginDate).then(() => {
            this.$router.replace("/");
          });
        } else {
          alert("账号或密码格式不正确");
          return false;
        }
      });
    },
    //注册
    submitForm2(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let options = {
            username: this.registerData.user,
            password: this.registerData.pass,
            nickname: this.registerData.nickname
          };
          this.$store.dispatch("register", options);

          console.log(this.$refs.loginRef);
        } else {
          alert("注册失败,请检查注册信息");
          return false;
        }
      });
    },
    resetForm(formName) {
      // console.log(formName)
      // console.log(this.$refs[formName])
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
.loginBox {
  width: 400px;
  background: white;
  margin: 10% auto;

  .fromOne {
    width: calc(100% - 40px);
    padding: 20px;
  }

  .fromTow {
    width: calc(100% - 40px);
    padding: 20px;
  }

  .loginBtn {
    width: 70px;
    margin: auto;
  }

  .registerBtn {
    // display: flex;
    width: 150px;
    margin: auto;
  }
}
</style>