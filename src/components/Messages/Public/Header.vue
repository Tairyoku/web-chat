<template>
  <div id="header">
    <div class="for-justify"></div>
    
<ChatInfo :item="chat" />
<div class="">

</div>
<div class="">
  <el-button
  class="header__btn"
      slot="reference"
      @click="setIsMenu"
      icon="el-icon-more-outline"
    >
  </el-button>
    <div 
    class=""  
    v-if="isMenu" 
    @mouseleave="setIsMenu"
    >
      <ChatMenu :chatId="chatId" />
    </div>
</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ChatMenu from "@/components/Messages/Public/Menu.vue";
import { mapGetters } from "vuex";
import { IChat, IUser } from "@/store/models";
import ChatInfo from "@/components/Messages/Public/PublicContainer.vue"

export default Vue.extend({
  props: {
  },
  data() {
    return {
      chatId: 0,
      chat: {} as IChat,
      isMenu: false,
      user: {} as IUser,
    };
  },
  components: {
    ChatInfo,
    ChatMenu
  },
  computed: {
    ...mapGetters([
      'USER_ID',
      'CHAT_ID',
    ]),   
       getChat() {
      if (this.CHAT_ID != 0) {
        this.$store.dispatch("getChat", this.CHAT_ID).
        then((res) => {
          this.chat = res
        });
      }
    },
  },
  watch: {
    CHAT_ID() {
      this.chatId = this.CHAT_ID
      this.getChat
    }
  },
  methods: {
    setIsMenu() {
      this.isMenu = !this.isMenu;
    },
  },
  mounted() {
    this.getChat
  }
});
</script>

<style scoped>
#header {
  display: flex;
  height: 80px;    
  justify-content: space-between;
  background: linear-gradient(217deg, #aeeb4dcc, rgb(213 213 64));
 border-bottom-left-radius: 12px;
 border-bottom-right-radius: 12px;
}

.el-icon-more-outline {
  font-size: 24px;
}

.header__btn {
  height: 100%; 
  font-size: 32px; 
  background-color: 
  rgba(66, 168, 241, 0.086); 
  border-radius: 12px;
}
/* :deep(.el-button) {
    font-size: 32px;
    border-radius: 12px;
    background-color: rgba(66, 168, 241, 0.086);
} */
</style>