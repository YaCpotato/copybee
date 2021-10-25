<template>
  <v-app-bar
      color="deep-purple accent-4"
      dense
      dark
    >

      <v-toolbar-title>{{ project.title }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-app-bar>
</template>
<script>  
export default {
  data() {
    return {
      project:{}
    }
  },
  created() {
    this.project = this.$store.state.project
  }
}
</script>