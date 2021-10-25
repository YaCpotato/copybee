import firebase from 'firebase'

export const state = () => ({
 user: {
   uid: '',
   email: '',
   login: false,
 },
 project: {
    id:null,
    title: '',
    overView: ''
 },
 balloons:[]
})

export const getters = {
 user: state => {
   return state.user
 },
 project: state => {
   return state.project
 },
 isAuthenticated: state => {
   return state.user.login
 }
}

export const actions = {
 login({ dispatch }, payload) {
   firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
     .then(user => {
         dispatch('checkLogin')
       }).catch((error) => {
         alert(error)
       })
 },
 loginGoogle ({ dispatch }) {
   const provider = new firebase.auth.GoogleAuthProvider()
   firebase.auth().signInWithPopup(provider).then(function (result) {
     dispatch('checkLogin')
   }).catch(function (error) {
    alert(error)
   })
 },
 checkLogin ({ commit }) {
   firebase.auth().onAuthStateChanged(function (user) {
     if (user) {
       commit('getData', { uid: user.uid, email: user.email })
       commit('switchLogin')
     }
   })
 },
}

export const mutations = {
 getData (state, payload) {
   state.user.uid = payload.uid
   state.user.email = payload.email
 },
 fetchProject(state, payload) {
    state.project.id = payload.id;
    state.project.title = payload.title;
    state.project.overView = payload.overView;
  },
  fetchBalloons(state, payload) {
    for (const balloon of payload) {
      state.balloons.push({
        id: balloon.id,
        title: balloon.title,
        content: balloon.content,
        discription: balloon.discription,
        order: balloon.order
      })
    }
  },
  switchLogin (state) {
    state.user.login = true
  },
}