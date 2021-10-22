<template>
  <ProjectHeader :project="project"/>
</template>
<script>
import firebase from 'firebase'
import ProjectHeader from '~/components/projects/ProjectHeader'

export default {
  components: {
    ProjectHeader
  },
  data() {
    return {
      project:{}
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    fetch() {
      const self = this
      const db = firebase.firestore()
      const doc = db.collection('projects').doc(this.$route.params.id)

      doc.get()
        .then(function(doc) {
          if (doc.exists) {
            self.project = {...self.project,
            id: doc.id,
            title: doc.data().title,
            overView: doc.data().overView,
              copyAndPasteList: {
                  content:doc.data().copyAndPasteList.content,
                  discription: doc.data().copyAndPasteList.discription,
                  order:doc.data().copyAndPasteList.order
              }
            }
          }
        })
        .catch(function(error) {
         alert('Error getting document:', error)
       })
    }
  }
}
</script>