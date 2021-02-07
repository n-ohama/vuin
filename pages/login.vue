<template>
  <div>
    <a class="btn btn-light" @click="login">
      ログイン
    </a>
    <div class="alert alert-danger mt-5" v-if="errorMessage">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        errorMessage: null
      }
    },
    methods: {
      login(){
        const provider = new this.$fb.auth.GoogleAuthProvider()
        this.$fb.auth().signInWithPopup(provider)
          .then((result) => {
            const userData = {
              id: result.user.uid,
              name: result.additionalUserInfo.profile.given_name,
              email: result.additionalUserInfo.profile.email,
            }
            this.$fb.firestore().collection('users').doc(result.user.uid).set(userData)
            this.$router.push("/")
          }).catch(error => {
            this.errorMessage = error.message
          })
      }
    }
  }
</script>

<style>
</style>