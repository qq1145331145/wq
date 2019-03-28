import Vue from 'vue'
import Vuex from 'vuex'
// import WebIM from '../config'
import actions from './actions'
import mutations from './mutations'


Vue.use(Vuex)

const state = {
  login: {
    username: '',
    password: '',
    nickname: '',
    token:'',
    fetching: false,
    error: false,
    isLogin:false,
  },

  //home>mine 聊天框数据
  mineIndex:null,   //1为单人聊天框 2为群组 3为新闻页
  chatData:{}, //正在聊天的用户信息
  userText:null, //用户发送的内容
  dialogueData:[{id:'测试用户id',data:[{text:'测试发送信息',isSelf:false}]}],
  // dialogueData:[{id:'a12345',data:[{text:'你好',isSelf:false},{text:'不好',isSelf:true}]},{id:'b12345',data:[{text:'23333',isSelf:false},{text:'你好',isSelf:false},{text:'不好',isSelf:true}]}], //记录聊天信息格式为{id:[{text:'2333',isSelf:true}} text为信息 isSelf判断是谁发的

  //订阅提示框显示
  addHintShow:false,
  //订阅单条信息
  aPresence:null,
  //订阅信息列表
  presenceArr:[],
  //好友列表
  friendsArr:[]
}

    export default new Vuex.Store({
      state,
      mutations,
      actions

    })