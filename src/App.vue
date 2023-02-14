<template>
  <div id="app">
    
   <MainView />
 
 

  </div>
</template>

<script lang="ts">
import Vue from "vue";
import MainView from '@/views/MainView.vue'

export default Vue.extend ({
  name: "app",
  components: { 
    MainView 
},

created() {
  this.$store.dispatch('getStarted')
},  
});
</script>
 
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  text-overflow: ellipsis;
  height: calc(100vh - 2px);
  width: 100vw;
  position: absolute;
  top: 0;
  /* margin-top: 60px; */
}

.el-input__inner {
  height: 32px;
}

body {
  margin: 0;
}
</style>
