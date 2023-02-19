<template>
  <div id="public-menu">
    <!-- інформація -->
    <div class="" @click="moreInfoVisible = true">
      <el-col :span="8">
        <el-card shadow="hover">
          Інформація
          <i class="el-icon-info"></i>
        </el-card>
      </el-col>
    </div>
    <el-dialog :visible.sync="moreInfoVisible" width="400px">
      <PrivateInfo :data="user" />
    </el-dialog>

    <!-- Додати до чату -->
    <div class="" @click="addToChatVisible = true">
      <el-col :span="8">
        <el-card shadow="hover">
          Додати до чату
          <i class="el-icon-success"></i>
        </el-card>
      </el-col>
    </div>
    <el-dialog
      title="Додати до чату:"
      :visible.sync="addToChatVisible"
      top="20px"
      width="400px"
    >
      <ul class="chatlist">
        <li
          style="list-style-type: none"
          v-for="item in PUBLIC_CHAT_LIST"
          :key="item.id"
        >
          <div class="" @click="addUserToChat(item.id)">
            <ChatContainer :chat="item" />
          </div>
        </li>
      </ul>
    </el-dialog>

    <!-- Заблокувати -->
    <div v-if="notBlocked" class="" @click="blockedVisible = true">
      <el-col :span="8">
        <el-card shadow="hover">
          Заблокувати
          <i class="el-icon-warning"></i>
        </el-card>
      </el-col>
    </div>
    <el-dialog
      title="Ви дійсно бажаєте заблокувати користувача?"
      :visible.sync="blockedVisible"
      width="400px"
    >
      <span>Він не зможе надсилати вам повідомлення</span>
      <span
        slot="footer"
        class="dialog-footer"
        style="justify-content: space-around; display: flex"
      >
        <el-button @click="blockedVisible = false">Відмінити</el-button>
        <el-button type="primary" @click="blockUser()">Заблокувати</el-button>
      </span>
    </el-dialog>

    <!-- Видалити з друзів (якщо друг) -->
    <div v-if="isFriend" class="" @click="deleteFriendVisible = true">
      <el-col :span="8" @click="">
        <el-card shadow="hover">
          Видалити з друзів
          <i class="el-icon-warning"></i>
        </el-card>
      </el-col>
    </div>
    <el-dialog
      title="Ви дійсно бажаєте покинути чат?"
      :visible.sync="deleteFriendVisible"
      width="400px"
    >
      <span
        slot="footer"
        class="dialog-footer"
        style="justify-content: space-around; display: flex"
      >
        <el-button @click="deleteFriendVisible = false">Відмінити</el-button>
        <el-button type="primary" @click="deleteFriend()">Покинути</el-button>
      </span>
    </el-dialog>

    <!-- видалити чат -->
    <div class="" @click="deleteChatVisible = true">
      <el-col :span="8">
        <el-card shadow="hover">
          Видалити чат
          <i class="el-icon-remove"></i>
        </el-card>
      </el-col>
    </div>
    <el-dialog
      title="Ви дійсно бажаєте видалити чат?"
      :visible.sync="deleteChatVisible"
      width="400px"
    >
      <span
        slot="footer"
        class="dialog-footer"
        style="justify-content: space-around; display: flex"
      >
        <el-button @click="deleteChatVisible = false">Відмінити</el-button>
        <el-button type="primary" @click="deleteChat()">Видалити</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import ChatContainer from "@/components/Chats/ChatContainer.vue";
import PrivateInfo from "@/components/Messages/Private/PrivateInfo.vue";
import { IUser } from "@/store/models";

export default Vue.extend({
  data() {
    return {
      user: {} as IUser,
      moreInfoVisible: false,
      addToChatVisible: false,
      blockedVisible: false,
      deleteFriendVisible: false,
      deleteChatVisible: false,
    };
  },
  components: {
    PrivateInfo,
    ChatContainer,
  },
  computed: {
    ...mapGetters([
      "CHAT_ID",
      "USER_ID",
      "ID_LIST_OF_FRIEND_LIST",
      "ID_LIST_OF_BLACK_LIST",
      "PUBLIC_CHAT_LIST",
      "WEB_SOCKET",
    ]),
    isFriend(): boolean {
      return this.ID_LIST_OF_FRIEND_LIST.includes(this.user.id);
    },
    notBlocked(): boolean {
      return !this.ID_LIST_OF_BLACK_LIST.includes(this.user.id);
    },
  },
  watch: {
    CHAT_ID() {
      this.$store.dispatch("getById", this.CHAT_ID).then((res) => {
        this.user = res.user;
      });
    },
  },
  methods: {
    blockUser() {
      this.$store.dispatch("addToBlackList", this.user.id).then(() => {
        this.$store.dispatch("usersList", this.USER_ID);
        this.$notify({
          title: "Заблоковано",
          text: "Користувач заблокован",
          type: "success",
        });
        this.WEB_SOCKET.send("block");
        this.blockedVisible = false;
      });
    },
    addUserToChat(id: number) {
      this.$store
        .dispatch("addUserToChat", {
          userId: this.user.id,
          chatId: id,
        })
        .then(() => {
          this.$notify({
            title: "Додано",
            text: "Користувач додан до чату",
            type: "success",
          });
          this.WEB_SOCKET.send("add to chat");
          this.addToChatVisible = false;
        });
    },
    deleteChat() {
      this.$store.dispatch("deleteСhat", this.CHAT_ID).then(() => {
        this.$notify({
          title: "Видалено",
          text: "Чат видалено",
          type: "success",
        });
        this.$router.push("/chat/");
        this.WEB_SOCKET.send("delete chat");
        this.deleteChatVisible = false;
      });
    },
    deleteFriend() {
      this.$store.dispatch("deleteFriend", this.user.id).then(() => {
        this.$store.dispatch("usersList", this.USER_ID);
        this.$notify({
          title: "Ви позбулися друга",
          text: "Користувач вам більше не друг",
          type: "success",
        });
        this.WEB_SOCKET.send("delete friend");
        this.deleteFriendVisible = false;
      });
    },
  },
  mounted() {
    this.$store.dispatch("getById", this.CHAT_ID)
    .then((res) => {
      this.user = res.user;
    });
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

.addToChat {
  border-color: aquamarine;
}

.el-col-8 {
  width: 20vw;
  min-width: 240px;
}
:deep(.el-button) {
  font-size: 24px;
}

.chatlist {
  overflow-x: hidden;
  overflow-y: auto;
  height: 75vh;
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
#public-menu {
  position: absolute;
  right: 0;
  top: 60px;
  display: flex;
  flex-direction: column;
}
:deep(.el-card__body) {
  padding: 12px 12px;
  margin: 0 20px;
  display: flex;
  justify-content: space-between;
}
</style>
