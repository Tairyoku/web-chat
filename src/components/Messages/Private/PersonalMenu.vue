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
    <el-dialog :visible.sync="moreInfoVisible">
      <PrivateInfo :data="user" />
    </el-dialog>

    <!-- Змінити ім'я -->
    <div class="" @click="changeUsernameVisible = true">
      <el-col :span="8">
        <el-card shadow="hover">
          Змінити ім'я
          <i class="el-icon-success"></i>
        </el-card>
      </el-col>
    </div>
    <el-dialog
      title="Змінити ім'я"
      :visible.sync="changeUsernameVisible"
      top="10vh"
      width="30%"
    >
    <el-form v-if="changeUsernameVisible" :model="newUsername" status-icon class="demo-ruleForm">
  <span>Нове ім'я</span>
    <el-form-item>
    <el-input type="text" size="small" v-model="newUsername" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" show-password @click="changeUsernameHandler">Змінити</el-button>
    <el-button @click="changeUsernameVisible=false">Назад</el-button>
  </el-form-item>
</el-form>
    </el-dialog>

    <!-- Змінити зображення -->
    <div class="" @click="changeIconVisible = true">
      <el-col :span="8" @click="">
        <el-card shadow="hover">
          Змінити зображення
          <i class="el-icon-warning"></i>
        </el-card>
      </el-col>
    </div>
    <el-dialog
      title="Змінити зображення"
      :visible.sync="changeIconVisible"
      width="40%"
    >
    <UploadImage :chatId="0" @cancel="changeIconVisible=false" />
    </el-dialog>

    <!-- Змінити пароль -->
    <div class="" @click="changePasswordVisible = true">
      <el-col :span="8" @click="">
        <el-card shadow="hover">
          Змінити пароль
          <i class="el-icon-warning"></i>
        </el-card>
      </el-col>
    </div>
    <el-dialog
      title="Змінити пароль"
      :visible.sync="changePasswordVisible"
      width="40%"
    >
    <el-form v-if="changePasswordVisible" :model="passwordForm" status-icon class="demo-ruleForm">
  <span>Старий пароль</span>
    <el-form-item>
    <el-input type="password" show-password v-model="passwordForm.oldPass" autocomplete="off"></el-input>
  </el-form-item>
  <span>Новий пароль</span>
  <el-form-item>
    <el-input type="password" show-password size="small" v-model="passwordForm.newPass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" show-password @click="changePasswordHandler">Змінити</el-button>
    <el-button @click="changePasswordVisible=false">Назад</el-button>
  </el-form-item>
</el-form>
    </el-dialog>

    <!-- Вийти -->
    <div class="" @click="logoutVisible = true">
      <el-col :span="8">
        <el-card shadow="hover">
          Вийти
          <i class="el-icon-remove"></i>
        </el-card>
      </el-col>
    </div>
    <el-dialog
      title="Ви дійсно бажаєте вийти?"
      :visible.sync="logoutVisible"
      width="40%"
    >
      <span
        slot="footer"
        class="dialog-footer"
        style="justify-content: space-around; display: flex"
      >
      <el-button @click="logoutVisible = false">Назад</el-button>
      <el-button type="primary" @click="logoutHandler">Вийти</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import PrivateInfo from "@/components/Messages/Private/PrivateInfo.vue";
import Notifications from "vue-notification";
import { IUser } from "@/store/models";
import UploadImage from "@/components/Messages/UploadImage.vue";

export default Vue.extend({
  props: {},
  data() {
    return {
      user: {} as IUser,
      moreInfoVisible: false,
      changeUsernameVisible: false,
      changeIconVisible: false,
      changePasswordVisible: false,
      logoutVisible: false,
      passwordForm: {
          oldPass: '',
          newPass: "",
        },
        newUsername: "",
    };
  },
  components: {
    PrivateInfo,
    UploadImage
  },
  computed: {
    ...mapGetters([
      "CHAT_ID",
      "USER_ID",
      "ID_LIST_OF_FRIEND_LIST",
      "ID_LIST_OF_BLACK_LIST",
      "PUBLIC_CHAT_LIST",
      'WEB_SOCKET'
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
    changeUsernameHandler() {
      this.$store.dispatch('changeUsername', {
        username: this.newUsername,
      })
      .then(() => {
        this.$notify({
          title: "Ім'я успішно змінено",
          text: "Ім'я змінено",
          type: "success",
        });     
    this.WEB_SOCKET.send("change username")
       })
    },
    changePasswordHandler() {
      this.$store.dispatch('changePassword', {
        oldPassword: this.passwordForm.oldPass,
        newPassword: this.passwordForm.newPass
      })
      .then(() => {
        this.$notify({
          title: "Пароль успішно змінено",
          text: "Пароль змінено",
          type: "success",
        }); 
    this.WEB_SOCKET.send("change password")
           })
    },
    logoutHandler() {
      this.$store.dispatch('logout')
      .then(() => {
this.$router.push({name: "sign-up"})
      })
    },
    blockUser() {
      this.$store.dispatch("addToBlackList", this.user.id).then(() => {
        this.$store.dispatch("usersList", this.USER_ID);
        this.$notify({
          title: "Заблоковано",
          text: "Користувач заблокован",
          type: "success",
        });
        this.changeIconVisible = false;
      });
    },
    addUserToChat() {
      this.$store
        .dispatch("addUserToChat", {
          userId: this.user.id,
          chatId: this.CHAT_ID,
        })
        .then(() => {
          this.$notify({
            title: "Додано",
            text: "Користувач додан до чату",
            type: "success",
          });
          this.changeUsernameVisible = false;
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
        this.logoutVisible = false;
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
        this.changePasswordVisible = false;
      });
    },
  },
  mounted() {
    this.$store.dispatch("getById", this.CHAT_ID).then((res) => {
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
