<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">新しいプロジェクト</span>
    </v-card-title>
    <v-card-text>
      <v-form
        ref="form"
        lazy-validation
      >
        <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              label="プロジェクト名"
              :rules="nameRules"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="概要"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-form>     
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="blue darken-1"
        text
        @click="submit"
      >
        作成
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    overView: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length > 0) || 'プロジェクト名には必須です',
      ]
    }
  },
  methods: {
    submit() {
      if(this.$refs.form.validate()) {
        this.$emit('clickSubmit', {
          title: this.title,
          overView: this.overView
        })
      }
    }
  }
}
</script>