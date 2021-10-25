<template>
    <div>
      <v-card
        class="mx-auto"
        max-width="344"
        outlined
        v-for="balloon in balloons" :key="balloon.id"
      >
          <v-card-text>
            <div class="text-overline mb-4">
              {{ balloon.title }}
            </div>
            <v-list-item-title class="text-h5 mb-1 copy-text">
              {{ balloon.content }}
            </v-list-item-title>
          </v-card-text>

        <v-card-actions>
          <v-btn
            outlined
            rounded
            text
          >
            <v-icon
            @click="copyAndCheckEffect">mdi-content-copy</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </template>
  <script>
  
  export default {
    data() {
    return {
      balloons:[]
    }
  },
  created() {
    this.balloons = this.$store.state.balloons
  },
  methods: {
    copyAndCheckEffect() {
        console.log(this.$refs["copy-text"].textContent)
        }
  }
}
</script>