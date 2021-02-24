<template>
  <v-card height="80vh" style="overflow-y:hidden">
    <entity-component :items="users" type="Users" @selectItem="selectEntity"  @deleteItem="deleteEntity"/>
    <user-details v-show="enabled" :userdata="udetails"  :roles="roles" @change="onUserModify"   />
  </v-card>
</template>

<script>
import {ipcRenderer} from 'electron'
import EntityComponent from './EntityComponent.vue'
import UserDetails from './UserDetails.vue'
import {roleListProvider,userListProvider,userGetProvider} from '../../msg/provider'

export default {
  components: { EntityComponent, UserDetails },
    name : "UsersSettings",
    data(){
        return {
          currentIndex : -1,
          users : [],
          roles : [],
          udetails : {username :"",fullname :"",roles :[],enabled : false,email : ""},
          selected : -1,

        }
    },
    computed:{
      enabled(){        
        return this.currentIndex >=0
      }
    },
    methods:{
      selectEntity(item,idx){
        
        this.selected = idx
        userGetProvider.Send({username : item})

      },
      deleteEntity(item){
        
        this.selected = -1;
        this.currentIndex = -1;
        this.$emit('delete',{username : item})
      },
      onUserListResult(e,data){

          if (!Array.isArray(data.entity)){
              return
          }

          this.users = data.entity
      },
      onUserGetResult(e,data){
          
          if (data.user !== undefined){
              this.udetails = data.user
              this.currentIndex = this.selected
          }
      },
      onUserModify(data){
          ipcRenderer.send('msg-user-modify',data)

      },
      onUserModifyResult(e,data){
          console.log(data)
          userListProvider.Send()
      },
      onRoleListResult(e,data){

          if (!Array.isArray(data.entity)){
              return
          }

          this.roles = []
        
          data.entity.forEach((v,i) =>{
              this.roles.push({name : v.name,description : v.description,index : i, selected : false})
          })
      },

    },
    mounted(){

      let $name = this.$options.name
      roleListProvider.Listen($name,this.onRoleListResult)
      roleListProvider.Send()

      userListProvider.Listen($name,this.onUserListResult);
      userListProvider.Send()
    
      userGetProvider.Listen($name,this.onUserGetResult)
      
      ipcRenderer.on('msg-user-modify-result',this.onUserModifyResult)

    },
    beforeDestroy(){
        let $name = this.$options.name
        
        roleListProvider.StopListen($name)
        userListProvider.StopListen($name)
        userGetProvider.StopListen($name)

        ipcRenderer.removeListener('msg-user-modify-result',this.onUserModifyResult)
    }

}
</script>

<style>

</style>