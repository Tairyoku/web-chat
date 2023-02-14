<template>
  <div class="search">
    <div class="search__search-line" >
      <el-input
        class="search__input"
        v-on:input="searchHandler"
        v-model="searchName"
        placeholder="search..."
        @focus="setSearch(true)"
      >
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
        <i
          slot="suffix"
          class="el-input__icon el-icon-circle-close"
          @click="clearSearch"
        ></i>
      </el-input>
    </div>
    <div v-if="search" @mouseleave="setSearch(false)" class="search__found">
      <div v-if="searchName?.length == 0"></div>
      <div v-else-if="USERS_SEARCH_RESULT?.length == 0">not found</div>
      <div v-else>
        <ul class="" style="margin-left: 0; padding-left: 0">
          <li
            style="list-style-type: none"
            :key="item.id"
            v-for="item in USERS_SEARCH_RESULT"
          >
          <div class="" >
            <UserContainer @click="getChat(item.id)" :user="item" />
          </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<!-- При фокусі пошукової строки, відчиняється вікно пошуку
При введені значення у строку, виконується action: searchUsers,
з введеними туди даними. Він змінює значення  -->

<script lang="ts">
import Vue from "vue";
import UserContainer from "@/components/Users/UserContainer.vue";
import { mapGetters } from "vuex";
export default Vue.extend({
  data() {
    return {
      search: false,
      searchName: "",
    };
  },
  components: {
    UserContainer,
  },
  computed: {
    ...mapGetters([
      'USERS_SEARCH_RESULT',
      "WEB_SOCKET",
      'USER_ID',
    ]),
  },
  methods: {
    click() {
      console.log("click")
    },
    setSearch(res: boolean) {
      this.search = res;
    },
    clearSearch() {
      this.searchName = "";
    },
    searchHandler() {
      if (this.searchName != "") {
        this.$store.dispatch("searchUsers", this.searchName);
      }
    },
      getChat(id: number) {
        console.log("working")
      this.$store.dispatch("createPrivateChat", id).
      then((res) => {
          this.$router.push(`/chat/${res}`);
        if (this.WEB_SOCKET.readyState != undefined) {
          this.$store.commit("closeSocket");
        }
        this.$store.dispatch("openWebsocket", res);
        this.$store.dispatch("getUserPrivateChats", this.USER_ID);

      });
    },
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
}
</style>
