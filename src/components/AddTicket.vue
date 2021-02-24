<template>

    <v-dialog v-model="isVisible" width="48 0">
      <template v-slot:activator="{ on, attrs }">
          <v-btn  color="button"  small depressed class="mx-2" v-bind="attrs" v-on="on">Add Ticket<v-icon>{{icons.mdiBookmarkPlusOutline}}</v-icon></v-btn>
      </template>
      <v-card tile>
         <v-divider></v-divider>
          <v-container fluid>
              <v-row no-gutters dense class="caption">
                  <v-col>Add Ticket</v-col>
              </v-row>
              <v-row no-gutters dense >
                  <v-col class="tex-left"><v-text-field class="small" placeholder="Ticket name" v-model="name" dense single-line outlined maxlength="24" /></v-col>
              </v-row>
              <v-row no-gutters dense >
                  <!-- <v-col class="tex-left"><v-text-field class="small"  placeholder="Odate YYYYMMDD" @keypress="isNumeric" v-model="odate" dense single-line outlined maxlength="8" /></v-col> -->
                  <v-col>
                   <v-menu v-model="dateMenu" :close-on-content-click="false">
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field class="small" style="margin-top:15px"  v-bind="attrs" v-model="odate"  v-on="on" dense single-line outlined label="YYYYMMDD"></v-text-field>
                      </template>
                      <v-date-picker v-model="selectedDate" no-title @input="dateMenu = false"></v-date-picker>
                   </v-menu>
                </v-col>
              </v-row>
          </v-container>

         <v-card-actions>
             <v-spacer></v-spacer>
             <v-btn tile depressed text @click="AddTicket()">Add</v-btn>
         </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>

import { mdiBookmarkPlusOutline } from '@mdi/js';
import {ticketAddProvider} from '../msg/provider'
export default {
    name : "AddTicket",
    data: function () {
        return{
            icons:{
                mdiBookmarkPlusOutline
            },
            name : "",
            odate:"",
            odateValue : "",
            dateMenu : false,
            isVisible : false,
            selectedDate :"",
        }
    },
    methods:{
         AddTicket() {
             this.isVisible = false
             ticketAddProvider.Send({name : this.name,odate : this.odate})
        },
        isNumeric(evt){
            evt = (evt) ? evt : window.event;
            var charCode = evt.keyCode
            if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                evt.preventDefault();
            } else {
                return true;
            }
        },
    },
      watch: {
       selectedDate (val) {
         this.odate = val.split('-').join('')
       }

  },

}
</script>

<style>
.small {
    transform: scale(0.875);
    transform-origin: left;
}
</style>