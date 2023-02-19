<template>
  <div id="chat-container">
    <div class="container__icon">
      <div v-if="chat.icon == ''">
        {{ getNameForIcon(chat?.name) }}
      </div>
      <div v-else>
        <el-image class="container__image" :src="getImageUrl" :fit="fit" />
      </div>
    </div>

    <div class="container__info">
      <div style="margin-left: 8px">
        {{ chat.name }}
      </div>
      <div v-if="chat.types != 'private'">
        {{ numberOfUsersOnChat }} {{ getTypeByNumOfUsersInChat }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import { IMAGE_SMALL } from "@/api/routes";

export default Vue.extend({
  data() {
    return {
      numberOfUsersOnChat: 0,
      fit: "cover",
    };
  },
  props: {
    chat: Object,
  },
  methods: {
    getNameForIcon(name: string): string {
      return name.length < 4 ? name : name.split("").slice(0, 3).join("");
    },
  },
  computed: {
    ...mapGetters(["USER_ID"]),
    getImageUrl(): string {
      return IMAGE_SMALL(this.chat.icon);
    },
    getTypeByNumOfUsersInChat() {
      switch (this.numberOfUsersOnChat) {
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
      this.numberOfUsersOnChat = res.size;
    });
  },
});
</script>

<style scoped>
#chat-container {
  color: black;
    height: 52px;
    border-radius: 12px;
    padding: 12px;
    margin: 8px;
  background-color: rgba(207, 49, 186, 0);
    justify-content: space-evenly;
    display: flex;
    border: 2px solid #c1ab18;
    box-shadow: 2px -2px 4px 4px #c1ab1882;
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
