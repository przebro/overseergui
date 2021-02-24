<template>
  <v-dialog v-model="isVisible" width="540">
      <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs"  v-on="on" style="margin-left:2px"   color="button"  small depressed>Order Task<v-icon >{{icons.mdiCogClockwise}}</v-icon></v-btn>
      </template>
      <v-card tile>
         <v-divider></v-divider>
          <v-container fluid>
              <v-row no-gutters dense class="caption">
                  <v-col>OrderTask</v-col>
              </v-row>
              <v-row no-gutters dense>
                  <v-col class="tex-left"><v-select class="small" dense outlined single-line label="Group" :items="groups" @change="fetchTaskList" /></v-col>
                  <v-col  class="tex-left"><v-select v-if="groupOrder == false" class="small" dense outlined single-line label="Task" item-text="taskName" :items="definitions" v-model="selectedDefinition"  return-object /></v-col>
              </v-row>
              <v-row no-gutters dense>
                <v-col><v-switch dense label="Order Group" v-model="groupOrder"></v-switch></v-col>
              </v-row>
              <v-row no-gutters dense>
                  <v-col><v-divider/> </v-col>
              </v-row>
              <v-row no-gutters dense>
                <v-col cols="7">
                   <v-radio-group v-model="odateValue" mandatory row>
                     <v-radio class="small" label="Current Odate" value="current" />
                     <v-radio class="small" label="Selected" value="selected" />
                   </v-radio-group>
                </v-col>
                <v-col>
                   <v-menu v-model="dateMenu" :close-on-content-click="false">
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field class="small" style="margin-top:15px"  v-bind="attrs" v-model="odate"  v-on="on" dense single-line label="YYYYMMDD" :disabled="odateValue =='current'"></v-text-field>
                      </template>
                      <v-date-picker v-model="selectedDate" no-title @input="dateMenu = false"></v-date-picker>
                   </v-menu>
                </v-col>
              </v-row>
              <v-row no-gutters dense>
                <v-col><v-switch dense label="Force" v-model="force"></v-switch></v-col>
              </v-row>
          </v-container>
          <v-card-actions>
             <v-spacer></v-spacer>
             <v-btn tile depressed text @click="OrderTask()" :disabled="isDisabled == true">Order</v-btn>
         </v-card-actions>
      </v-card>
  </v-dialog>
</template>

<script>
import { mdiCogClockwise } from '@mdi/js';
import {definitionOrderProvider} from '../msg/provider'
import {getCurrentOdate} from '../common/func'
export default {
  name: "OrderTask",
  props:["groups","definitions"],
  data(){
    return{
      isVisible : false,
      selectedDefinition : Object(),
      force : false,
      odate :"",
      dateMenu : false,
      groupOrder : false,
      selectedGroup : "",
      selectedDate :"",
      odateValue : "",
      icons:{
        mdiCogClockwise
      }
    }
  },
  watch: {
      isVisible(visible){
        if (visible){
          this.$emit('opened')
        }
      },
       selectedDate (val) {
         this.odate = val.split('-').join('')
       }

  },
  computed:{
    isDisabled(){
      let dateSelected = this.odateValue == "current" || this.odateValue == "selected" && this.odate != ""

      if (this.groupOrder == true && this.selectedGroup !== "" && dateSelected){
        return false
      }else if (this.selectedDefinition.groupName !== undefined && this.selectedDefinition.taskName!== undefined && dateSelected){
        return false
      }
      return true
    }
  },
  methods:{
    fetchTaskList(groupname){
        this.selectedDefinition = Object();
        this.selectedGroup = groupname
        this.$emit('groupChange',groupname);
    },
    OrderTask(){
      let odat = this.odateValue == "current" ? getCurrentOdate():this.odate;

      if (this.groupOrder!=true){
        let data = {taskGroup : this.selectedDefinition.groupName,taskName:this.selectedDefinition.taskName,odate :odat}
        if (this.force){
          definitionOrderProvider.ForceDefinition(data)
        }else{
          definitionOrderProvider.OrderDefinition(data)
        }

      }else{
        let data = {taskGroup : this.selectedGroup,odate :odat}
        if (this.force){
          definitionOrderProvider.ForceGroup(data)
        }else{
          definitionOrderProvider.OrderGroup(data)
        }
      }

      this.isVisible = false
    },
  }
}
</script>

<style>

</style>