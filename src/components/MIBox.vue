<!-- 头像信息 -->
<template>
  <transition name="el-zoom-in-top">
    <div class="miDataBox" v-show="miDate" ref="miDataBox">
      <div class="mihead">
        <div class="miData">
          <span class="nickname">{{login.nickname}}</span>
          <span class="username">WQ号:{{login.username}}</span>
        </div>
        <div class="portrait">头像</div>
      </div>
      <div class="mifoot"></div>
    </div>
  </transition>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      miDate: false
    };
  },
  computed: {
    ...mapState({
      login: "login"
    })
  },
  methods: {
    miDateshow() {
      console.log(this.login)
      this.miDate = true;
    },
    miDateNoShow() {
      this.miDate = false;
      // console.log(this.login)
    }
  }
};
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
.miDataBox {
  position: absolute;
  top: 5px;
  left: 55px;
  padding: 20px;
  width: 260px;
  height: 260px;
  background: white;
  border-radius: 5px;
  box-shadow: 0 0 10px 1px #707070;
  z-index: 100;

  .mihead {
    display: flex;
    padding: 30px 0;
    width: 260px;
    height: 70px;
    border-bottom: 1px solid #707070;

    .miData {
      width: 205px;
      height: 70px;

      span {
        display: block;
        height: 35px;
        width: 205px;
      }

      .nickname {
        font-size: 16px;
        color: #2b2b2b;
        line-height: 35px;
        text-align: left;
        font-weight: 800;
      }

      .username {
        font-size: 12px;
        color: #777777;
        line-height: 35px;
        text-align: left;
        font-weight: 600;
      }
    }

    .portrait {
      margin: 5px 0;
      width: 60px;
      height: 60px;
      background: black;
    }
  }
}
</style>