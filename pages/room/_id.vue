<template>
  <div class="room">
    <h1>this is Room page</h1>
    <div>{{ $route.params.id }}</div>
    <div class="room mt-3">
      <div 
        v-for="chat in roomTalking" 
        :key="chat.id"
        class="ourtalk"
        :class="{ 'mytalk' : chat.userid === $store.state.userId }"
      >
        <span>{{ chat.content }}</span>
      </div>
    </div>
    <div class="form">
      <input type="text" v-model="formText">
      <button @click="sendText">送信</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roomTalks: null,
      formText: null
    }
  },
  computed: {
    roomTalking() {
      return this.roomTalks
    }
  },
  methods: {
    sendText() {
      const sendData = {
        userid: this.$store.state.userId,
        roomid: this.$route.params.id,
        content: this.formText,
        createdAt: new Date()
      }
      this.formText = null
      this.$fb.firestore().collection('talks').add(sendData)
    }
  },
  mounted() {
    this.$fb.firestore().collection('talks')
      .where('roomid', '==', this.$route.params.id)
      .orderBy('createdAt', 'asc')
      .onSnapshot((querySnapshot) => {
          this.roomTalks = querySnapshot.docs.map((d)=>d.data())
        });
  }
}
</script>

<style scoped>

.ourtalk span {
  padding: 4px .8rem;
  display: inline-block;
  background-color: rgb(192, 207, 222);
  border-radius: 15px;
  margin-top: 3px;
  font-size: 14px;
}

.mytalk {
  text-align: right;
}
.mytalk span{
  background-color: rgb(0, 255, 115);
  text-align: right;
}

.form {
  position: absolute;
  bottom: 20px;
}
</style>