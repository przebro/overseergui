<template>
  <v-card>
      <v-card-title dense height="24" color="button" class="caption" dark><v-icon color="warning">mdi-alert</v-icon> Are you sure?</v-card-title>
      <v-card-text>{{data}}? </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn small @click="cancel()" text color="error">Cancel</v-btn>
        <v-btn small @click="submit()" text color="success">Confirm</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
    props :{
        data : String,
        item : String,
        type : String,
    },
    methods:{
        cancel(){
            this.$emit('onCancel',"")
        },
        submit(){
             this.$emit('formSubmitted',this.type,this.item)
        }
    }

}
</script>

<style>

</style>