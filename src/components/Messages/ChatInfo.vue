<template>
    <div class="info">
      <div class="info__image">
        <el-image
          class="container__image"
          :src="data.icon"
          :fit="fit"
        ></el-image>
      </div>
      <div class="info__username">
        {{ data.name }}
      </div>
    </div>
</template>

<script lang="ts">
import store from "@/store";
import Vue from "vue";
import { IMAGE } from "@/api/routes";
import UploadImage from "@/components/Messages/UploadImage.vue";

export default Vue.extend({
  props: {
    data: Object
  },
  data() {
    return {
      fit: 'cover',
    };
  },
  components: {
 UploadImage 

  },
  computed: {
    imgUrl(): string {
      return IMAGE(this.data.icon)
    },
  },
  methods: {
}
});
</script>

<style scoped>
span {
  display: flex;
}
.info {
  min-width: 400px;
  min-height: 700px;
  width: 0vw;
  height: 60vh;
  background-color: aqua;
}
.info__setting {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
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
