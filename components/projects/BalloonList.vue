<template>
    <v-container>
      <div v-for="balloon in balloons" :key="balloon.id">
        <Balloon :balloon="balloon"/>
      </div>
    </v-container>
  </template>
  <script>
import Balloon from './Balloon'
  
  export default {
    components:{
      Balloon
    },
    data() {
    return {
      balloons:[]
    }
  },
  created() {
    this.balloons = this.$store.state.balloons
  }
}
</script>