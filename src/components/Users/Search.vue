<template>
  <div class="search">
    <div class="search__search-line"
    v-on:input="searchHandler"
     >
      <el-input
        class="search__input"
        v-model="searchName"
        placeholder="Знайти..."
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
    <div 
    v-if="search" 
    class="search__found"
    @mouseleave="setSearch(false)"
    >
      <div v-if="searchName?.length == 0"></div>
      <div 
      v-else-if="USERS_SEARCH_RESULT?.length == 0"
      class="search__not-found"
      >Нікого не знайдено</div>
      <div v-else>
        <ul class="" style="margin-left: 0; padding-left: 0; ">
          <li
            style="list-style-type: none; margin-bottom: 16px;"
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
        // if (this.WEB_SOCKET.readyState != undefined) {
        //   this.$store.commit("closeSocket");
        // }
        // this.$store.dispatch("openWebsocket", res);
        this.$store.dispatch("getUserPrivateChats", this.USER_ID);

      });
    },
  },
});
</script>

<style scoped>
.search__found {
  background: linear-gradient(#fffbef, rgb(213 213 64));
  position: absolute;
  z-index: 3;
  width: inherit;
  height: -webkit-fill-available;
}
.search__search-line {
  display: flex;
  color: black;
  background-color: #fff0;
}
.search {
  width: inherit;
}
:deep(.el-input__inner) {
    background-color: #fff0;
    border: 2px solid #245f1aab;
    color: #245f1a;
}
.search__not-found {
  font-size: 24px;
  color: #245f1a;
  margin: 20px;
}
:deep(.el-input__prefix),
:deep(.el-input__suffix),
:deep(.el-input__inner::placeholder) {
    color: #245f1aab;
} 
</style>
