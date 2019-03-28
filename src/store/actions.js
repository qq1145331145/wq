import WebIM from '../config'
import store from '.';
// import Vue from 'vue';

export default {
  register(context, options) {
    options = {
      ...options,
      appKey: WebIM.config.appkey,
      success: function () {
        alert('注册成功')
      },
      error: function () {
        alert('注册失败,用户已经存在')
      },
      apiUrl: WebIM.config.apiURL
    };
    WebIM.conn.registerUser(options);
  },
  login({
    commit
  }, options) {
    return new Promise((resolve) => {
      options = {
        apiUrl: WebIM.config.apiURL,
        user: options.user,
        pwd: options.pass,
        appKey: WebIM.config.appkey,
        success: function (token) {
          let nickname = token.user.nickname
          // console.log(nickname)
          commit('login', {
            user: options.user,
            pwd: options.pwd,
            nickname: nickname,
            token: token.access_token
          })
          // console.log(store.commit,{commit})
          resolve()
          // console.log(options.user,options.pwd)
          // console.log(token)
        },
        error: function () {
          alert('登录失败,账号或密码输入不正确')
        }
      };
      WebIM.conn.open(options);
    })
  },
  friendList({commit}) {
    WebIM.conn.getRoster({
      success: function (roster) {
        commit('friendLiPush',roster)
        //获取好友列表，并进行好友列表渲染，roster格式为：
        /** [
              {
                jid:'asemoemo#chatdemoui_test1@easemob.com',
                name:'test1',
                subscription: 'both'
              }
            ]
        */
        // for ( var i = 0, l = roster.length; i < l; i++ ) {
        //   var ros = roster[i];    
        //   if ( ros.subscription === 'both' || ros.subscription === 'to' ) {

        //   }
        // }
      },
    });
  },
  addFriends(context, options) {
    WebIM.conn.subscribe({
      to: options.to,
      message: options.message
    });
  },
  friendDispose(context,data) {
    WebIM.conn.listen({
      onPresence: function (message) {
        handlePresence(message);
      }
    });


    var handlePresence = function (data) {
    if (data.num == 1) {
      //对方收到请求加为好友
      if (data.item.type === 'subscribe') {

        /*同意添加好友操作的实现方法*/
        WebIM.conn.subscribed({
          to: data.item.from,
          message: '[resp:true]'
        });
        WebIM.conn.subscribe({ //需要反向添加对方好友
          to: data.item.from,
          message: '对方通过了你的添加请求'
        });
        // console.log('允许')
      }
    }else if(data.num === 2){
        //对方收到请求加为好友
        if (data.item.type === 'subscribe') {
          /*拒绝添加好友的方法处理*/
          WebIM.conn.unsubscribed({
            to: data.item.from,
            message : '对方拒绝了你的添加请求'
          });
        }
        // console.log('拒绝')
      }
    }
    handlePresence(data)
  },

  //发送文本信息
  sendText(content,text){
    content.state.userText = text
    console.log(content.state)
    // console.log(state.chatData)
    
    var sendPrivateText = function (state) {
      var id = WebIM.conn.getUniqueId();                 // 生成本地消息id
      var msg = new WebIM.message('txt', id);      // 创建文本消息
      msg.set({
          msg:state.userText,                  // 消息内容
          to: state.chatData.name,                          // 接收消息对象（用户id）
          roomType: false,                          
          success: function (id, serverMsgId) {
            content.commit('dialogueDataPush',{id:state.chatData.name,data:{text:text,isSelf:true}})
            console.log(id,serverMsgId)
            //   console.log('send private text Success');  
          },                                       // 对成功的相关定义，sdk会将消息id登记到日志进行备份处理
          fail: function(e){
              // console.log("Send private text error");  
          }                                        // 对失败的相关定义，sdk会将消息id登记到日志进行备份处理
      });
      WebIM.conn.send(msg.body);
  };
  sendPrivateText(content.state);
},

  //回调函数
  listen({
    dispatch,
    commit
  }) {
    WebIM.conn.listen({
      onOpened: function (message) { //连接成功回调
        // 如果isAutoLogin设置为false，那么必须手动设置上线，否则无法收消息
        // 手动上线指的是调用conn.setPresence(); 如果conn初始化时已将isAutoLogin设置为true
        // 则无需调用conn.setPresence();             
        // console.log('连接成功', message)
        dispatch('friendList')
      },
      onClosed: function (message) {
        console.log('连接关闭回调', message)
      }, //连接关闭回调
      onTextMessage: function (message) {
        commit('TextMessage',message)
        console.log('收到文本消息',message)
      }, //收到文本消息
      // onEmojiMessage: function (message) {}, //收到表情消息
      // onPictureMessage: function (message) {}, //收到图片消息
      // onCmdMessage: function (message) {}, //收到命令消息
      // onAudioMessage: function (message) {}, //收到音频消息
      // onLocationMessage: function (message) {}, //收到位置消息
      // onFileMessage: function (message) {}, //收到文件消息
      // onVideoMessage: function (message) {
      //   var node = document.getElementById('privateVideo');
      //   var option = {
      //     url: message.url,
      //     headers: {
      //       'Accept': 'audio/mp4'
      //     },
      //     onFileDownloadComplete: function (response) {
      //       var objectURL = WebIM.utils.parseDownloadResponse.call(conn, response);
      //       node.src = objectURL;
      //     },
      //     onFileDownloadError: function () {
      //       console.log('File down load error.')
      //     }
      //   };
      //   WebIM.utils.download.call(conn, option);
      // }, //收到视频消息
      onPresence: function (message) {
        commit('presenceArrPush', message)
        console.log('收到订阅', message)
      }, //处理“广播”或“发布-订阅”消息，如联系人订阅请求、处理群组、聊天室被踢解散等消息
      onRoster: function (message) {
        console.log(message)
      }, //处理好友申请
      // onInviteMessage: function (message) {}, //处理群组邀请
      // onOnline: function () {}, //本机网络连接成功
      // onOffline: function () {}, //本机网络掉线
      // onError: function (message) {}, //失败回调
      // onBlacklistUpdate: function (list) { //黑名单变动
      //   // 查询黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息
      //   console.log(list);
      // },
      // onReceivedMessage: function (message) {}, //收到消息送达服务器回执
      // onDeliveredMessage: function (message) {}, //收到消息送达客户端回执
      // onReadMessage: function (message) {}, //收到消息已读回执
      // onCreateGroup: function (message) {}, //创建群组成功回执（需调用createGroupNew）
      // onMutedMessage: function (message) {} //如果用户在A群组被禁言，在A群发消息会走这个回调并且消息不会传递给群其它成员
    })
  }
}