<template>
  <div id="container-block" @click="click"
  >
    <div class="container__icon">
      <div class="" v-if="user.icon == ''">
        {{ getChatIcon(user.username) }}
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
      <div style="margin-left: 8px;">{{ user.username }}</div>
      <Status :id="user.id" />
    </div>
  </div>
</template>
<!-- 'fill', 'contain', 'cover', 'none', 'scale-down'], -->
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
      img: "",
      fit: "cover",
    };
  },
  props: {
    user: Object,
  },
  methods: {
    click() {
      this.$emit('click')
    },
    getChatIcon(name: string): string {
      return name?.length < 4 ? name : name?.split("").slice(0, 3).join("");
    },
    // getChat() {
    //   this.$store.dispatch("createPrivateChat", this.user.id).
    //   then((res) => {
    //     this.$router.push(`/chat/${res}`);
    //     if (this.WEB_SOCKET.readyState != undefined) {
    //       this.$store.commit("closeSocket");
    //     }
    //     this.$store.dispatch("openWebsocket", res);
    //     this.$store.dispatch("getUserPrivateChats", this.USER_ID);

    //   });
    // },
  },
  components: {
    Status,
  },
  computed: {
    ...mapGetters([
      "WEB_SOCKET",
      'USER_ID',
    ]),
    imgUrl() {
      if (this.user.icon != "") {
      return IMAGE_SMALL(this.user.icon)
      }
    }
  },
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
    border-radius: 12px;
    padding: 12px;
    margin: 8px;
  background-color: rgba(207, 49, 186, 0);
    justify-content: space-evenly;
    display: flex;
    border: 2px solid #c1ab18;
    box-shadow: 2px -2px 4px 4px #c1ab1882;
}
.container__image {
  width: 52px;
  height: 52px;
  border-radius: 26px;
  display: flex;
}
.container__info {
      color: black;
    width: 70%;
    flex-wrap: wrap;
    display: flex;
    align-content: flex-start;
    justify-content: flex-start;
    font-size: 16px;
    text-align: start;
    padding-left: 4px;
    overflow: hidden;
    flex-direction: column;
    align-items: flex-start;
}


</style>
