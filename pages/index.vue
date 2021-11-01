<template>
  <v-app>
    <v-btn
          color="primary"
          dark
          @click.stop="openDialog = true"
        >
          Open Dialog
        </v-btn>
    <v-dialog
      v-model="openDialog"
      persistent
      max-width="600px"
    >
      <ProjectFormDialog
        @clickSubmit="onSubmit"
        :title="title"
        :over-view="overView" />
    </v-dialog>
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
              <v-btn
                @click="openProject(project.id)"
              >
              開く
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <nuxt-child />
  </v-app>
</template>
<script>
import firebase from 'firebase'
import ProjectFormDialog from '~/components/ProjectFormDialog'

export default {
  components: {
    ProjectFormDialog
  },
  data () {
    return {
      database: null,
      projects:[],
      openDialog: false,
      title:"",
      overView:""
    }
  },
  mounted() {
  this.getData()
  },
  methods: {
    openProject(projectId) {
      const db = firebase.firestore()
      const projectRef = db.collection("projects").doc(projectId)
      projectRef.get().then((doc)=>{
        if (doc.exists) {
          this.$store.commit('fetchProject', doc.data())
        }
        this.$router.push("/projects/" + projectId)
      })
      .catch( (error) => {
          console.log(`データを取得できませんでした (${error})`);
      });
    },
    onSubmit () {
    this.openDialog = false
     const db = firebase.firestore()
     const dbUsers = db.collection('projects')
     dbUsers
        .add({
          title: this.title,
          overView: this.overView
       })
       .then(ref => {
         this.title = ""
         this.overView = ""
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
          overView: doc.data().overView
        })
      })
      this.projects = itemArray
      this.projects.splice()
    })
  }
}
}
</script>