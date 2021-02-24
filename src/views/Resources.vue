<template>
    <v-card height="100%"> 
        <v-toolbar dense color="secondary" rounded="0" dark>
                <!-- Action on resources -->
                <v-btn  color="info" small depressed @click="searchResource"><v-icon>mdi-magnify</v-icon>Search</v-btn>     
                <!-- <v-spacer></v-spacer> -->
                <template v-if="currentTab==items[0]">
                    <v-subheader>Name:</v-subheader>
                    <v-text-field  style="width:210px" class="shrink mx-2" color="green"  single-line hide-details dense v-model="resourceName" @keypress="isAccepted" maxlength="32"></v-text-field>
                    <v-subheader>Odate:</v-subheader>
                    <v-text-field  label="YYYYMMDD" style="width:150px" class="shrink mx-2" color="green" maxlength="8"  single-line hide-details dense></v-text-field>
                    
                </template>
                <template v-if="currentTab==items[1]">
                    <v-subheader>Name:</v-subheader>
                    <v-text-field  style="width:210px" class="shrink mx-2" color="green"  single-line hide-details dense></v-text-field>
                </template>
                
                <v-spacer></v-spacer>
                <add-ticket />
                <v-btn  color="button" depressed small>Add Flag <v-icon>{{icons.mdiFlagPlusOutline}}</v-icon></v-btn>
                
                <!-- Action on resources -->
        </v-toolbar>  

            <v-tabs height="32" color="primary" >
                <v-tab v-for="item in items" :key="item" @change="tabChange(item)" dark class="text-capitalize">
                {{ item }}
                </v-tab>
                <v-tab-item>
                    <tickets-component :filterName="resourceName"/>
                </v-tab-item>
                <v-tab-item>
                    <flags-component/>
                </v-tab-item>
            </v-tabs>
            <v-snackbar v-model="showmsg"  :color="msgcolor" :timeout="timeout" >{{ resultmsg }}</v-snackbar>
    </v-card>
</template>

<script>

import TicketsComponent from '@/components/TicketsComponent.vue'
import FlagsComponent from '@/components/FlagsComponent.vue'
import AddTicket from '@/components/AddTicket.vue'
import { mdiFlagPlusOutline } from '@mdi/js';
import { mdiBookmarkPlusOutline } from '@mdi/js';
import {ticketAddProvider,ticketRemoveProvider,ticketListProvider} from '../msg/provider'

export default {
  name: 'Resources',
  components: {
    TicketsComponent,
    FlagsComponent,
    AddTicket

  },
  data(){
      return{
          icons:{
              mdiFlagPlusOutline,
              mdiBookmarkPlusOutline
          },
        currentTab : "",
        items : ['Tickets','Flags'],
        resourceName : "",
        odateValue :"",
        timeout : 3000,
        resultmsg : "",
        msgcolor : "",
        showmsg : false,
      }
  },
  methods :{
      tabChange(name){
          this.currentTab = name
      },
      isNumeric(evt){
            evt = (evt) ? evt : window.event;
            var chr = String.fromCharCode(evt.keyCode)
            if (/[\d*?]/.test(chr)) return true;
            evt.preventDefault()

     },
     isAccepted(evt){
         evt = (evt) ? evt : window.event;
         var chr = String.fromCharCode(evt.keyCode)
         if (/[\w-*?]/.test(chr)) return true;

         evt.preventDefault()
     },
     onTicketAction(e,data){
          if (data && data.stack && data.message){
                this.msgcolor = "error"
                this.resultmsg = data
                this.showmsg = true
                return
            }

             if (data.success != true){
                this.msgcolor = "error"
                this.resultmsg = data.message
                this.showmsg = true
                return
            }

            this.msgcolor = "success"
            this.resultmsg = data.message
            this.showmsg = true

            ticketListProvider.Send()
     },
     searchResource(){
         
     }
  },
  mounted : function(){
      this.currentTab = this.items[0];
      ticketAddProvider.Listen(this.$options.name,this.onTicketAction)
      ticketRemoveProvider.Listen(this.$options.name,this.onTicketAction)
    }

}
</script>
