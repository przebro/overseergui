<template>
      <v-dialog v-model="isVisible" width="480">
      <template v-slot:activator="{ on, attrs }">
          <v-btn  color="button"  small depressed class="mx-2" v-bind="attrs" v-on="on">Add Flag<v-icon>{{icons.mdiFlagPlusOutline}}</v-icon></v-btn>
      </template>
      <v-card tile>
         <v-divider></v-divider>
          <v-container fluid>
              <v-row no-gutters dense class="caption">
                  <v-col>Add Flag</v-col>
              </v-row>
              <v-row no-gutters dense >
                  <v-col class="tex-left"><v-text-field class="small" placeholder="Flag name" v-model="flagname" dense single-line outlined maxlength="24" /></v-col>
              </v-row>
              <v-row no-gutters dense>
                  <v-col class="tex-left"><v-select class="small" v-model="flagtype" dense outlined single-line label="Type" :items="ftype"/></v-col>
              </v-row>
          </v-container>

         <v-card-actions>
             <v-spacer></v-spacer>
             <v-btn tile depressed text @click="AddFlag()" :disabled="isDisabled == true">Add</v-btn>
         </v-card-actions>

      </v-card>
      </v-dialog>
</template>

<script>
import { mdiFlagPlusOutline } from '@mdi/js';
import {flagAddProvider} from '../msg/provider'
export default {
    name :"AddFlag",
    data(){
        return {
            icons:{
                mdiFlagPlusOutline
            },
            ftype :[{text :"SHR",value : 0},{text:"EXL",value : 1}],
            flagname : "",
            flagtype : 0,
            isVisible : false,

        }
    },
    computed:{
        isDisabled(){
            if (this.flagname == ""){
                return true
            }
            return false
        }
    },
    methods:{
        AddFlag(){
     
            this.isVisible = false
            flagAddProvider.Send({name : this.flagname,state : this.flagtype})
        }
    }

}
</script>

<style>

</style>