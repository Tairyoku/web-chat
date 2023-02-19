<template>
  <div class="upload">
    <div class="upload__image">
      <div v-if="dialogVisible" class="">
        <i class="el-icon-plus" @click="uploadImage"></i>
      </div>
      <img
        id="image"
        width="100%"
        alt=""
        @click="uploadImage"
        :src="imageSrc"
      />
    </div>
    <!-- 
         <form 
        enctype="multipart/form-data"
        action="#"
        method="post"
        > -->
    <input
      style="display: none"
      id="inputFile"
      type="file"
      @change="getImage"
      accept="image/*,.png,.jpg,.jpeg,.gif,.web"
    />
    <!-- </form> -->

    <div v-if="!disabled" class="upload__buttons">
      <el-button @click="cancel">Відмінити</el-button>
      <el-button type="primary" @click="change">Змінити</el-button>
    </div>
  </div>
</template>

<script type="module" lang="ts">
import store from "@/store";
import Vue, { ref } from "vue";
import { CHANGE_ICON } from "@/api/routes";
import { mapGetters } from "vuex";
export default Vue.extend({
  props: {
    chatId: Number,
  },
  data() {
    return {
      formData: new FormData(),
      imageSrc: "",
      dialogVisible: true,
      disabled: true,
      fit: "cover",
    };
  },

  methods: {
    async getImage(event: any) {
      // Завантажуємо в FormData файл зображення для подальшого запиту на сервер
      this.formData.delete("image");
      this.formData.append("image", event.target.files[0]);

      // Присвоюємо посилання на зображення
      this.imageSrc = await loadFile(event.target.files[0]);

      // Отримуємо посилання на зображення

      // Асинхронна функція, повертає посилання після ії успішного отримання
      function loadFile(file: any): Promise<string> {
        return new Promise((resolve) => {
          var reader = new FileReader();
          reader.onloadend = function () {
            let data = String(reader.result);
            resolve(data);
          };
          reader.readAsDataURL(file);
        });
      }
      this.dialogVisible = false;
      this.disabled = false;
    },
    cancel() {
      this.formData.delete("image");
      this.$emit("cancel");
    },
    change() {
      switch (this.chatId) {
        case 0: {
          this.changeUserIcon();
          break;
        }
        default: {
          this.changeChatIcon(this.chatId);
          break;
        }
      }
    },
    changeUserIcon() {
      this.$store.dispatch("changeIcon", this.formData).then(() => {
        this.formData.delete("image");
        console.log("change icon")
        this.$store.dispatch("getStarted");
        this.$emit("cancel");
      });
    },
    changeChatIcon(chatId: number) {
      this.$store
        .dispatch("changeChatIcon", {
          chatId: chatId,
          image: this.formData,
        })
        .then(() => {
          this.formData.delete("image");
      this.$emit("cancel");
        });
    },
    uploadImage() {
      var input = document.getElementById("inputFile");
      if (input) {
        input.click();
      }
    },
  },
  computed: {
    ...mapGetters(["USER"]),
  },
});
</script>

<style scoped>
.upload {
  /* width: 400px; */
  /* height: 600px; */
  /* background-color: rgba(211, 121, 121, 0.445); */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: inherit;
  height: inherit;
}
/* :deep(ul) {
  -webkit-margin-before: 0px;
  margin-block-start: 0px;
  -webkit-margin-after: 0px;
   width: inherit; 
  margin: 0px;
  height: inherit;
  margin-block-end: 0px;
} */
.upload__image {
  background-color: azure;
  width: 180px;
  height: 180px;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  border: dashed 2px aqua;
  border-radius: 8px;
}
:deep(.el-icon-plus:before) {
  font-size: 40px;
  color: aqua;
}
.upload__buttons {
  display: flex;
  width: 240px;
  margin-top: 32px;
  justify-content: space-between;
}

/* :deep(.el-upload-list--picture .el-upload-list__item) {
  overflow: hidden;
  z-index: 0;
  display: flex;
  width: inherit;
  background-color: #fff;
  border: 1px solid #c0ccda;
  border-radius: 6px;
  box-sizing: border-box;
  height: inherit;
  margin: 0;
  padding: 0;
  align-items: center;
}
:deep(.el-image) {
  position: relative;
  display: inline-block;
  overflow: hidden;
  width: inherit;
  height: inherit;
}
:deep(.el-image__error, .el-image__inner, .el-image__placeholder) {
  width: 100%;
  height: 100%;
} */
</style>
