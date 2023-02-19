<template>
  <div class="chatlist">
    <ul>
      <li
        style="list-style-type: none"
        v-for="item in PRIVATE_CHAT_LIST"
        :key="item.id"
      >
        <div class="" @click="click(item.id)">
          <ChatContainer :chat="item" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ChatContainer from "@/components/Chats/ChatContainer.vue";
import { mapGetters } from "vuex";
import { IChat } from "@/store/models";

export default Vue.extend({
  data() {
    return {
      privateChats: [] as IChat[],
    };
  },
  components: {
    ChatContainer,
  },
  methods: {
    click(chatId: number) {
      this.$router.push(`/chat/${chatId}`);
    },
  },
  computed: {
    ...mapGetters(["WEB_SOCKET", "PRIVATE_CHAT_LIST"]),
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

.chatlist {
  overflow-x: hidden;
  overflow-y: auto;
  height: calc(100vh - 2px - 40px - 64.8px - 44px);
}

.chatlist::-webkit-scrollbar {
  width: 1em;
}
.chatlist::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
.chatlist::-webkit-scrollbar-thumb {
  background-color: #666;
  outline: 1px solid #eee;
  border-radius: 4px;
}
</style>
