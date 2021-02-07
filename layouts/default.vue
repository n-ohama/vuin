<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-3">
      <div class="container">
        <router-link class="navbar-brand" to="/">Vuin</router-link>
        <router-link class="navbar-brand" to="/login">@</router-link>
        <a class="navbar-brand" @click="logout">Log out</a>
      </div>
    </nav>
    <div class="container">
      <Nuxt />
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      logout() {
        this.$fb.auth().signOut()
        this.$router.push("/login")
      },
    },
    mounted() {
      this.$fb.auth().onAuthStateChanged((user) => {
        if(user){
          this.$store.commit("HAVE_MYID",user.uid)
          sessionStorage.setItem('vuin-your-id',user.uid)
          console.log('session セット完了')
        }
      })
    }
  }
</script>

<style>
a {
  cursor: pointer;
}
.container {
  margin: 0 auto;
  max-width: 480px;
}
</style>