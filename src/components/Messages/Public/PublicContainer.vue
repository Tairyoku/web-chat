<template>
  <div id="container-block"
  >
  <!-- v-on:click="click" -->
    <div class="container__icon">
      <div class="" v-if="item.icon == ``">
        {{ getChatIcon(item.name) }}
       </div>
      <div class="" v-else>
        <el-image
          class="container__image"
          :src="imgUrl"
          :fit="fit"
        ></el-image>
      </div>
    </div>

    <div class="container__info">
      <div class="container__name">{{ item.name }}</div>
  <div class="" v-if="item?.types != 'private'">
    {{ numberOfUsers }} {{ users }}
  </div>
  </div>
  </div>
</template>


<script lang="ts">
import Vue from "vue";
import Status from "@/components/Users/Status.vue";
import { mapGetters } from "vuex";
import { IMAGE_SMALL } from "@/api/routes";
export default Vue.extend({
  name: "user-container",
  data() {
    return {
      chatId: 0,
      numberOfUsers: 0,
      img: "",
      fit: "cover",
    };
  },
  props: {
    item: Object,
  },
  methods: {

    getChatIcon(name: string): string {
      return name?.length < 4 ? name : name?.split("").slice(0, 3).join("");
    },

  },
  components: {
    Status,
  },
  watch: {
    item() {
      this.chatId = this.CHAT_ID
      this.getNumOfUsers
    },

  },
  computed: {
    ...mapGetters([
'CHAT_ID',
    ]),
    imgUrl(): string {
      return IMAGE_SMALL(this.item.icon)
    },
    getNumOfUsers() {
    this.$store.dispatch("getChatUsers", this.CHAT_ID).
    then((res) => {
this.numberOfUsers = res.size
    })
  },
  users() {
      switch (this.numberOfUsers) {
        case 1: 
        return "користувач"

        case 2: 
        case 3: 
        case 4: 
        return "користувачі";
      
      default: 
        return "користувачів"
      }
    },
  },
mounted() {
  this.getNumOfUsers
}
});
</script>

<style scoped>
.container__icon {
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  font-size: 24px;
    height: 52px;
    width: 52px;
    border-radius: 26px;
  color: white;
  background-color: rgb(207, 49, 186);
}
#container-block {
  color: black;
  height: 52px;
  padding: 4px;
  display: flex;
}
.container__image {
  width: 52px;
  height: 52px;
  border-radius: 26px;
  display: flex;
}
.container__info {
      color: black;
    flex-wrap: wrap;
    display: flex;
    align-content: flex-start;
    justify-content: space-around;
    font-size: 16px;
    text-align: start;
    padding-left: 24px;
    overflow: hidden;
    flex-direction: column;
    align-items: flex-start;
}

.container__name {
  margin-left: 8px;
    width: 100%;
    text-align: center;
}

</style>
