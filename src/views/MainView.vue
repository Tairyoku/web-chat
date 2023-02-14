<template>
  <div class="main">
 <div class="main__users">
      <Users />
    </div> 
    
    <div class="main__chats">
      <Chats />
    </div>
    
<div class="main__messages">
  <keep-alive>
    <router-view></router-view>
  </keep-alive> 
</div>   
</div>
</template>

<script lang="ts">
import Vue from "vue";
import Users from '@/components/Users/UsersView.vue'
import Chats from '@/components/Chats/ChatView.vue'


export default Vue.extend({
  components: {
Users,
Chats,
  },
  updated() {
  this.$store.dispatch('getStarted')
},
});
</script>
<style scoped>
.main {
display: flex;
width: 100%;
}
.main__users {
  background: rgb(247, 234, 234);
  width: 25vw;
  height: 100%;
  border: 1px solid gray;
}
.main__chats {
  height: 100%;
  width: 25vw;
  border: 1px solid gray;
  border-left: none;
  background: rgba(130, 249, 229, 0.345);
}
.main__messages {
  height: 100%;
  background: rgba(0, 255, 8, 0.127);
  width: -webkit-fill-available;
}
:deep(.el-input__inner) {
  height: 32px;
}
:deep(.el-input__icon) {
  line-height: 32px;
}
:deep(.el-button) {
  padding: 8px 20px;
}

</style>