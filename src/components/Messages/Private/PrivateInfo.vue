<template>
    <div class="info">
      <div class="info__image">
        <el-image
          class="container__image"
          :src="imgUrl"
          :fit="fit"
        ></el-image>
      </div>
      <div class="info__username">
        {{ user.username }}
      </div>

    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { IMAGE } from "@/api/routes";
import UploadImage from "@/components/Messages/UploadImage.vue";
import { mapGetters } from "vuex";
import { IUser } from "@/store/models";

export default Vue.extend({
  props: {
  },
  data() {
    return {
      fit: 'cover',
      user: {} as IUser,
    };
  },
  components: {
 UploadImage 

  },
  computed: {
    ...mapGetters([
      "WEB_SOCKET",
      'USER_ID',
      "CHAT_ID"
    ]),
    imgUrl(): string {
      return IMAGE(this.user.icon)
    },
  },
  methods: {
},
watch: {
  CHAT_ID() {
    this.$store.dispatch("getById", this.CHAT_ID)
    .then((res) => this.user = res.user)
  }
},
mounted() {
  this.$store.dispatch("getById", this.CHAT_ID)
    .then((res) => this.user = res.user)
}
});
</script>

<style scoped>
span {
  display: flex;
}
.info {
  margin-top: -20px;
  min-width: 200px;
  min-height: 200px;
  width: inherit;
  height: inherit;
  max-height: 100vh;
}
.info__username {
  margin: 16px 20px;
  font-size: 24px;
  text-align: start;
}
.info__list {
  border-radius: 12px;
  border: 2px solid rgb(166, 228, 41);
}
.info__setting {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
.info__users-list {
  overflow: auto;
}
.container__none {
  height: 25vh;
  background-color: rgb(236, 239, 197);
  color: rgb(103, 138, 32);
  font-size: 40px;
  /* text-align: center; */
  display: flex;
  justify-content: center;
  align-items: center;
}

.change{
  display: flex;
  flex-direction: column;
}
.change__icon {

  width: inherit;
  margin: 20px auto;

}

.demo-ruleForm {
width: 80%;
margin: 16px auto;
}
:deep(.el-form-item__content) {
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    position: relative;
    font-size: 14px;
}
:deep(.el-col-8) {
    width: 80%;
    margin: 0 auto;
}
:deep(.el-card__body) {
    padding: 8px;
}
:deep(.el-card__body) {
    display: flex;
    margin: 0 auto;
    padding: 8px;
    width: 80%;
    justify-content: space-between;
}

:deep(.el-form-item) {
    margin-bottom: 8px;
}
</style>
