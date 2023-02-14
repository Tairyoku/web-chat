<template>
  <div id="chat-container">
    <div class="container__icon">
      <div v-if="chat.icon == ''">
        {{ getChatIcon(chat?.name) }}
      </div>
      <div v-else>
        <el-image class="container__image" :src="imgUrl" :fit="fit" />
      </div>
    </div>

    <div class="container__info">
      <div style="margin-left: 8px">
        {{ chat.name }}
      </div>
      <div v-if="chat.types != 'private'">{{ numberOfUsers }} {{ users }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import { IMAGE_SMALL } from "@/api/routes";
export default Vue.extend({
  name: "user-container",
  data() {
    return {
      chatId: 0,
      numberOfUsers: 0,
      img: "",
      fit: "cover",
    };
  },
  props: {
    chat: Object,
  },
  methods: {
    getChatIcon(name: string): string {
      return name.length < 4 ? name : name.split("").slice(0, 3).join("");
    },
    click() {
      this.$router.push(`/chat/${this.chat.id}`);
      this.$store.commit("setChatId", this.chat.id);
      if (this.WEB_SOCKET.readyState != undefined) {
        this.$store.commit("closeSocket");
      }
      this.$store.dispatch("openWebsocket", this.chat.id);
    },
  },
  components: {},
  computed: {
    ...mapGetters(["WEB_SOCKET", "USER_ID"]),
    imgUrl(): string {
      return IMAGE_SMALL(this.chat.icon);
    },
    users() {
      switch (this.numberOfUsers) {
        case 1:
          return "користувач";

        case 2:
        case 3:
        case 4:
          return "користувачі";

        default:
          return "користувачів";
      }
    },
  },
  mounted() {
    this.$store.dispatch("getChatUsers", this.chat.id).then((res) => {
      this.numberOfUsers = res.size;
    });
  },
});
</script>

<style scoped>
#chat-container {
  color: black;
  height: 52px;
  padding: 12px;
  justify-content: space-evenly;
  display: flex;
  border-bottom: 1px solid #6e6e6e;
}
.container__icon {
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  font-size: 24px;
  height: 52px;
  width: 52px;
  border-radius: 26px;
  color: white;
  background-color: rgb(207, 49, 186);
}
.container__image {
  width: 52px;
  height: 52px;
  border-radius: 26px;
  display: flex;
}
.container__info {
  color: black;
  width: 70%;
  flex-wrap: wrap;
  display: flex;
  align-content: flex-start;
  justify-content: space-around;
  font-size: 16px;
  text-align: start;
  padding-left: 4px;
  overflow: hidden;
  flex-direction: column;
  align-items: flex-start;
}
</style>
