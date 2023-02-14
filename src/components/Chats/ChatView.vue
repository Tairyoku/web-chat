<template>
  <div class="chat-view">
    <Search />
    <div class="chat__list">
      <ul>
        <li class="chat__create">
          <div
            v-if="!inputChatVisible"
            @click="setInputChatVisible"
            style="height: 40px"
            class="chat__create-button"
          >
            <span slot="label">
              <i class="el-icon-circle-plus-outline"></i>
              Create new Chat
            </span>
          </div>
          <div v-else>
            <el-input
              v-model="chatName"
              style="margin-bottom: 4px"
              placeholder="Введіть назву"
            />
            <div style="display: flex; justify-content: space-between">
              <el-button v-on:click="createChat"> Створити </el-button>
              <el-button v-on:click="cancelCreate"> Назад </el-button>
            </div>
          </div>
        </li>
        <li
          style="list-style-type: none"
          v-for="item in PUBLIC_CHAT_LIST"
          :key="item.id"
        >
          <div @click="createNewChat(item.id)">
            <ChatContainer :chat="item" />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import Search from "@/components/Chats/Search.vue";
import ChatContainer from "@/components/Chats/ChatContainer.vue";

export default Vue.extend({
  data(): {
    chatName: string;
    inputChatVisible: boolean;
  } {
    return {
      chatName: "",
      inputChatVisible: false,
    };
  },
  components: {
    ChatContainer,
    Search,
  },
  methods: {
    createNewChat(chatId: number) {
      this.$store.commit("setChatId", chatId);
      if (this.WEB_SOCKET.readyState != undefined) {
        this.$store.commit("closeSocket");
      }
      this.$router.push(`/chat/${chatId}`);
      this.$store.dispatch("openWebsocket", chatId);
    },
    setInputChatVisible() {
      this.inputChatVisible = !this.inputChatVisible;
    },
    createChat() {
      if (this.chatName?.length == 0) return;
      this.$store.dispatch("createPublicChat", this.chatName)
      .then(() => {
        this.$store.dispatch("getUserPublicChats", this.USER_ID);
      });
      this.cancelCreate();
    },
    cancelCreate() {
      this.chatName = "";
      this.setInputChatVisible();
    },
  },
  computed: {
    ...mapGetters([
      "PUBLIC_CHAT_LIST", 
      "WEB_SOCKET", 
      "USER_ID"
    ]),
  },
});
</script>

<style scoped>
li {
  list-style-type: none;
}
ul {
  padding-inline-start: 0px;
  margin-block-start: 0;
  margin-block-end: 0;
}
.chat-view {
  height: calc(100vh - 32px - 2px);
  width: inherit;
}
.chat__list {
  overflow-x: hidden;
  overflow-y: auto;
  height: -webkit-fill-available;
}
.chat__create {
  height: 60px;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #6e6e6e;
}
.chat__create-button {
  height: 40px;
  display: contents;
}
.chat-view__list::-webkit-scrollbar {
  width: 1em;
}
.chat-view__list::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
.chat-view__list::-webkit-scrollbar-thumb {
  background-color: #666;
  outline: 1px solid #eee;
  border-radius: 4px;
}
</style>
