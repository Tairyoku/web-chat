<template>
  <div id="header">
    <div v-if="getStatusBtn"></div>
    <div style="display: flex; align-items: center">
      <UserInfo :item="user" />
    </div>
    <div class="header__status">
      <div v-if="getStatusBtn">
        <StatusButton :userId="user.id" />
      </div>
      <el-button
        slot="reference"
        @click="setIsMenuVisible"
        icon="el-icon-more-outline"
      >
      </el-button>
      <div v-if="isMenu" @mouseleave="setIsMenuVisible">
        <PrivateMenu v-if="user.id != USER_ID" />
        <PersonalMenu v-else />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import PrivateMenu from "@/components/Messages/Private/Menu.vue";
import PersonalMenu from "@/components/Messages/Private/PersonalMenu.vue";
import { mapGetters } from "vuex";
import { IChat, IUser } from "@/store/models";
import UserInfo from "@/components/Messages/Private/PrivateContainer.vue";
import StatusButton from "@/components/Messages/Private/StatusButton.vue";

export default Vue.extend({
  data() {
    return {
      isMenu: false,
      chat: {} as IChat,
      user: {} as IUser,
    };
  },
  components: {
    StatusButton,
    UserInfo,
    PersonalMenu,
    PrivateMenu,
  },
  computed: {
    ...mapGetters(["USER_ID", "CHAT_ID", "USER"]),
    getUserAndChatData() {
      if (this.USER_ID != 0 && this.CHAT_ID != 0) {
        this.$store.dispatch("getById", this.CHAT_ID)
        .then((res) => {
          this.user = res.user
          this.chat = res.chat
        });
      }
    },
    getStatusBtn(): boolean {
      return (this.user.id == this.USER_ID) ? false : true;
    },
  },
  watch: {
    CHAT_ID() {
      this.getUserAndChatData;
    },
  },
  methods: {
    setIsMenuVisible() {
      this.isMenu = !this.isMenu;
    },
  },
  mounted() {
    this.getUserAndChatData;
  },
});
</script>

<style scoped>
#header {
  display: flex;
  height: 80px;
  justify-content: space-between;
  background-color: #d5d540;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
}

.header__status {
  display: flex;
  align-items: stretch;
}
.el-button {
  font-size: 32px;
  border-radius: 12px;
  background-color: rgba(66, 168, 241, 0.086);
}

.el-icon-more-outline {
  font-size: 24px;
}

.header__btn {
  height: 100%;
  font-size: 32px;
  background-color: rgba(66, 168, 241, 0.086);
  border-radius: 12px;
}
</style>
