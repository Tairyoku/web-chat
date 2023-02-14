<template>
  <div id="sign-up">
    <div class="form">
      <el-form :model="form" @sumbit="signUpHandler">
        <span style="cursor: context-menu">ПРИЄДНУЙСЯ ДО НАС</span>
        <el-input
          class="input"
          style="margin-top: 48px"
          placeholder="Як тебе звати?"
          v-model="form.username"
        ></el-input>
        <el-input
          class="input"
          placeholder="Вигадай надійний пароль"
          v-model="form.password"
          show-password
        ></el-input>
        <div class="btns">
          <el-button class="btn" v-on:click="signUpHandler"
            >Зареєструватися</el-button
          >
          <el-button class="btn" v-on:click="cancelHandler">Очистити</el-button>
        </div>
      </el-form>
      <el-link class="link" v-on:click="signInNavigate">
        Вже маєте акаунт?
      </el-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data(): {
    form: {
      username: string;
      password: string;
    };
  } {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    signUpHandler() {
      if (this.form.username === "") {
        return;
      }
      if (this.form.password?.length < 6) {
        this.form.password = "";
        return;
      }
      this.$store
        .dispatch("register", {
          username: this.form.username,
          password: this.form.password,
        })
        .then(() => {
          this.form.username = "";
          this.form.password = "";
          // this.$store.dispatch("getStarted");
          // this.$router.push("/")
        })
      .then((res) => this.$router.push('/chat/'))
    },
    cancelHandler() {
      this.form.username = "";
      this.form.password = "";
    },
    signInNavigate() {
      this.$router.push({ name: "sign-in" });
    },
  },
});

//любой js код что я захочу, в том числе функции
</script>

<style scoped>
#sign-up {
  z-index: 2;
  width: 100vw;
  height: 100%;
  left: 0px;
  font-size: 24px;
  top: 0px;
  color: #245f1a;
  position: absolute;
  background-color: #f4ffc2;
  justify-content: center;
  display: flex;
  align-items: center;
}

:deep(.el-input) {
  /* margin-top: 20px; */
  margin: 15px auto;
  position: relative;
  font-size: 14px;
}

.btn {
  background-color: #ddff8f;
  color: #245f1a;
  border: 2px groove #afec4d;
  border-radius: 16px;
  font-size: 20px;
}
.link {
  margin-top: 20px;
  margin-left: 52px;
  color: #245f1ab0;
}

.btns {
  display: flex;
  justify-content: space-between;
}

.form {
  width: 360px;
}

.input {
  color: #fff;
}

:deep(.el-input__inner) {
  color: #245f1a;
  font-size: 20px;
  height: 40px;
  background-color: #f0f0b4;
}
:deep(.el-link.el-link--default) {
  color: #245f1ab0;
  font-size: 16px;
}

:deep(.el-link.el-link--default:hover) {
  color: #a9ae2d;
}

:deep(.el-input__inner:hover) {
  border-color: #afec4d;
}

:deep(.el-button:hover) {
  color: #e0ce2b;
  border-color: #eeff25;
  background-color: #fbff8580;
}
</style>
