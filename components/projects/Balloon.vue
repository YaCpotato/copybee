<template>
<v-container>
    <v-card
    class="mx-auto"
    max-width="800"
    height="80"
    max-height="80"
    outlined
    >
    <v-row>
        <v-col cols="auto">
            <v-container>
                {{ balloon.title }}
            </v-container>
        </v-col>
        <v-col>
            <v-container>
                {{ balloon.content }}
            </v-container>
        </v-col>
        <v-col cols="auto">
            <v-card-actions>
                <v-btn
                class="ma-4"
                color="purple"
                @click="copyAndCheckEffect(balloon.content)"
                >
                <v-icon v-if="!justCopied">mdi-content-copy</v-icon>
                <v-icon v-else>mdi-check</v-icon>
                </v-btn>
            </v-card-actions>
        </v-col>
    </v-row>
    </v-card>
</v-container>
</template>
<script>
export default {
data() {
    return{
        justCopied:false
    }
},
props:{
    balloon: {
        type: Object,
        default:null
    }
},
    methods: {
        copyAndCheckEffect(text) {
            console.log(text)
            this.justCopied = true
            setInterval(function(){
                    this.justCopied = false
                }
            ,1000)
        }
    }
}
</script>