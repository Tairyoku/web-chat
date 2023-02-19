<template>
  <div id="users-bar">
    <Search />
<div class="" @click="getChat(USER_ID)">
  <UserContainer :user="USER" />
</div>
    <el-tabs class="users__tabs" type="card">
      <el-tab-pane class="users__tabs" label="All">
        <ChatsList />
      </el-tab-pane>
      <el-tab-pane class="users__tabs" label="Friends">
        <UsersList :list="friends" />
      </el-tab-pane>
      <el-tab-pane label="Black List">
        <UsersList :list="blackList" />
      </el-tab-pane>
      <el-tab-pane label="Invites">
        <UsersList :list="FRIENDSHIP_REQUIRE" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import UsersList from "@/components/Users/UsersList.vue";
import ChatsList from "@/components/Users/ChatsList.vue";
import UserContainer from "@/components/Users/UserContainer.vue";
import { IUser } from "@/store/models";
import Vue from "vue";
import Search from "@/components/Users/Search.vue";
import { mapGetters } from "vuex";

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
        this.$router.push(`/chat/${res}`);
        // if (this.WEB_SOCKET.readyState != undefined) {
        //   this.$store.commit("closeSocket");
        // }
        // this.$store.dispatch("openWebsocket", res);
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
      "WEB_SOCKET",
      'USER_ID',
    ]),
    friends(): IUser[] {
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

<style>
.el-tabs--card>.el-tabs__header {
    border-bottom: 1px solid rgba(0,0,0,0.3);
    margin: 0;
}

#users-bar {
  width: inherit;
}
</style>