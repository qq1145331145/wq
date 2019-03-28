<!--  -->
<template>
  <div class="AddressBox">
    <div class="AddressLi" v-for="(item,index) in friendsArr" :key="'add'+index" @click="chatData(item)">
      <div class="headPc">头像</div>
      <div class="contents">
        <span>{{item.name}}</span>
        <span></span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      friendsArr: "friendsArr",
      dialogueData:"dialogueData"
    })
  },
  methods: {
    chatData(item){
      this.$store.commit('chatDataClick',item)
      this.$store.commit('setMineIndex',1)
    }
  }
};
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
.AddressBox {
  width: 240px;
  overflow: hidden;
}

.AddressLi {
  display: flex;
  width: 230px;
  height: 50px;
  padding: 5px;
  background-color: #eeeeee;

  .headPc{
    margin:5px;
    height: 40px;
    width: 40px;
    background: white;
  }

  .contents{
    height: 50px;
    width: 180px;

    span{
      display: block;
      height: 25px;
      width: 180px;
    }
  }
}

.AddressLi:hover {
  background-color: #cccccc;
}
</style>