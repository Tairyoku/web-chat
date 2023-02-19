import  axiosInstanse from "@/api";
import  axiosInstanseFormData from "@/api/forFormData";
import {
  ACCEPT,
  ADD_FRIEND,
  ADD_TO_BL,
  ADD_TO_CHAT,
  CANCEL_INVITE,
  CHANGE_CHAT_ICON,
  CHANGE_ICON,
  CHANGE_PASSWORD,
  CHANGE_USERNAME,
  CREATE_MESSAGE,
  CREATE_PRIVATE_CHAT,
  CREATE_PUBLIC_CHAT,
  DELETE_CHAT,
  DELETE_FRIEND,
  DELETE_FROM_BL,
  DELETE_FROM_CHAT,
  GET_BY_ID,
  GET_CHAT,
  GET_LIMIT_MESSAGES,
  GET_ME,
  GET_MESSAGES,
  GET_USERS,
  REFUSE,
  SEARCH_CHAT,
  SEARCH_USERS,
  SIGN_IN,
  SIGN_UP,
  USERS_LIST,
  USER_DATA,
  USER_PRIVATE,
  USER_PUBLIC,
  WEB_SOCKET,
} from "@/api/routes";
import router from "@/router";
import Vue from "vue";
import Vuex from "vuex";
import { IChat, IMessage, IUser } from "./models";

Vue.use(Vuex);

export default new Vuex.Store({
  //15 
  state: {
    // ID активного користувача
    // mutations: setUserId
    // actions:
    //    — getStarted
    //    — logout
    userId: 0,

    // ID відкритого чату
     // mutations: setChatId
    // actions:
    //    — createPrivateChat  надо ли тут? надо
    //    — getByName
    chatId: 0,

    // Дані АКТИВНОГО користувача
    // mutations: setUser
    // actions:
    //    — getUser викликається при запуску (getStarted)
    user: {} as IUser,

    // Socket
        // mutations: openWebsocket, closeSocket
    // actions:
    //    — openWebsocket
    socket: {} as WebSocket,

    // Список ОСОБИСТИХ чатів
      // mutations: setPrivateChatList
    // actions:
    //    — getUserPrivateChats
    privateChatList: [] as IChat[],
    
    // Список ПУБЛІЧНИХ чатів
         // mutations: setPublicChatList
    // actions:
    //    — getUserPublicChats
    publicChatList: [] as IChat[],

    // Список повідомлень
       // mutations: setChatMessages
      //             setPushMessage
    // actions:  
    //    — createPrivateChat  а нащо тут отримувати повідомлення
    //    — getChatMessages    якщо можна отримувати їх тут за його ID
    messages: [] as IMessage[],

    // Список знайдених користувачів
        // mutations: setSearchUsersList
    // actions:
    //    — searchUsers
    searchUsersList: [] as IUser[],

    // Список знайдених чатів
        // mutations: setSearchChatsList
    // actions:
    //    — searchChats
    searchChatsList: [] as IChat[],

    // Список учасників публічного чату
    // mutations: setChatUsersList
    // actions:
    //    — getChatUsers глобальний
    //    — дублікат - getNumOfChatUsers локальний, передає кількість учасників
    chatUsersList: [] as IChat[],
    
    // Список друзів
    // mutations: setFriendsList
    // actions:
    //    — usersList
    friendsList: [] as IUser[],
    
    // Список заблокованих користувачів
    // mutations: setBlackList
    // actions:
    //    — usersList
    blackList: [] as IUser[],
    
    // Список користувачів, що заблокували активного користувача
    // mutations: setOnBlackLists
    // actions:
    //    — usersList
    inBlackList: [] as IUser[],
    
    // Список користувачів, що отримали запрошення в друзі
    // mutations: setSentInvitesList
    // actions:
    //    — usersList
    sentInvitesList: [] as IUser[],
    
    // Список користувачів, що запросили у друзі
    // mutations: setInvitationsList
    // actions:
    //    — usersList
    invitationsList: [] as IUser[],
  },
  //для динамической передачи
  //20
  getters: {
    USER: (state) => {
      return state.user;
    },
    USER_ID: (state) => {
      return state.userId;
    },
    CHAT_ID: (state) => {
      return state.chatId;
    },
    WEB_SOCKET: (state) => {
      return state.socket;
    },
    FRIEND_LIST: (state) => {
      return state.friendsList;
    },
    BLACK_LIST: (state) => {
      return state.blackList;
    },
    ON_BLACK_LISTS: (state) => {
      return state.inBlackList;
    },
    SENT_INVITES_TO_FRIENDS: (state) => {
      return state.sentInvitesList;
    },
    FRIENDSHIP_REQUIRE: (state) => {
      return state.invitationsList;
    },
    ID_LIST_OF_FRIEND_LIST: (state) => {
      let list: number[] = [];
      state.friendsList.forEach((item) => list.push(item.id));
      return list;
    },
    ID_LIST_OF_BLACK_LIST: (state) => {
      let list: number[] = [];
      state.blackList.forEach((item) => list.push(item.id));
      return list;
    },
    ID_LIST_OF_ON_BLACK_LISTS: (state) => {
      let list: number[] = [];
      state.inBlackList.forEach((item) => list.push(item.id));
      return list;
    },
    ID_LIST_OF_SENT_INVITES_TO_FRIENDS: (state) => {
      let list: number[] = [];
      state.sentInvitesList.forEach((item) => list.push(item.id));
      return list;
    },
    ID_LIST_OF_FRIENDSHIP_REQUIRE: (state) => {
      let list: number[] = [];
      state.invitationsList.forEach((item) => list.push(item.id));
      return list;
    },
    USERS_SEARCH_RESULT: (state) => {
      return state.searchUsersList;
    },
    CHATS_SEARCH_RESULT: (state) => {
      return state.searchChatsList;
    },
    CHAT_USERS_LIST: (state) => {
      return state.chatUsersList;
    },
    PRIVATE_CHAT_LIST: (state) => {
      return state.privateChatList;
    },
    PUBLIC_CHAT_LIST: (state) => {
      return state.publicChatList;
    },
    MESSAGE_LIST: (state) => {
      return state.messages;
    },
  },
  //16+1
  mutations: {
    openWebsocket(state, chatId: number) {
      state.socket = new WebSocket(WEB_SOCKET + chatId);
    },
    closeSocket(state) {
      state.socket.close(1000);
    },
    setSearchUsersList(state, list: IUser[]) {
      state.searchUsersList = list;
    },
    setSearchChatsList(state, list: IChat[]) {
      state.searchChatsList = list;
    },
    setUserId(state, userId: number) {
      state.userId = userId;
    },
    setUser(state, user: IUser) {
      state.user = user;
    },
    setChatId(state, chatId: number) {
      state.chatId = chatId;
    },
    setFriendsList(state, list: IUser[]) {
      state.friendsList = list.sort((a, b) =>
        a.username.localeCompare(b.username)
      );
    },
    setBlackList(state, list: IUser[]) {
      state.blackList = list.sort((a, b) =>
        a.username.localeCompare(b.username)
      );
    },
    setOnBlackLists(state, list: IUser[]) {
      state.inBlackList = list.sort((a, b) =>
        a.username.localeCompare(b.username)
      );
    },
    setSentInvitesList(state, list: IUser[]) {
      state.sentInvitesList = list.sort((a, b) =>
        a.username.localeCompare(b.username)
      );
    },
    setInvitationsList(state, list: IUser[]) {
      state.invitationsList = list.sort((a, b) =>
        a.username.localeCompare(b.username)
      );
    },
    setChatMessages(state, list: IMessage[]) {
      state.messages = list;
    },
    setPushMessage(state, list: IMessage) {
      state.messages.push(list);
    },
    setPublicChatList(state, list: IChat[]) {
      state.publicChatList = list.sort((a, b) =>
        a.name.localeCompare(b.name));
    },
    setPrivateChatList(state, list: IChat[]) {
      state.privateChatList = list.sort((a, b) =>
        a.name.localeCompare(b.name));
    },
    setChatUsersList(state, list: IChat[]) {
      state.chatUsersList = list.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    },
  },
  actions: {
    /**
     * Перевіряє, чи залогінений користувач.
     * Якщо залогінен, отримує від сервера дані користувача.
     * Якщо логіну немає, відкриває сторінку реєстрації.
     */
    async getStarted({ }) {
      await axiosInstanse
        .get(GET_ME)
        .then((auth) => {
          if (auth.data.id == 0) {
            router.push({ name: "sign-up" });
            return
          }
          // router.push('/chat/')
          this.commit("setUserId", auth.data.id);
          this.dispatch("getUserPublicChats", auth.data.id);
          this.dispatch("getUserPrivateChats", auth.data.id);
          this.dispatch("getUser", auth.data.id)
          .then((res) => {
          this.commit("setUser", res);
          });
          this.dispatch("usersList", auth.data.id);
        })
        .catch((err) => {
          // setInterval(() => {
          // this.dispatch("getStarted")
          // }, 300)
          router.push({ name: "sign-up" });
        });
    },
    /**
     * Отримує від користувача ім'я та пароль, 
     * та реєструє нового користувача
     * 
     * @param {string} username - ім'я користувача
     * @param {string} password - пароль користувача
     */
    async register({ }, { username, password }) {
      //  let req = JSON.stringify({
      //    username: Username,
      //    password: Password,
      //  })
      await axiosInstanse
        .post(SIGN_UP, {
          "username": username,
          "password": password,
        })
        .then((auth) => {
          window.localStorage.setItem("token", auth.data.token)
        })
        .then(() => this.dispatch('getStarted'))
        .catch((err) => console.log(err));
    },
     /**
    * Отримує від користувача ім'я та пароль, 
    * та логінить користувача
    * 
    * @param {string} username - ім'я користувача
    * @param {string} password - пароль користувача
    */
    async login({ }, { username, password }) {
      await axiosInstanse
        .post(SIGN_IN, {
          "username": username,
          "password": password,
        })
        .then((auth) => {
          window.localStorage.setItem("token", auth.data.token);
        })
        .then(() => this.dispatch('getStarted'))
        .catch((err) => console.log(err));
    },
    /**
     * Розлогінює користувача (видаляє токен)
     */
    logout() {
      this.commit("setUserId", 0);
      window.localStorage.removeItem("token");
    },
       /**
     * Отримує від користувача старий та новий паролі, 
     * змінює пароль користувача на новий
     * 
     * @param {string} oldPassword - старий пароль для підтвердження
     * @param {string} newPassword - новий пароль
     */
    async changePassword({ }, { oldPassword, newPassword }) {
      await axiosInstanse
        .put(CHANGE_PASSWORD, {
          "old_password": oldPassword,
          "new_password": newPassword,
        })
        .catch((err) => console.log(err));
    },
        /**
     * Отримує від користувача нове ім'я, змінює ім'я користувача
     *  на нове, за умови, що воно не зайнято
     * 
     * @param {string} username - ім'я користувача
     */
    async changeUsername({ }, { username }) {
      await axiosInstanse
        .put(CHANGE_USERNAME, {
          "username": username,
        })
        .catch((err) => console.log(err));
    },
        /**
     * Отримує від користувача новий файл зображення, та оновнює його
     * 
     * @param {FormData} image - зображення користувача
     */
    async changeIcon({ }, image: any) {
      await axiosInstanseFormData
        .put(CHANGE_ICON, image)
        .catch((err) => console.log(err));
    },
    /**
     * Оновлює список ПУБЛІЧНИХ чатів, в яких знаходиться користувач, за його ID
     * 
     * @param {number} userId - ID користувача
     */
    async getUserPublicChats({ }, userId: number) {
      await axiosInstanse
        .get(USER_PUBLIC(userId))
        .then((res) => {
          this.commit("setPublicChatList", res.data.list);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 
     /**
    * Оновлює список ПРИВАТНИХ чатів, в яких знаходиться користувач, за його ID
    * 
    * @param {number} userId - ID користувача
    */
    async getUserPrivateChats({ }, userId: number) {
      await axiosInstanse
        .get(USER_PRIVATE(userId))
        .then((res) => {
          this.commit("setPrivateChatList", res.data.list);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
     * Повертає як promise дані користувача за його ID
     * 
     * @param {number} userId - ID чату
     * @promise дані користувача 
     */
    async getUser({ }, userId: number): Promise<IUser> {
      let user: IUser;
      await axiosInstanse
        .get(USER_DATA(userId))
        .then((res) => {
          user = res.data.user;
        })
        .catch((err) => console.log(err));
      return new Promise((resolve, reject) => {
        resolve(user);
      });
    },
        /**
     * Оновлює список знайдених користувачів за частиною імені
     * 
     * @param {string} username - записана частина імені користувача
     */
    async searchUsers({ }, username: string) {
      await axiosInstanse
        .get(SEARCH_USERS(username))
        .then((res) => {
          this.commit("setSearchUsersList", res.data.list);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
     * Змінює зображення чату
     * 
     * @param {number} chatId - ID чату
     * @param {FormData} image - файл зображення
     */
    async changeChatIcon({ }, {chatId, image}) {
      await axiosInstanseFormData
        .put(CHANGE_CHAT_ICON(chatId), image)
        .catch((err) => console.log(err));
    },
    /**
     * Оновлює списки усіх типів відносин користувача
     * (друзі, заблоковані, заблокували вас, запросили вас у друзі, 
     * отримали від вас запрошення)
     * 
     * @param {number} userId - ID користувача
     */
    async usersList({ }, userId: number) {
      await axiosInstanse
        .get(USERS_LIST(userId))
        .then((res) => {
          this.commit("setBlackList", res.data.blacklist);
          this.commit("setOnBlackLists", res.data.onBlacklist);
          this.commit("setSentInvitesList", res.data.invites);
          this.commit("setInvitationsList", res.data.requires);
          this.commit("setFriendsList", res.data.friends);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
     * Змінює статус відносин між активним користувачем та поданим у аргументі
     * на "запрошений у друзі"
     * 
     * @param {number} userId - ID користувача
     */
    async addToFriends({ }, userId: number) {
      await axiosInstanse
        .post(ADD_FRIEND(userId))
        .then(() => {
          this.dispatch("usersList", this.state.userId);
        })
        .catch((err) => {
          console.log(err);
        });
    },
        /**
     * Видаляє статус відносин між активним користувачем та поданим у аргументі
     * "запрошений у друзі"
     * 
     * @param {number} userId - ID користувача
     */
    async cancelInvite({ }, userId: number) {
      await axiosInstanse
        .delete(CANCEL_INVITE(userId))
        .then(() => {
          this.dispatch("usersList", this.state.userId);
        })
        .catch((err) => {
          console.log(err);
        });
    },
        /**
     * Змінює статус відносин між активним користувачем та поданим у аргументі
     * з "запрошений у друзі" на "друзі"
     * 
     * @param {number} userId - ID користувача
     */
    async acceptInvite({ }, userId: number) {
      await axiosInstanse
        .put(ACCEPT(userId))
        .then(() => {
          this.dispatch("usersList", this.state.userId);
        })
        .catch((err) => {
          console.log(err);
        });
    },
            /**
     * Видаляє статус відносин між поданим у аргументі та активним користувачами 
     * "запрошений у друзі"
     * 
     * @param {number} userId - ID користувача
     */
    async refuseInvite({ }, userId: number) {
      await axiosInstanse
        .delete(REFUSE(userId))
        .then(() => {
          this.dispatch("usersList", this.state.userId);
        })
        .catch((err) => {
          console.log(err);
        });
    },
            /**
     * Змінює статус відносин між активним користувачем та поданим у аргументі
     * на "заблокований"
     * 
     * @param {number} userId - ID користувача
     */
    async addToBlackList({ }, userId: number) {
      await axiosInstanse
        .post(ADD_TO_BL(userId))
        .then(() => {
          this.dispatch("usersList", this.state.userId);
        })
        .catch((err) => {
          console.log(err);
        });
    },
                /**
     * Видаляє статус відносин між поданим у аргументі та активним користувачами 
     * "заблокований"
     * 
     * @param {number} userId - ID користувача
     */
    async deleteFromBlackList({ }, userId: number) {
      await axiosInstanse
        .delete(DELETE_FROM_BL(userId))
        .then(() => {
          this.dispatch("usersList", this.state.userId);
        })
        .catch((err) => {
          console.log(err);
        });
    },
                /**
     * Видаляє статус відносин між поданим у аргументі та активним користувачами 
     * "друзі"
     * 
     * @param {number} userId - ID користувача
     */
    async deleteFriend({ }, userId: number) {
      await axiosInstanse
        .delete(DELETE_FRIEND(userId))
        .then(() => {
          this.dispatch("usersList", this.state.userId);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
     * Підключає користувача до кімнати синхроного виконання функцій  
     * 
     * @param {number} chatId - ID користувача
     */
    openWebsocket({ }, chatId: number) {
      this.commit("openWebsocket", chatId);
      console.log("socket action")
      this.state.socket.onmessage = (msg: any) => {
        this.dispatch("getNewMessage", chatId);
        // this.dispatch('getStarted')
      };
    },
    /**
     * Створює новий ПУБЛІЧНИЙ чат
     * 
     * @param {string} name - назва чату
     */
    async createPublicChat({ }, name: string) {
      await axiosInstanse
        .post(CREATE_PUBLIC_CHAT, {
          "name": name,
        })
        .then((res) => {
          this.dispatch("getUserPublicChats", res.data.id);

        })
        .catch((err) => console.log(err));
    },
    /**
     * Створює ПРИВАТНИЙ чат (якщо його ще нема)
     * та оновлює список повідомлень
     * 
     * @param {number} userId - ID користувача
     * @returns ID чату
     */
    async createPrivateChat({ }, userId: number) {
      let chatId: number;
      await axiosInstanse
        .get(CREATE_PRIVATE_CHAT(userId))
        .then((res) => {

          // this.commit("setChatMessages", res.data.messages);
          this.commit('setChatId', res.data.chatId)
          this.dispatch('getLimitChatMessages', {
            chatId: res.data.chatId,
            limit: 5
          })
          chatId = res.data.chatId;
        })
        .catch((err) => {
          console.log(err);
        });
      return new Promise((resolve, reject) => {
        resolve(chatId);
      });
    },
    async getUserPersonalChatId({ }) {
      let chatId: number;
      await axiosInstanse
        .get(CREATE_PRIVATE_CHAT(this.state.userId))
        .then((res) => {
          chatId = res.data.chatId;
        })
        .catch((err) => {
          console.log(err);
        });
      return new Promise((resolve, reject) => {
        resolve(chatId);
      });
    },
    /**
     * Повертає дані чату за його ID
     * @param {number} chatId - ID чату 
     * @returns дані чату
     */
    async getChat({ }, chatId: number): Promise<IChat> {
      let chat: IChat;
      await axiosInstanse
        .get(GET_CHAT(chatId))
        .then((res) => {
          chat = res.data.chat;
        })
        .catch((err) => console.log(err));
      return new Promise((resolve, reject) => {
        resolve(chat);
      });
    },
    /**
     * Повертає дані чату та (якщо чат ПРИВАТНИЙ) дані користувача
     * 
     * @param {number} chatId - ID чату 
     * @returns user та chat - дані користувача та чату
     */
    async getById({ }, chatId: number): Promise<object> {
      let data: object;
      await axiosInstanse
        .get(GET_BY_ID(chatId))
        .then((res) => {
          this.commit('setChatId', res.data.chat.id)
          data = res.data;
        })
        .catch((err) => console.log(err));
      return new Promise((resolve, reject) => {
        resolve(data);
      });
    },
    /**
     * Повертає список користувачів чатом та їх кількість
     * 
     * @param {number} chatId - ID чату 
     * @returns list та size - список користувачів чатом та їх кількість
     */
    async getChatUsers({ }, chatId: number) {
      let data:{
        list: IUser[],
        size: number
      } 
      await axiosInstanse
        .get(GET_USERS(chatId))
        .then((res) => {
          data = {
            list: res.data,
            size: res.data.length
          }
        })
        .catch((err) => console.log(err));
      return new Promise((resolve, reject) => {
        resolve(data);
      });
    },
    /**
     * Додає користувача до чату
     * 
     * @param {number} userId - ID користувача 
     * @param {number} chatId - ID чату 
     */
    async addUserToChat({ }, { userId, chatId }) {
      console.log(userId, chatId)
      await axiosInstanse
        .post(ADD_TO_CHAT(chatId), {
          "user_id": userId,
        }).then(() => {
          this.dispatch("usersList", this.state.userId);
        })
        .catch((err) => {
          console.log(err);
        });
    },
        /**
     * Видаляє користувача з чату
     * 
     * @param {number} userId - ID користувача 
     * @param {number} chatId - ID чату 
     */
    async deleteUserFromChat({ }, { userId, chatId }) {
      await axiosInstanse
        .put(DELETE_FROM_CHAT(chatId), {
          "user_id": userId,
        })
        .catch((err) => {
          console.log(err);
        });
    },
            /**
     * Видаляє  чат
     *  
     * @param {number} chatId - ID чату 
     */
    async deleteСhat({ }, chatId: number) {
      await axiosInstanse
        .delete(DELETE_CHAT(chatId))
        .then((res) => {
          this.dispatch("getUserPublicChats", this.state.userId);
          this.dispatch("getUserPrivateChats", this.state.userId);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
     * Оновлює список знайдених чатів за частиною назви
     * 
     * @param {string} name - частина назви чату
     */
    async searchChats({ }, name: string) {
      await axiosInstanse
        .get(SEARCH_CHAT(name))
        .then((res) => {
          this.commit("setSearchChatsList", res.data.list);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
     * Оновлює список повідомлень чату
     * 
     * @param {number} chatId - ID чату 
     */
    async getChatMessages({ }, chatId: number) {
      await axiosInstanse
        .get(GET_MESSAGES(chatId))
        .then((res) => {
          this.commit("setChatMessages", res.data.list);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getNewMessage({ }, chatId: number) {
      await axiosInstanse
        .get(GET_LIMIT_MESSAGES(chatId, 1))
        .then((res) => {
          this.commit('setPushMessage', res.data.list[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
     * Повертає список повідомлень чату
     * 
     * @param {number} chatId - ID чату 
     * @param {number} limit - кількість
     */  
    async getLimitChatMessages({ }, {chatId, limit}:{chatId: number, limit: number}) {
      // let data: IMessage[];
      await axiosInstanse
        .get(GET_LIMIT_MESSAGES(chatId, limit))
        .then((res) => {
          this.commit("setChatMessages", res.data.list);
        
          // data = res.data.list;
        })
        .catch((err) => {
          console.log(err);
        });
        // return new Promise((resolve, reject) => {
        //   resolve(data);
        // });
    },
    /**
     * Створює повідомлення та оновлює список повідомлень чату
     * @param {number} chatId - ID чату 
     * @param {string} text - текст повідомлення 
     */
    async createMessage({ }, { chatId, text }) {
      await axiosInstanse
        .post(CREATE_MESSAGE(chatId), {
          "text": text,
        })
        // .then((res) => {
        //   this.dispatch("getNewMessage", chatId);
        // })
        .catch((err) => console.log(err));
    },
  },
  modules: {},
});
