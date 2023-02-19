<template>
  <div class="messages">
    <div class="" v-if="typeOfChat == `private`">
      <PrivateHeader />
    </div>
    <div class="" v-else-if="typeOfChat == `public`">
      <PublicHeader />
    </div>
    <!-- <MessageList :chat="chat" /> -->
    <!-- <MessageCreate /> -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import PrivateHeader from "@/components/Messages/Private/Header.vue";
import PublicHeader from "@/components/Messages/Public/Header.vue";
import MessageList from "@/components/Messages/MessageList.vue";
import MessageCreate from "@/components/Messages/CreateMessage.vue";
import { mapGetters } from "vuex";
import { IChat, IUser } from "@/store/models";
const minLimit = 8;
export default Vue.extend({
  data() {
    return {
      limit: minLimit,
      chat: {} as IChat,
    };
  },
  components: {
    PrivateHeader,
    PublicHeader,
    MessageList,
    MessageCreate,
  },
  methods: {
    getChatMessages(id: number) {
      this.$store.dispatch("getChat", id)
      .then((res) => {
        this.chat = res
      });
    },
    openWebsocket(chatId:number) {
      console.log("socket")
if (this.WEB_SOCKET.readyState != undefined) {
  this.$store.commit("closeSocket");
}
this.$store.dispatch("openWebsocket", chatId);
    }
  },
  watch: {
    CHAT_ID() {
      this.limit = minLimit;
      this.getChatMessages(this.CHAT_ID);
      console.log("watch")
      this.openWebsocket(this.CHAT_ID)
      if (this.chat.id != this.CHAT_ID) {
        this.$store.dispatch("getLimitChatMessages", {
          chatId: this.CHAT_ID,
          limit: this.limit,
        });
        setTimeout(
          () => document.getElementById("arrowTop")?.scrollIntoView(),
          100
        );
      }
    },
  },
  computed: {
    ...mapGetters([
      "USER_ID", 
      "USER", 
      "CHAT_ID", 
      "WEB_SOCKET"
    ]),
    typeOfChat(): string {
      return this.chat.types;
    },
  },
  created() {
    this.$store.commit('setChatId', Number(this.$route.params.id))
    // console.log(this.$route.params.id, "mounted")
    //   this.getChatMessages(Number(this.$route.params.id));
    //   console.log("mounted")
    //   this.openWebsocket(Number(this.$route.params.id))
    // this.$store.dispatch("getLimitChatMessages", {
    //       chatId: this.CHAT_ID,
    //       limit: this.limit,
    //     });
    //     setTimeout(
    //       () => document.getElementById("arrowTop")?.scrollIntoView(),
    //       100
    //     );
  },
});
</script>
