<!-- 订阅盒子 -->
import { mapState } from 'vuex';
<template>
  <transition name="el-fade-in-linear">
    <div v-show="show" class="AddFdBox" @click.stop>
      <el-tabs type="border-card" stretch>
        <el-tab-pane label="添加好友">
          <div>
            <div class="leftBox">
              <div class="search">
                <i class="el-icon-search"></i>
                <input v-model="to" placeholder="输入需要添加好友的ID">
              </div>
              <textarea class="remark" type="text" v-model="message"></textarea>
              <div class="btn">
                <el-button type="primary" size="mini" @click.stop="addFriend" round>添加好友</el-button>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="好友申请">
          <div class="rightBox">
            <div class="apply" v-for="(item,index) in this.presenceArr" :key="'ap'+index">
              <div class="applyUser">
                <span>{{item.from}}</span>
                <span>{{item.status}}</span>
              </div>
              <div class="applySelect">
                <i class="el-icon-success permit" @click="friendDispose(item,1)"></i>
                <i class="el-icon-error reject" @click="friendDispose(item,2)"></i>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </transition>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "app",
  data() {
    return {
      //加好友
      to: "",
      message: "加个好友呗!",

      show: false
    };
  },
  computed: {
    ...mapState({
      presenceArr: "presenceArr"
    })
  },
  methods: {
    addFdBoxShow() {
      this.show = true;
    },
    addFdNoShow() {
      this.show = false;
    },
    addFriend() {
      // console.log(this.to,this.message);
      this.$store.dispatch("addFriends", {
        to: this.to,
        message: this.message
      });
    },
    friendDispose(item,num){
      // console.log(item,num)
      this.$store.dispatch('friendDispose',{item:item,num:num})
    }
  }
};
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
.AddFdBox {
  position: absolute;
  top: calc(50% - 200px);
  left: calc(50% - 200px);
  width: 400px;
  background: white;
  //   box-shadow: 0 0 20px 1px rgb(180, 180, 180);

  .leftBox {
    height: 300px;
    width: 300px;
    margin: auto;

    .search {
      margin: 5px auto;
      display: flex;
      width: 290px;
      height: 28px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }

    .search > i {
      display: block;
      margin: 5px 2px;
      width: 20px;
      height: 20px;
      line-height: 18px;
    }

    .search > input {
      display: block;
      width: 280px;
      background: none;
      border: none;
      outline: none;
      margin: 5px 0;
    }

    .remark {
      margin: 0 auto;
      display: block;
      height: 200px;
      width: 290px;
      resize: none;
      outline: none;
      border-color: #ccc;
      border-radius: 5px;
      color: rgb(90, 90, 90);
      font-size: 16px;
    }

    .btn {
      margin: 10px auto;
      padding: auto;
      width: 80px;
      height: 30px;
    }
  }

  .rightBox {
    width: 350px;
    height: 350px;
    margin: auto;
    overflow-y: auto;

    .apply {
      display: flex;
      padding: 5px 0;
      width: 350px;
      height: 60px;
      border-bottom: 1px solid #ccc;
    }

    .applyUser {
      width: 290px;
      height: 60px;
    }
    .applyUser > span {
      display: block;
      width: 290px;
      height: 30px;
      line-height: 30px;
    }

    .applySelect {
      display: flex;
      width: 60px;
      height: 60px;
    }

    & .permit{
      color: rgb(0, 153, 46);
      cursor: pointer;
    }

    & .permit:hover{
      color: rgba(0, 153, 46, .6)
    }


    & .reject{
      color: rgb(177, 26, 26);
      cursor: pointer;
    }

        & .reject:hover{
      color: rgba(177, 26, 26, .6)
    }

    .applySelect > i {
      display: block;
      width: 30px;
      height: 30px;
      margin: auto;
      line-height: 30px;
      text-align: center;
    }
  }
}
</style>