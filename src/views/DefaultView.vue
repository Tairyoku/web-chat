<template>
  <div class="default">
<ul>
  Для початку листування потрібно:
  <li>Обрати потрібний вам чат;</li>
  <li>Знайти чат або користувача;</li>
  <li>Створити власний публічний чат;</li>
</ul>
</div>
</template>

<script lang="ts">
import Vue from "vue";
import Users from '@/components/Users/UsersView.vue'
import Chats from '@/components/Chats/ChatView.vue'


export default Vue.extend({
  components: {
Users,
Chats,
  },
});
</script>

<style scoped>
.default {
  display: flex;
    font-size: 24px;
    height: 90vh;
    align-items: center;
    justify-content: center;
}

ul {
text-align: start;
}

li {
  margin: 8px 0;
  margin-left: 40px;
    font-size: 20px;
}

</style>