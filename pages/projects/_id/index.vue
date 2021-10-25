<template>
  <div>
    <ProjectHeader />
    <nuxt-child name="balloon"/>
  </div>
</template>
<script>
import firebase from 'firebase'
// import BalloonList from '~/components/projects/BalloonList'
import ProjectHeader from '~/components/projects/ProjectHeader'


export default {
  components: {
    ProjectHeader,
    // BalloonList
  },
  data() {
    return {
      project:{}
    }
  },
  async fetch(context) {
    const db = firebase.firestore()
    const doc = db.collection('projects').doc(context.route.params.id)
    let result;

    await doc.get()
      .then(function(doc) {
        if (doc.exists) {
          result = {
            id: doc.id,
            title: doc.data().title,
            overView: doc.data().overView
          }
        }
        context.store.commit('fetchProject', result)
      })
      .catch(function(error) {
        alert('Error getting document:', error)
      })
  }
}
</script>