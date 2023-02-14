<template>
    <div class="messages">
      <div class="" v-if="typeOfChat == `private`">
      <PrivateHeader />
      </div>
      <div class="" v-else-if="typeOfChat == `public`">
        <PublicHeader />
      </div>
  <MessageList :chat="chat" /> 
<!-- <UploadImage /> -->
      <!-- <ChatInfo  /> -->
<MessageCreate  />
    </div>
    </template>
      
      <script lang="ts">
      import Vue from 'vue';
      import ChatInfo from '@/components/Messages/Public/PublicInfo.vue'
      import UploadImage from '@/components/Messages/UploadImage.vue'
      import PrivateHeader from '@/components/Messages/Private/Header.vue'
      import PublicHeader from '@/components/Messages/Public/Header.vue'
import MessageList from "@/components/Messages/MessageList.vue"
import MessageCreate from "@/components/Messages/CreateMessage.vue"
import { mapGetters } from 'vuex';
import { IChat, IUser } from '@/store/models';
const minLimit = 8
    export default Vue.extend({
          props: {
          },
          data() {
            return {
              limit: minLimit,
              chatId: 0,
              chat: {} as IChat,
              user: {} as IUser,
              bbb: {
                id: 3,
                username: "Yukio",
                icon: "",
              } as IUser
            };
          },
          components: {
            PrivateHeader, 
            PublicHeader,
            MessageList,
            MessageCreate,
            UploadImage,
            ChatInfo
          },
          methods: {
            click() {
              console.log(this.CHAT_ID)
            },
            getChat(id: number) {
              this.$store.dispatch('getChat', id).
              then((res) => {
                this.chat = res
                // console.log(this.chat)
                this.$store.commit('setChatId', id) 
                  if (this.WEB_SOCKET.readyState != undefined) {
          this.$store.commit("closeSocket");
        }
        this.$store.dispatch("openWebsocket", id);
        this.$store.dispatch("getLimitChatMessages",{
           chatId: id,
           limit: this.limit
          });
          setTimeout(() => 
          document.getElementById('arrowTop')?.scrollIntoView(),
    100)
        // this.$store.dispatch("getChatMessages", id);
      })
    },
  },
  watch: {
    CHAT_ID() {
      this.limit = minLimit
      this.getChat(this.CHAT_ID)
      if (this.chat.id != this.CHAT_ID) {
        this.$store.dispatch("getLimitChatMessages", {
           chatId: this.CHAT_ID,
           limit: this.limit
          });
          setTimeout(() => document.getElementById('arrowTop')?.scrollIntoView(),
    100)
        // this.$store.dispatch("getChatMessages", this.CHAT_ID);
      }
        },
          },
          computed: {
            ...mapGetters([
              'USER_ID',
              'USER',
              'CHAT_ID',
              'WEB_SOCKET',
            ]),
            typeOfChat():string {
              console.log(this.chat.types)
              return this.chat.types
            }
          },
          mounted() {
           this.chatId = Number(this.$route.params.id)
           this.getChat(this.chatId)
        
      }
        })
      </script>