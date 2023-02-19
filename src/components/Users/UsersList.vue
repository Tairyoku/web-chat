<template>
<div id="users-list">
  <ul class=""
  style=" margin-left: 0;  padding-left: 0;"
  v-infinite-scroll="load"
  >
  <li style="list-style-type: none;" 
  v-for="item in list" 
  :key=item.id
  >
<div class="" @click="getChat(item.id)">
  <UserContainer  :user=item />
</div>
</li>
</ul>
<p v-if="loading">
<i class="el-icon-loading"></i>
</p>
</div>
</template>
  
  <script lang="ts">
  import Vue from 'vue';
import { mapGetters } from "vuex";
  import UserContainer from '@/components/Users/UserContainer.vue'
import { IUser } from '@/store/models';
   
export default Vue.extend({
      props: {
        list: {
          type: Array,
          default() {
            return [] as IUser[]
          }
        }
      },
      data() {
        return {
          count: 7,
        loading: false,
        };
      },
      components: {
UserContainer
      },
      methods: {
        load () {
        this.loading = true
        setTimeout(() => {
          this.count += 2
          this.loading = false
        }, 500)
      },
      getChat(id: number) {
      this.$store.dispatch("createPrivateChat", id).
      then((res) => {
        this.$router.push(`/chat/${res}`);
        // if (this.WEB_SOCKET.readyState != undefined) {
        //   this.$store.commit("closeSocket");
        // }
        // this.$store.dispatch("openWebsocket", res);
        this.$store.dispatch("getUserPrivateChats", this.USER_ID);

      });
    }, 
      },
      computed: {
    ...mapGetters([
      "WEB_SOCKET",
      'USER_ID',
    ]),
  },
    })
  </script>

  <style>
#users-list {
overflow-x: hidden; 
  overflow-y: auto;
height: calc(100vh - 2px - 40px - 64.8px - 44px);
}

#users-list::-webkit-scrollbar {
      width: 1em;
      } 
      #users-list::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
      }
      #users-list::-webkit-scrollbar-thumb {
      background-color: #666;
      outline: 1px solid #eee;
      border-radius: 4px;
      }
      
</style>