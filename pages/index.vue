<template>
  <div class="container">
    <v-btn @click="submit"></v-btn>
    <v-simple-table
    fixed-header
    height="600px">
      <template #default>
        <thead>
          <tr>
            <th class="text-left">
              title
            </th>
            <th class="text-left">
              overView
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="project in projects"
            :key="project.id"
          >
            <td>{{ project.title }}</td>
            <td>{{ project.overView }}</td>
            <td>
              <v-btn>
                <nuxt-link :to="`/projects/${project.id}`">開く</nuxt-link>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <nuxt-child />
  </div>
</template>
<script>
import firebase from 'firebase'

export default {
  data () {
    return {
      database: null,
      projects:[]
    }
  },
  mounted() {
  this.getData()
  },
  methods: {
    submit () {
     const db = firebase.firestore()
     const dbUsers = db.collection('projects')
     dbUsers
        .add({
          title: "sample title",
          overView:"sample overview",
          copyAndPasteList: {
            content:"sample content",
            discription: "sample discription",
            order:0
          }
       })
       .then(ref => {
         // eslint-disable-next-line no-console
         console.log('Add ID: ', ref.id)
       })
   },
   getData() {
    const db = firebase.firestore()
    const itemArray = []
    db.collection('projects').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        itemArray.push({
          id: doc.id,
          title: doc.data().title,
          overView: doc.data().overView,
          copyAndPasteList: {
            content: doc.data().copyAndPasteList.content,
            discription: doc.data().copyAndPasteList.discription,
            order:doc.data().copyAndPasteList.order
          }
        })
      })
      this.projects = itemArray
      this.projects.splice()
    })
  }
}
}
</script>