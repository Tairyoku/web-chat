<template>
  <div class="users-bar">
    <Search @getChat="getChat" />
  <UserContainer :user="USER" @click="getChat(USER_ID)" />
    <el-tabs type="card">
      <el-tab-pane label="Усі">
        <ChatsList />
      </el-tab-pane>
      <el-tab-pane label="Друзі">
        <UsersList @getChat="getChat" :list="friends" />
      </el-tab-pane>
      <el-tab-pane label="Заблоковані">
        <UsersList @getChat="getChat" :list="blackList" />
      </el-tab-pane>
      <el-tab-pane label="Запити">
        <UsersList @getChat="getChat" :list="FRIENDSHIP_REQUIRE" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import { IUser } from "@/store/models";
import Search from "@/components/Users/Search.vue";
import UsersList from "@/components/Users/UsersList.vue";
import ChatsList from "@/components/Users/ChatsList.vue";
import UserContainer from "@/components/Users/UserContainer.vue";

export default Vue.extend({
  data(): {
    tabPosition: string;
  } {
    return {
      tabPosition: "top",
    };
  },
  methods: {
    getChat(id: number) {
      this.$store.dispatch("createPrivateChat", id).
      then((res) => {
        if (this.CHAT_ID != res) {
        this.$router.push(`/chat/${res}`)
        .then(() => this.$store.commit("setChatId", res));
      }
      this.$store.dispatch("getUserPrivateChats", this.USER_ID);
      });
    },
  },
  computed: {
    ...mapGetters([
      "FRIEND_LIST",
      "BLACK_LIST",
      "ON_BLACK_LISTS",
      "SENT_INVITES_TO_FRIENDS",
      "FRIENDSHIP_REQUIRE",
      "USER",
      'USER_ID',
      'CHAT_ID'
    ]),
    friends(): IUser[] {
      // return [
      //   {
      //     id: 1,
      //     username: "first",
      //     },
      //   {
      //     id: 2,
      //     username: "firstfirstfirstfirstfirstfirst",
      //     },
      //   {
      //     id: 3,
      //     username: "firstfirstfirstfirstfirstfirstfirstfirstfirstfirst",
      //     },
      //   {
      //     id: 4,
      //     username: "last",
      //     },
      // ] as IUser[]
      return this.FRIEND_LIST.concat(this.SENT_INVITES_TO_FRIENDS);
    },
    blackList() {
      return this.BLACK_LIST.concat(this.ON_BLACK_LISTS);
    },
  },
  components: {
    UsersList,
    Search,
    UserContainer,
    ChatsList,
  },
});
</script>

<style scoped>
:deep(.el-tabs__header) {
    margin: 0;
}
.users-bar {
  width: inherit;
}
:deep(.el-tabs__nav-scroll) {
    overflow: hidden;
    border: none;
}
:deep(.el-tabs--card>.el-tabs__header .el-tabs__nav) {
  border: 2px solid #245f1ab0;
  border-bottom: none;
  min-width: 100%;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
:deep(.el-tabs--card>.el-tabs__header .el-tabs__item) {
  border: none;
}
:deep(.el-tabs__nav-wrap) {
    border-bottom: 2px solid #245f1ab0;
}
:deep(.el-tabs__nav-prev) {
    color: #245f1a;
}
.el-tabs--card>.el-tabs__header {
border: none;
}
:deep(.el-tabs__item.is-active) {
  color: #929224;
  background-color: #fbff8580;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
:deep(.el-tabs__item) {
    color: #245f1a;
}
:deep(.el-tabs__item:focus),
:deep(.el-tabs__item:hover) {
    color: #929224;
}
</style>