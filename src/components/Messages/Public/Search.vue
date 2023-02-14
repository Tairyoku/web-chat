<template>
  <div class="search">
    <!-- <div class="search__search-line">
      <el-input
        class="search__input"
        @input="searchHandler"
        v-model="searchName"
        placeholder="Шукаємо..."
      >
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
        <i
          slot="suffix"
          class="el-input__icon el-icon-circle-close"
          @click="clearSearch"
        ></i>
      </el-input>
    </div>
    <div v-if="searchName.length == 0">
      <ul class="" style="margin-left: 0; padding-left: 0">
        <li
          style="list-style-type: none"
          v-for="item in friendsToChat"
          :key="item.id"
        >
          <div class="" @click="addUserToChat(item.id)">
            <UserContainer :user="item" />
          </div>
        </li>
      </ul>
    </div>
    <div v-else-if="searchUsersToChat?.length == 0">Not found</div>
    <div v-else> -->
      <ul class="" style="margin-left: 0; padding-left: 0">
        <li
          style="list-style-type: none"
          :key="item.id"
          v-for="item in friendsToChat"
        >
          <div 
          class="" 
          @click="addUserToChat(item.id)"
          >
          <!-- @click="addUserToChat(item.id)" -->
            <UserContainer :user="item" />
          </div>
        </li>
      </ul>
    <!-- </div> -->

    <!-- <el-dialog
  :visible.sync="confirmVisible"
  width="30%"
 >
  <span>Додати користувача до чату?</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="confirmVisible = false">Назад</el-button>
    <el-button type="primary" @click="addUserToChat">Додати</el-button>
  </span>
</el-dialog> -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import UserContainer from "@/components/Users/UserContainer.vue";
import { mapGetters } from "vuex";
import { IUser } from "@/store/models";
import Notifications from "vue-notification";

export default Vue.extend({
  data() {
    return {

      search: false,
      searchName: "",
      users: [] as IUser[],
      list: [] as IUser[],
      confirmVisible: false,
    };
  },
  components: {
    UserContainer,
  },
  computed: {
    ...mapGetters([
      "USERS_SEARCH_RESULT",
      "FRIEND_LIST",
      "CHAT_ID",
      "WEB_SOCKET",
      "USER_ID",
    ]),
    friendsToChat():IUser[] {
      let result = [] as IUser[]
      this.FRIEND_LIST.forEach((friend: IUser) => {
        let check = 0
        this.users.forEach((user:IUser) => {
        // Якщо користувачі співпадають, то збільшуємо check на 1
          if (friend.id == user.id) {
            check++
          }
        })
        // check = 0 означає, що збігів не було
        if (check == 0) {
          result.push(friend)
        }
      })
        return result;
    },
    searchUsersToChat() {
      let result = [] as IUser[];
      this.USERS_SEARCH_RESULT.forEach((user: IUser) => {
        () => {
          this.users.forEach((check) => {
            if (check.id == user.id) {
              return;
            }
          });
          result.push(user);
        };
      });
      console.log(result)
      return result;
    },
  
  },
  watch: {
    CHAT_ID() {
      this.$store.dispatch("getChatUsers", this.CHAT_ID)
      .then((res) => {
        this.users = res.list;
      });
    },
  },
  methods: {
    //   friendsToChat():IUser[] {
    //   let result = [] as IUser[]
    //   this.FRIEND_LIST.forEach((friend: IUser) => {
    //     let check = 0
    //     this.users.forEach((user:IUser) => {
    //     // Якщо користувачі співпадають, то збільшуємо check на 1
    //       if (friend.id == user.id) {
    //         check++
    //       }
    //     })
    //     // check = 0 означає, що збігів не було
    //     if (check == 0) {
    //       result.push(friend)
    //     }
    //   })
    //     return result;
    // },
    clearSearch() {
      this.searchName = "";
    },
    searchHandler() {
      if (this.searchName != "") {
        this.$store.dispatch("searchUsers", this.searchName);
      }
    },
    addUserToChat(id: number) {
      this.confirmVisible = false;
      this.$store
        .dispatch("addUserToChat", { userId: id, chatId: this.CHAT_ID })
        .then(() => {
          this.$notify({
            title: "Успіх",
            text: "Ви додали користувача до чату",
            type: "success",
          });
        });
    },
  },
  mounted() {
    this.$store.dispatch("getChatUsers", this.CHAT_ID)
    .then((res) => {
      this.users = res.list;
    });
  },
});
</script>

<style scoped>
.search__found {
  background-color: aqua;
  position: absolute;
  z-index: 3;
  width: inherit;
  height: -webkit-fill-available;
}
.search__search-line {
  display: flex;
  background-color: white;
}
.search {
  width: inherit;
  height: 60vh;
}
</style>
