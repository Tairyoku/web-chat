
<template>
    <div class="status-btn">

                    <!-- Розблокувати -->
<div class="status__btn" v-if="getBlackList">
      <el-button type="danger" @click="deleteFromBlackList" round>
        Розблокувати
      </el-button>
    </div>

              <!-- Прийняти/Відхилити запит  -->
<div class="status__btn" v-else-if="getInvitations">
      <el-button type="primary" @click="acceptInvite" round>Прийняти</el-button>
      <el-button type="warning" @click="refuseInvite" round>Відхилити</el-button>
    </div>

                    <!-- Відмінити запит -->
<div class="sent__invite status__btn" v-else-if="getSentInvites">
      <span style="margin-bottom: 8px;">Запрошення надіслано</span>
      <el-button type="primary" @click="cancelInvite" round>Відмінити</el-button>
    </div>
                    
                    <!-- Вислати запит -->
<div class="status__btn" v-else-if="!getStatusFriend">
      <el-button type="success" @click="addToFriends" round
        >Запросити до друзів</el-button
      >
    </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";

export default Vue.extend({
  props: {
    userId: Number,
  },
  computed: {
    ...mapGetters([
      "ID_LIST_OF_FRIEND_LIST",
      "ID_LIST_OF_BLACK_LIST",
      "ID_LIST_OF_SENT_INVITES_TO_FRIENDS",
      "ID_LIST_OF_FRIENDSHIP_REQUIRE",
      'USER_ID',
      'WEB_SOCKET'
    ]), 
       getStatusFriend(): boolean {
      return this.ID_LIST_OF_FRIEND_LIST.includes(this.userId);
    },
    getBlackList(): boolean {
      return this.ID_LIST_OF_BLACK_LIST.includes(this.userId);
    },
    getInvitations(): boolean {
      return this.ID_LIST_OF_FRIENDSHIP_REQUIRE.includes(this.userId);
    },
    getSentInvites(): boolean {
      return this.ID_LIST_OF_SENT_INVITES_TO_FRIENDS.includes(this.userId);
    },
  },
  methods: {
    cancelInvite() {
      this.$store.dispatch("cancelInvite", this.userId)
      .then(() => {
        this.$store.dispatch("usersList", this.USER_ID)
        this.WEB_SOCKET.send("cancel invite")
      });
    },
    addToFriends() {
      this.$store.dispatch("addToFriends", this.userId)
      .then(() => {
        this.$store.dispatch("usersList", this.USER_ID)
        this.WEB_SOCKET.send("add to friend")
      });    },
    deleteFromBlackList() {
      this.$store.dispatch("deleteFromBlackList", this.userId)
      .then(() => {
        this.$store.dispatch("usersList", this.USER_ID)
        this.WEB_SOCKET.send("delete from black list")
      });    },
    acceptInvite() {
      this.$store.dispatch("acceptInvite", this.userId)
      .then(() => {
        this.$store.dispatch("usersList", this.USER_ID)
        this.WEB_SOCKET.send("accept invite")
      });    },
    refuseInvite() {
      this.$store.dispatch("refuseInvite", this.userId)
      .then(() => {
        this.$store.dispatch("usersList", this.USER_ID)
        this.WEB_SOCKET.send("refuse invite")
      });    },
  },
});
</script>

<style scoped>
.status-btn {
 margin: auto 20px;
 display: flex;
    height: 100%;
    align-items: center;
}

:deep(.el-button ) {
    font-size: 14px;
    border-radius: 8px;
    padding: 8px;
}
:deep(.el-button.is-round) {
padding: 8px;
}
.sent__invite {
  display: flex;
  flex-direction: column;
}
</style>