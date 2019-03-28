<!-- 主页 -->
<template>
  <div class="homeBox" @click="miBoxShow">
    <div class="aside">
      <div class="asideLeft">
        <div class="asideLi" @click.stop="asideLiClick">
          <img>
          <MIBox ref="MIBox"></MIBox>
        </div>
        <router-link tag="div" :to="{name:'chat'}" class="asideLi">
          <i class="fa fa-comment"></i>
        </router-link>
        <router-link tag="div" :to="{name:'address'}" class="asideLi">
          <i class="fa fa-user"></i>
        </router-link>
        <router-link tag="div" :to="{name:'news'}" class="asideLi">
          <i class="fa fa-newspaper-o"></i>
        </router-link>
        <div class="asideLi liBt">
          <i class="fa fa-bars"></i>
        </div>
      </div>
      <div class="asideRight">
        <div class="searchBox">
          <div class="search">
            <i class="el-icon-search"></i>
            <input placeholder="搜索">
          </div>
          <el-badge
            :value="presenceArr.length"
            :hidden="presenceArr.length ?false :true"
            class="item"
          >
            <div class="addFriend" @click.stop="addFd">+</div>
          </el-badge>
        </div>
        <div class="chatViewBox">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <div class="main">
      <OneChat v-show="mineIndex==1 ?true :false"></OneChat>
    </div>
    <addFdBox ref="addFdBox"></addFdBox>
  </div>
</template>

<script>
import { mapState } from "vuex";
import MIBox from "../components/MIBox";
import AddFdBox from "../components/AddFdBox";
import OneChat from "../components/OneChat"

export default {
  name: "home",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      aPresence: "aPresence",
      presenceArr: "presenceArr",
      mineIndex:"mineIndex",
      chatData:"chatData"
    })
  },
  watch: {
    aPresence() {
      this.$notify({
        title: "你有一条订阅信息等待处理",
        message: this.aPresence.from + "请求添加好友",
        duration: 0
      });
      // console.log(this.presenceArr);
    }
  },
  components: {
    MIBox,
    AddFdBox,
    OneChat
  },
  methods: {
    asideLiClick() {
      this.$refs.MIBox.miDateshow();
    },
    miBoxShow() {
      this.$refs.MIBox.miDateNoShow();
      this.$refs.addFdBox.addFdNoShow();
    },
    addFd() {
      this.$refs.addFdBox.addFdBoxShow();
    }
  }
};
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
@import "../../public/scss/color.scss";

.homeBox {
  position: relative;
  display: flex;
  width: 1000px;
  height: 90%;
  min-height: 400px;
  margin: 2.5% auto;
  background: #333;
  border: 1px solid #ccc;

  .aside {
    display: flex;
    width: 300px;
    height: 100%;
    border-right: 1px solid #ccc;
    background: white;

    .asideLeft {
      position: relative;
      width: 60px;
      height: 100%;
      background: rgb(31, 31, 31);
    }

    & .asideLi {
      position: relative;
      width: 50px;
      height: 50px;
      padding: 5px;
      font-size: 20px;
      line-height: 50px;
      text-align: center;
      color: rgba(255, 255, 255, 0.8);
    }

    & .liBt {
      position: absolute;
      bottom: 0;
      left: 0;
    }

    & .homeActive {
      color: $fncolor;
    }
    .asideRight {
      width: 240px;
      height: 100%;
    }

    .searchBox {
      display: flex;
      width: 230px;
      height: 30px;
      padding: 15px 5px;
      background: rgb(235, 235, 235);
    }

    & .search {
      display: flex;
      width: 200px;
      height: 28px;
      border: 1px solid #ccc;
      border-radius: 20px;
    }

    & .search > i {
      display: block;
      margin: 5px 2px;
      width: 20px;
      height: 20px;
      line-height: 18px;
    }

    & .search > input {
      background: none;
      border: none;
      outline: none;
      margin: 5px 0;
    }

    .addFriend {
      margin: 5px 0;
      margin-left: 5px;
      width: 20px;
      height: 20px;
      // border: 1px solid rgb(124, 124, 124);
      font-size: 15px;
      text-align: center;
      line-height: 18px;
      border-radius: 5px;
      background: #ccc;
      cursor: pointer;
    }

    .addFriend:hover {
      background: rgb(221, 221, 221);
    }

    .chatViewBox {
      height: calc(100% - 60px);
      width: 240px;
    }
  }

  .main {
    width: 700px;
    height: 100%;
    overflow-y: auto;
    background: white;
  }
}
</style>