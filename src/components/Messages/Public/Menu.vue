<template>
    <!-- Інформація -->
    <!-- Додати до чату -->
    <!-- Покинути чат -->
    <!-- Змінити зображення -->
    <!-- Видалити чат -->

    <div id="public-menu">

                    <!-- Інформація -->
       <div class=""  @click="moreInfoVisible = true">
        <el-col :span="8">
    <el-card shadow="hover" >
      Інформація
      <i class="el-icon-info"></i>
    </el-card>
  </el-col>
       </div>
<el-dialog
title="Інформація"
 :visible.sync="moreInfoVisible"
 top="20px"
 width="400px"
 >
 <PublicInfo />
</el-dialog>

                <!-- Додати до чату -->
    <div class=""  @click="addToChatVisible = true">
  <el-col :span="8">
  <el-card shadow="hover"  >
     Додати до чату
      <i class="el-icon-success"></i>
    </el-card>
  </el-col>
</div>
<el-dialog title="Додати до чату:"
 :visible.sync="addToChatVisible"
 top="10vh"
 width="400px"
 >
<Search />
</el-dialog>

                 <!-- Покинути чат -->
    <div class=""  @click="wantLeaveVisible = true">
   <el-col :span="8" @click="">
    <el-card shadow="hover">
      Покинути чат
      <i class="el-icon-warning"></i>
    </el-card>
  </el-col>
</div>
<el-dialog
  title="Ви дійсно бажаєте покинути чат?"
  :visible.sync="wantLeaveVisible"
  width="40%"
  >
  <span slot="footer" class="dialog-footer" style="justify-content: space-around; display: flex;">
    <el-button @click="wantLeaveVisible = false">Відмінити</el-button>
    <el-button type="primary" @click="leaveChat()">Покинути</el-button>
  </span>
</el-dialog>

              <!-- Змінити зображення -->
    <div class=""  @click="changeIconVisible = true">
  <el-col :span="8"  >
    <el-card shadow="hover">
      Змінити зображення
      <i class="el-icon-picture"></i>
    </el-card>
  </el-col>
</div>
<el-dialog 
title="Змінити зображення" 
:visible.sync="changeIconVisible"
width="300px"
>
  <UploadImage @cancel="changeIconVisible = false" :chatId="CHAT_ID"  />
</el-dialog>

              <!-- Видалити чат -->
    <div class=""  @click="deleteChatVisible = true">
  <el-col :span="8">
    <el-card shadow="hover">
      Видалити чат
      <i class="el-icon-remove"></i>
    </el-card>
  </el-col>
</div>
<el-dialog
  title="Ви дійсно бажаєте видалити чат?"
  :visible.sync="deleteChatVisible"
  width="40%"
  >
  <span slot="footer" class="dialog-footer" style="justify-content: space-around; display: flex;">
    <el-button @click="deleteChatVisible = false">Відмінити</el-button>
    <el-button type="primary" @click="deleteChat">Видалити</el-button>
  </span>
</el-dialog>
    </div>
    </template>
      
      <script lang="ts">
      import Vue from 'vue';
      import Search from '@/components/Messages/Public/Search.vue';
      import UploadImage from '@/components/Messages/UploadImage.vue'
import { mapGetters } from 'vuex';
import PublicInfo from '@/components/Messages/Public/PublicInfo.vue'
       
    export default Vue.extend({
          props: {
          chatId: Number
          },
          data() {
            return {    
              moreInfoVisible: false,
              addToChatVisible: false,
              changeIconVisible: false,
              wantLeaveVisible: false,
              deleteChatVisible: false,
            };
          },
          components: {
            Search,
            PublicInfo,
            UploadImage
          },
          computed: {
            ...mapGetters([
            'CHAT_ID',
            'USER_ID',
          'WEB_SOCKET'
            
            ]),
          },
          methods: {
            deleteChat() {
              this.$store.dispatch('deleteСhat', this.CHAT_ID)
              .then(() => {
                this.$notify({
                  title: 'Видалено',
                  text: "Чат видалено",
                  type: 'success'
                });
                this.$router.push('/')
    this.WEB_SOCKET.send("delete")
                this.deleteChatVisible = false
              })
            },
            leaveChat() {
              this.deleteChatVisible = false
              this.$store.dispatch('deleteUserFromChat', {
                userId: this.USER_ID,
                chatId: this.CHAT_ID,
              })
              .then(() => {
              this.$store.dispatch('getUserPublicChats', this.USER_ID)
                this.$notify({
                  title: 'Ви покинули чат',
                  text: "Чат видалено",
                  type: 'success'
                });
                this.$router.push('/')
              })
            }
          },
        })
      </script>

      <style scoped>
.addToChat {
  border-color: aquamarine;
}

    .el-col-8 {
    width: 20vw;
    min-width: 240px;
    }
:deep(.el-button ) {
    font-size: 14px;
    border-radius: 8px;
    padding: 8px;
    /* background-color: rgba(66, 168, 241, 0.086); */
}
#public-menu {
    position: absolute;
    right: 0;
    top: 60px;
    display: flex;
    flex-direction: column;
}
:deep(.el-card__body) {
  padding: 12px 12px;
    margin: 0 20px;
    display: flex;
    justify-content: space-between;
}
    </style>