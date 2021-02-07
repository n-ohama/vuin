export const state = () => {
  return {
    allUsers: [],
    userId: null
  }
}

export const mutations = {
  FETCH_ALLUSERS(state, users){
    state.allUsers = users
  },
  HAVE_MYID(state, myId){
    state.userId = myId
  }
}

export const actions = {
  async getAllUsers({commit, state}){
    const db = this.$fb.firestore()
    if(!state.userId) commit("HAVE_MYID",sessionStorage.getItem('vuin-your-id'))
    const result = await db.collection("users").where('id', '!=', state.userId).get()
    commit("FETCH_ALLUSERS",result.docs.map((d)=>d.data()))
  },
}