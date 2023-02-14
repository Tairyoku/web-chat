<template>
  <div id="container-block">
    <div class="container__icon" @click="click">
      <div class="" v-if="item.icon == ``">
        {{ getChatIcon(item.username) }}
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
      <div>{{ item.username }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { IMAGE_SMALL } from "@/api/routes";

export default Vue.extend({
  props: {
    item: Object,
  },
  data() {
    return {
      fit: "cover",
    };
  },
  methods: {
    getChatIcon(name: string): string {
      return name.length < 4 ? name : name.split("").slice(0, 3).join("");
    },
    click() {
      console.log(this.item.id);
      console.log(this.item.username);
      console.log(this.item.icon);
    },
  },
  components: {},
  computed: {
    imgUrl() {
      return IMAGE_SMALL(this.item.icon);
    },
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
