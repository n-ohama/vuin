<template>
  <div>
    <div class="alert alert-success mt-5">
      {{ $store.state.userId }}
    </div>
    <ul class="list-group list-group-flush">
      <li 
        class="list-group-item" 
        v-for="user in users" 
        :key="user.id" 
        @click="goTalkRoom(user.id)"
      >
        <div class="userlist">
          <div>{{ user.name }}</div>
          <div class="email">{{ user.email }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        roomForm: {
          firstid: null,
          secondid: null,
        },
        isThereRoom: false
      }
    },
    computed:{
      users(){
        return this.$store.state.allUsers
      }
    },
    methods: {
      async goTalkRoom(value) {
        let firstId
        let secondId
        if(value > this.$store.state.userId) {
          firstId = value
          secondId = this.$store.state.userId
        } else {
          firstId = this.$store.state.userId
          secondId = value
        }
        this.roomForm.firstid = firstId
        this.roomForm.secondid = secondId
        // firebase でfirstId と secondId の組み合わせのルームがあるか確認
        await this.$fb.firestore().collection('rooms')
          .where('firstid', '==', firstId)
          .where('secondid', '==', secondId)
          .get()
          .then(snapShot => {
            // 配列の数が0でなかったら、dataプロパティのisThereRoomをtrueに変える
            this.isThereRoom = snapShot.docs.length ? true : false
            if(snapShot.docs.length) this.$router.push(`/room/${snapShot.docs[0].id}`)
          })
        // isThereRoomがfalse(無かったら)だったら、roomを作る
        if(!this.isThereRoom) {
          await this.$fb.firestore().collection("rooms").add(this.roomForm)
        }
      },
    },
    mounted() {
      this.$store.dispatch("getAllUsers")
    },
  }
</script>

<style scoped>
.userlist { 
  display: flex;
  justify-content:space-between
}
.email {
  font-size: .7em;
}
</style>