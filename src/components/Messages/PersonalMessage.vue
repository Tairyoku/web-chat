<template>
    <div class="personal__message" v-if="USER_ID == message.author">
      <!-- Мої повідомлення -->
      <div class="personal__data" :style="cleatBottomRightRadius()">
        <div class="personal__text">
          {{ message.text }}
        </div>
        <div class="personal__time">
          {{ getTime() }}
        </div>
      </div>
      <div class="personal__tail" v-if="tail">
        <div class="tail__clean"></div>
        <div class="tail__lasts"></div>
      </div>
    </div>
</template>

<script lang="ts">
import { IMessage, IUser } from "@/store/models";
import Vue from "vue";
import { mapGetters } from "vuex";

export default Vue.extend({
  props: {
    message: Object,
    tail: Boolean,
  },
  data() {
    return {
      user: {} as IUser,
    };
  },
  components: {},
  computed: {
...mapGetters([
  'USER_ID'
]),
  },
  watch: {
    message() {
      this.getTime()
    }
  },
  methods: {
    cleatBottomRightRadius() {
      if (this.tail) return "border-bottom-right-radius: 0; ";
    },
    getTime() {
      let date = new Date( Date.parse(this.message.sent_at) )
      return date
        .toTimeString()
        .replace(/:[0-9]{2,2} .*/, "")
    },
  },
});
</script>

<style scoped>
.personal__message {
  margin: 16px;
  width: 45%;
  margin-left: auto;
}
.personal__data {
  padding: 8px 16px;
  border-radius: 8px;
  background-color: rgb(66, 168, 241);
}
.personal__text {
  text-align: justify;
  text-overflow: ellipsis;
  overflow-wrap: break-word;
  width: 80%;
}
.personal__time {
  text-align: right;
  font-size: 12px;
}
.personal__tail {
  width: 100%;
  height: 16px;
  display: flex;
  background-color: rgb(66, 168, 241);
}
.tail__clean {
  width: 100%;
  background-color: white;
  border-top-right-radius: 16px;
}
.tail__lasts {
  width: 0%;
}
</style>
