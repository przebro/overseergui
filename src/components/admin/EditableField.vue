<template>
<div>
    <div v-if="isEdit == true"  class="text-left d-flex align-end" >
        <v-text-field :type="isPassword"  v-model="fieldValue" dense class="flex-grow-1" v-if="!password" :maxlength="max" />
        <div v-else class="flex-grow-1 justify-center">
            <v-text-field :type="isPassword"  v-model="fieldValue" dense :maxlength="max"  />
            <v-text-field :type="isPassword"  v-model="secondFieldValue" dense :maxlength="max" />
        </div>
        <div class="align-self-baseline d-inline-flex d-flex flex-column flex-shrink-1">
        <v-btn small icon text color="success" @click="submit()"><v-icon>mdi-check</v-icon></v-btn><v-divider vertical></v-divider>
        <v-btn small icon text color="error" @click="cancel()"><v-icon>mdi-cancel</v-icon></v-btn>
        </div>
    </div>
  <div v-else  class="text-left d-flex" >
      <div class="flex-grow-1">{{text}}</div>
      <v-btn small icon text color="success" @click="setEditable" class="align-self-baseline flex-shrink-1"><v-icon>mdi-pencil</v-icon></v-btn>
  </div>
</div>
</template>

<script>
export default {
    name : "EditableInput",
    props:['text','password','max'],
    data(){
        return{
            isEdit : false,
            fieldValue : "",
            secondFieldValue : "",

        }
    },
    computed:{
        isPassword(){
            return this.password == true?"password":"text";
        }
    },
    methods :{
            cancel(){
                this.isEdit = false
                this.fieldValue = ""
                this.secondFieldValue = ""
            },
            submit(){
                this.$emit('change',this.fieldValue,this.secondFieldValue)
                this.isEdit = false

            },
            setEditable(){
                this.isEdit = true
                this.fieldValue = this.password == true?"":this.text;
            }
     
    }
}
</script>

<style>

</style>