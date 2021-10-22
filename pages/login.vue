<template>
  <div>
    <v-banner>
      <v-avatar
        slot="icon"
        color="deep-purple accent-4"
        size="40"
      >
        <v-icon
          icon="mdi-account"
          color="white"
        >
        mdi-account
        </v-icon>
      </v-avatar>
  
      このサービスは現在Googleアカウントでの登録が可能です
  
      <template v-slot:actions>
        <v-btn
          text
          color="deep-purple accent-4"
          @click="loginGoogle"
        >
          Googleでログイン
        </v-btn>
        <v-btn
          text
          color="deep-purple accent-4"
        >
          キャンセル
        </v-btn>
      </template>
    </v-banner>
  </div>
</template>
<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      }
    },
    methods : {
      login (email, password) {
        this.$store.dispatch('login', {email: this.email, password: this.password})
      },
      loginGoogle () {
        this.$store.dispatch('loginGoogle')
      }
    }
}
</script>