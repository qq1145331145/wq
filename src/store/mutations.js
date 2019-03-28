import Vue from 'vue'

export default {
    login(state, options) {
        state.login.username = options.user
        state.login.password = options.pwd
        state.login.nickname = options.nickname
        state.login.token = options.token
        state.login.isLogin = true
        // console.log(options)
        // console.log(state.login)
        // state.login.user = options.user;
    },
    presenceArrPush(state, message) {
        state.aPresence = message
        state.presenceArr.push(message);
        console.log('订阅数据获取成功', state.presenceArr)
    },
    friendLiPush(state, roster) {
        state.friendsArr = roster
        console.log('好友列表更新', state.friendsArr)
    },
    chatDataClick(state, item) {
        //将聊天对象信息存进vuex
        state.chatData = item;
        // console.log(state.chatData.name)
        // console.log(state.dialogueData[0])

        //判断点击好友是否存在好友聊天内容,是则 a = true,否则 a = false
        for (let i = 0; i < state.dialogueData.length; i++) {
            if (state.chatData.name !== state.dialogueData[i].id && i == state.dialogueData.length - 1) {
                // console.log(state.chatData.name)
                // console.log(state.dialogueData[i].id)
                // console.log( state.dialogueData)
                state.dialogueData.push({
                    id: state.chatData.name,
                    data: []
                })

            }
        }
        console.log(state.dialogueData)
    },
    setMineIndex(state, num) {
        state.mineIndex = num;
        // console.log(state.mineIndex)
    },
    dialogueDataPush(state, {
        id,
        data
    }) {
        console.log(state)
        console.log(id,data)

        for (let j = 0; j < state.dialogueData.length; j++) {
            console.log(id,data)
            console.log(state.dialogueData[j])
            if (id == state.dialogueData[j].id) {
                state.dialogueData[j].data.push(data)
                // console.log(state.dialogueData)
            }
        }
    },
    TextMessage(state, message) {
        // console.log(state.dialogueData) //state.dialogueData[i].id
        // console.log(message)//message.from
        console.log('检测是否有断点1')

        //判断点击好友是否存在好友聊天内容,是则 a = true,否则 a = false
        for (let i = 0; i < state.dialogueData.length; i++) {
            if (message.from !== state.dialogueData[i].id && i == state.dialogueData.length - 1) {
                // 根据id创建聊天内容存储
                state.dialogueData.push({
                    id: message.from,
                    data: []
                })
                console.log()

            }
        }
        console.log('检测是否有断点2')

        //根据id在内容存储中添加内容
        for (let j = 0; j < state.dialogueData.length; j++) {
            if (message.from == state.dialogueData[j].id) {
                console.log(message.data)
                console.log(state.dialogueData[j])
                state.dialogueData[j].data.push({
                    text: message.data,
                    isSelf: false
                })
                // console.log(state.dialogueData)
            }
        }
    }
}