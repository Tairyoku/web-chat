<template>
  <div id="messages" >
    <div id="fff" class="scroll" ref="changeMessage" v-if="scrollHandler" >
      <i class="el-icon-loading" v-if="loaderVisible"></i>
    </div>
    <ul id="list"  class="" style="margin-left: 0; padding-left: 0">
      <li
        style="list-style-type: none"
        v-for="(message, index) in MESSAGE_LIST"
        :key="message.id"
      >
        <Message :message="message" :tail="isLast(message,index)" />
      </li>
    </ul>
 <div id="arrowTop"></div>

  </div>
</template>

<script lang="ts">
import { IMessage } from "@/store/models";
import Message from "@/components/Messages/Message.vue";
import Vue from "vue";
import { mapGetters } from "vuex";
const minLimit = 7
export default Vue.extend({
  props: {
    chat: Object,
  },
  data() {
    return {
      loaderVisible: false,
      limit: minLimit,
      msgLength: 0,
      scrollHandler: true
    };
  },
  components: {
    Message,
  },
  computed: {
    ...mapGetters([
      'MESSAGE_LIST',
      'CHAT_ID'
    ])
  },
  watch: {
    CHAT_ID() {
this.scrollTrigger()
    }
  },
  methods: {
    isLast(message:IMessage, index: number): boolean {
      if (index == this.MESSAGE_LIST?.length-1) {
        return true;
      }
       else if (message.author == this.MESSAGE_LIST[index+1].author) {
        return false
      }
      return true
    },
scrollTrigger() {
            const observer = new IntersectionObserver((entries) => {
              entries.forEach(entry => {
                if (entry.intersectionRatio > 0) {
                  console.log("first")
                  this.loaderVisible = true
                  this.msgLength = this.MESSAGE_LIST?.length
                  this.$store.dispatch("getLimitChatMessages", {
                    chatId: this.CHAT_ID,
           limit: this.limit
          })
          .then(() => {
            console.log(this.msgLength)
            console.log(this.MESSAGE_LIST?.length)
              if (this.msgLength == this.MESSAGE_LIST.length) {
                observer.disconnect()
              }
            this.limit+=6
            this.loaderVisible = false
            document.getElementById("messages")?.scrollTo(0, 100)
            
          } )
      }
    })
  })
  observer.observe(this.$refs.changeMessage as Element)
},
  },
mounted() {
  this.scrollTrigger()
}
});
</script>
<!-- <div id="arrowTop" hidden></div>

<script>

  arrowTop.onclick = function() {
    window.scrollTo(pageXOffset, 0);
    // после scrollTo возникнет событие "scroll", так что стрелка автоматически скроется
  };

  window.addEventListener('scroll', function() {
    arrowTop.hidden = (pageYOffset < document.documentElement.clientHeight);
  }); -->
<style scoped>
li {
  margin: -8px 0;
}

ul {
  width: calc(50vw - 1em - 4px);
  display: flex;
  flex-direction: column;
}

#messages {
overflow-x: hidden; 
  overflow-y: auto;
  height: calc(100vh - 140px - 80px);
}
.scroll {
  height: 50px;
    margin-bottom: 10px;
    background: #0000;
    font-size: 48px;
}

#messages::-webkit-scrollbar {
      width: 1em;
      } 
      #messages::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
      }
      #messages::-webkit-scrollbar-thumb {
      background-color: #666;
      outline: 1px solid #eee;
      border-radius: 4px;
      }
</style>
