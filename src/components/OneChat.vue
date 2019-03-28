<!-- 单人聊天框 -->
<template>
  <div class="oneChatBox">
    <div class="information">
      <div class="informationHead">
        <span class="informationId">{{chatData.name}}</span>
        <i class="el-icon-more dot"></i>
      </div>
      <!-- 判断nowChatData存在再进行渲染 -->
      <div class="informationMain" v-if="nowChatData">
        <div class="userChatBox" v-for="(item,index) in nowChatData.data" :key="'chat'+index">
          <div v-if="item.isSelf === true" class="isSelfChat">
            <div class="isSelfHead">头像</div>
            <div class="isSelfBox">
              <span>{{item.text}}</span>
            </div>
          </div>
          <div v-if="item.isSelf === false" class="noSelfChat">
            <div class="noSelfHead">头像</div>
            <div class="noSelfBox">
              <span class="noSelfContent">{{item.text}}</span>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
    <div class="sendBox">
      <div class="sendEmoji">
        <i class="fa fa-smile-o"></i>
      </div>
      <textarea class="sendContent" v-model="text" @keydown.shift.enter="sendText"></textarea>
      <div class="sendBtn">
        <el-button size="mini" type="primary" plain round @click="sendText">发送</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "app",
  data() {
    return {
      text: ""
    };
  },
  computed: {
    ...mapState({
      chatData: "chatData",
      dialogueData: "dialogueData"
    }),
    nowChatData() {
      for (let i = 0; i < this.dialogueData.length; i++) {
        if (this.dialogueData[i].id == this.chatData.name) {
          return this.dialogueData[i];
        }
      }
    }
  },
  methods: {
    sendText() {
      console.log(this.chatData);
      console.log(this.dialogueData);
      console.log(this.nowChatData);
      this.$store.dispatch("sendText", this.text);
    }
  }
};
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
@import "../../public/scss/color.scss";

.oneChatBox {
  width: 699px;
  height: 100%;

  .information {
    width: 699px;
    height: calc(100% - 160px);

    .informationHead {
      height: 60px;
      width: 699px;
      background: #ccc;
    }

    & .informationId {
      display: block;
      float: left;
      margin: 0 10px;
      height: 60px;
      line-height: 60px;
      font-size: 30px;
      font-weight: 500;
    }

    & .dot {
      display: block;
      float: right;
      margin: 20px 20px;
      height: 20px;
      line-height: 20px;
      font-size: 20px;
      font-weight: 500;
    }

    .informationMain {
      width: 699px;
      height: calc(100% - 60px);
      overflow-y: auto;
    }

    & .userChatBox {
      overflow: hidden;
      width: 660px;
      margin: 10px 10px;
      // background: #ccc;
    }

    & .isSelfChat {
      float: right;
      width: 450px;
    }

    & .isSelfHead {
      float: right;
      margin: 5px;
      width: 40px;
      height: 40px;
      background: black;
    }

    & .isSelfBox {
      float: right;
    }

    & .isSelfBox > span {
      display: block;
      max-width: 380px;
      margin: 5px;
      padding: 5px;
      background: $fncolor;
      border-radius: 5px;
      font-size: 14px;
      line-height: 20px;
      color: white;
    }

    & .noSelfChat {
      float: left;
      width: 450px;
    }
    & .noSelfHead {
      float: left;
      margin: 5px;
      width: 40px;
      height: 40px;
      background: black;
    }

    & .noSelfBox {
      float: left;
    }

    & .noSelfBox > .noSelfContent {
      display: block;
      max-width: 380px;
      margin: 5px;
      padding: 5px;
      background: $fncolor;
      border-radius: 5px;
      font-size: 14px;
      line-height: 20px;
      color: white;
    }
  }

  .sendBox {
    padding: 5px 30px;
    width: 639px;
    height: 149px;
    border-top: 1px solid #ccc;

    .sendEmoji {
      width: 639px;
      height: 30px;

      i {
        display: block;
        width: 30px;
        height: 30px;
        font-size: 20px;
        line-height: 30px;
        text-align: center;
        color: rgb(117, 117, 117);
      }
    }

    .sendContent {
      padding: 0;
      margin: 5px 0;
      display: block;
      width: 639px;
      height: 80px;
      resize: none;
      outline: none;
      border: none;
    }
    .sendBtn {
      float: right;
    }
  }
}
</style>