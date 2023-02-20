<template>
  <div class="search">
    <div class="search__search-line" 
    v-on:input="searchHandler"
    >
      <el-input
        v-model="searchName"
        placeholder="Знайти..."
        @focus="isSearchWindowVisible(true)"
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
    @mouseleave="isSearchWindowVisible(false)"
    class="search__found">
      <div v-if="searchName?.length == 0"></div>
      <div 
      v-else-if="CHATS_SEARCH_RESULT?.length == 0"
    class="search__not-found"
      >Чатів не знайдено</div>
      <div v-else>
        <ul class="" style="margin-left: 0; padding-left: 0">
          <li
            style="list-style-type: none"
            :key="item.id"
            v-for="item in CHATS_SEARCH_RESULT"
          >
            <div class="" @click="getUserChat(item.id)">
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
    getUserChat(chatId: number) {
      this.$router.push(`/chat/${chatId}`);
    },
    isSearchWindowVisible(res: boolean) {
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
  width: inherit;
}

.search__found {
  background: linear-gradient(#beef71, rgb(229 255 173));
  position: absolute;
  z-index: 3;
  width: inherit;
  height: -webkit-fill-available;
}
.search__search-line {
  display: flex;
  background-color: rgba(255, 255, 255, 0);
}
:deep(.el-input__inner) {
    background-color: #fff0;
    border: 2px solid #929224ab;
    color: #929224;
}

:deep(.el-input__prefix),
:deep(.el-input__suffix),
:deep(.el-input__inner::placeholder) {
    color: #929224ab;
}
.search__not-found {
  font-size: 24px;
  color: #929224;
  margin: 20px;
}
</style>