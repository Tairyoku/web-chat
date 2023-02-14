<template>
    <div class="create__window">
      <textarea
        class="create__text"
        placeholder="Write..."
        v-model="text"
        rows="4"
      ></textarea>
      <button
        class="create__btn el-icon-position"
        @click="sendMessage"
      ></button>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";

export default Vue.extend({
  props: {
  },
  data() {
    return {
      text: "",
    };
  },
  components: {
  },
  methods: {
    sendMessage() {
      if (this.text == "") {
        return;
      }
      this.$store.dispatch("createMessage", {
          chatId: this.CHAT_ID,
          text: this.text,
        })
        .then(() => {
    this.WEB_SOCKET.send(this.text)
    this.text = ""
    setTimeout(() => document.getElementById('arrowTop')?.scrollIntoView(),
    100)
  })
    },
  },
  computed: {
  ...mapGetters([
    'WEB_SOCKET',
    'CHAT_ID'
  ])
},
});
</script>

<style scoped>
.create__window {
  margin: 8px;
  height: 100px;
    display: flex;
    width: -webkit-fill-available;
    padding: 12px;
    position: absolute;
    bottom: 0;
    border: 1px solid rgb(66, 168, 241);
    border-radius: 12px;
}
.create__text {
  height: 100%;
  width: 100%;
  font-size: larger;
  margin-left: 16px;
  resize: none;
  outline: none;
  border: none;
}
.create__btn {
  --size: 9vh;
  width: var(--size);
  height: var(--size);
  background-color: rgb(66, 168, 241);
  color: aliceblue;
  border-radius: 50%;
  border: none;
  font-size: 6vh;
  text-align: initial;
  margin: auto 8px;
}
.create__text::-webkit-scrollbar {
  width: 8px;
}
.create__text::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(66, 168, 241, 0.3);
}
.create__text::-webkit-scrollbar-thumb {
  background-color: rgb(66, 168, 241);
  outline: 1px solid #eee;
  border-radius: 4px;
}
</style>
