<template>
  <div class="search">
    <div class="search__search-line" 
    @focusout="setSearch(false)"
    >
    <!-- v-on:input="searchHandler" -->
      <el-input
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
    <div v-if="search" class="search__found">
      <div v-if="searchName?.length == 0"></div>
      <div v-else-if="CHATS_SEARCH_RESULT?.length == 0">not found</div>
      <div v-else>
        <ul class="" style="margin-left: 0; padding-left: 0">
          <li
            style="list-style-type: none"
            :key="item.id"
            v-for="item in CHATS_SEARCH_RESULT"
          >
            <div class="" @click="click(item.id)">
  <ChatContainer :chat="item" />
</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style></style>

<script lang="ts">
import Vue from "vue";
import ChatContainer from "@/components/Chats/ChatContainer.vue";
import { mapGetters } from "vuex";
export default Vue.extend({
  data() {
    return {
      search: false,
      searchName: "",
    };
  },
  components: {
    ChatContainer,
  },
  computed: {
    ...mapGetters([
    "WEB_SOCKET",
      "CHATS_SEARCH_RESULT"
    ]),
  },
  methods: {
    click(chatId: number) {
      this.$router.push(`/chat/${chatId}`);
      this.$store.commit('setChatId', chatId) 
      if (this.WEB_SOCKET.readyState != undefined) {
          this.$store.commit("closeSocket");
        }
        this.$store.dispatch("openWebsocket", chatId);
    },
    setSearch(res: boolean) {
      this.search = res;
    },
    clearSearch() {
      this.searchName = "";
    },
    searchHandler() {
      if (this.searchName?.length != 0) {
        this.$store.dispatch("searchChats", this.searchName);
      }
    },
  },
  watch: {
    searchName() {
      this.searchHandler()
    }
  }
});
</script>

<style scoped>
.search {
  /* display: flex; */
  width: inherit;
}

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
</style>
