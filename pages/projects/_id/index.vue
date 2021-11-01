<template>
    <div>
      <ProjectHeader />
      <BalloonList />
    </div>
  </template>
  <script>
  import firebase from 'firebase'
  import BalloonList from '~/components/projects/BalloonList'
  import ProjectHeader from '~/components/projects/ProjectHeader'
  
  
  export default {
    components: {
      ProjectHeader,
      BalloonList
    },
    async fetch(context) {
      const db = firebase.firestore()
      const result = [];
      await db.collection('balloons')
        .where("project_id", "==", context.route.params.id)
        .get()
        .then(function(querySnapshot) {
            console.log(querySnapshot)
            querySnapshot.forEach((doc) => {
                result.push({
                    id:doc.id,
                    title: doc.data().title,
                    content: doc.data().content,
                    discription: doc.data().discription,
                    order:doc.data().order
                })
            })
            context.store.commit('fetchBalloons', result)
        })
        .catch(function(error) {
            console.log(error)
            alert('Error getting document:', error)
        })
    },
    methods: {
        submit () {
            const db = firebase.firestore()
            const dbUsers = db.collection('balloons')
            dbUsers
                .add({
                title: "sample title",
                content:"sample overview",
                discription:"sample",
                project_id:"EJeUplBijq2rC16smpSO",
                order:0
            })
            .then(ref => {
                // eslint-disable-next-line no-console
                console.log('Add ID: ', ref.id)
            })
        },   
    }
  }
  </script>