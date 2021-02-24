<template>
<div>

  <v-list dense nav v-if="getState">
        <v-list-item to="/pool">
          <v-list-item-icon><v-icon>mdi-cogs</v-icon></v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title >Active pool</v-list-item-title>
          </v-list-item-content>
      </v-list-item>

      <v-list-item to="/res">
          <v-list-item-icon><v-icon>mdi-format-list-checks</v-icon></v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title >Resources</v-list-item-title>
          </v-list-item-content>
      </v-list-item>

    <v-list-item to="/defs">
          <v-list-item-icon><v-icon>mdi-lead-pencil</v-icon></v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title >Definitions</v-list-item-title>
          </v-list-item-content>
      </v-list-item>
      

     <v-divider></v-divider>
      <v-list-item link to="/admin">
          <v-list-item-icon><v-icon>mdi-account-supervisor</v-icon></v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item link @click="signOut()">
          <v-list-item-icon style="center"><v-icon>mdi-logout-variant</v-icon></v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Sign out</v-list-item-title>
          </v-list-item-content>
      </v-list-item>

  </v-list>

  <v-list dense nav v-if="!getState">
      <v-list-item link to="/">
          <v-list-item-icon><v-icon>mdi-star</v-icon></v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title @click="fillForm(connection)">{{ connection }}</v-list-item-title>
          </v-list-item-content>
      </v-list-item>
  </v-list>
</div>


</template>
<script>
import {ipcRenderer} from 'electron'
import {signOnState} from '../data/state.js'
import { result,memIsConnected,memGet } from '../msg/messages'

export default {
    name : "Navigator",
    data :() =>{
        return {
            connection : ""
        }
    },
    computed:{
        getState(){
            return signOnState.connected
        }

    },
    methods :{
        recentConnection(e,data){
            if (data !== undefined){
                this.connection = data.conn
            }
            
        },
        signOut(){
            signOnState.connected = false
            this.$router.push('/')
            ipcRenderer.send('msg-mem-connected',false)
            console.log("sign out")
         
        },
        fillForm(data){
            this.$root.$emit("connection-selected",data)
        }
    },
    mounted:function(){
        ipcRenderer.on(result(memGet),this.recentConnection)
        ipcRenderer.send(memGet,{key : "connection"})
        //gets status from store if connection was established
        ipcRenderer.send(memIsConnected,{})
        ipcRenderer.on(result(memIsConnected),(e,data)=>{

            if (data === undefined){
                return 
            }
            if (data == true){
                signOnState.connected  = true
            }
            
        })
    
    }

}
</script>

<style>
.white{
    color: white;
}
</style>