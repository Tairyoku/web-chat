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
//   updated() {
//   this.$store.dispatch('getStarted')
// },
});
</script>
<style scoped>
.main {
display: flex;
width: 100%;
}
.main__users {
  background: linear-gradient(#aeeb4dcc, rgb(229 255 173));
  width: 25vw;
  height: 100%;
  border: 1px solid gray;
}
.main__chats {
  height: 100%;
  width: 25vw;
  border: 1px solid gray;
  border-left: none;
  background: linear-gradient(#fffbef, rgb(213 213 64));
}
.main__messages {
  height: 100%;
  background: linear-gradient(130deg, #ddff8f, #ffc0cb82);
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