<template>
<v-card tile flat height="100%">
    <v-toolbar dense color="secondary" rounded="0" dark>

    <v-spacer></v-spacer>
        <v-btn  color="#4C8DAD" dark  small depressed class="mx-2" @click="openCreateUserDialog" >Add User<v-icon>{{icons.mdiAccountPlusOutline}}</v-icon></v-btn>     
        <v-btn  color="#4C8DAD" dark small depressed class="mx-2" @click="openCreateRoleDialog">Add Role<v-icon>{{icons.mdiAccountMultiplePlusOutline}}</v-icon></v-btn>     
    </v-toolbar>

    <v-dialog v-model="dialog" persistent width="640px" scrollable >
        <user-component v-if="component == 'users' " :userRoles="roles" :title="dialogTitle" @formSubmitted="onUserAdd" @onCancel="onCancel" />
        <role-component v-if="component == 'roles' " :title="dialogTitle" @formSubmitted="onRoleAdd" @onCancel="onCancel" />
        <confirm-dialog v-if="component == 'confirm' " :data="msg" :item="entity" :type="cards[currentTab].name" @onCancel="onCancel" @formSubmitted="onDeleteEntity" /> 
    </v-dialog>
    <v-tabs fixed-tabs  v-model="currentTab" height="32" @change="onTabChange">
        <v-tab v-for="(card) in cards" class="text-capitalize" :key="card.name" ><v-icon>{{card.icon}}</v-icon>{{card.name}}</v-tab>
    </v-tabs>
    <v-tabs-items v-model="currentTab">
        <v-tab-item  :key="cards[0].name">
            <users-settings @delete="openConfirmDeleteDialog"/>
        </v-tab-item>
        <v-tab-item  :key="cards[1].name">
            <roles-settings @delete="openConfirmDeleteDialog" />
        </v-tab-item>
    </v-tabs-items>
    <v-snackbar v-model="showmsg"  :color="msgcolor" :timeout="timeout" >{{ resultmsg }}</v-snackbar>
</v-card>
</template>
<style>

</style>
<script>

import {roleListProvider,
userCreateProvider,
roleCreateProvider,
userListProvider,
roleDeleteProvider,
userDeleteProvider} from '../msg/provider'
import UserComponent from '../components/UserComponent.vue'
import RoleComponent from '../components/RoleComponent.vue'
import ConfirmDialog from '../components/ConfirmDialog.vue'
import UsersSettings from '../components/admin/UsersSettings.vue'
import RolesSettings from '../components/admin/RolesSettings.vue'
import { mdiAccountPlusOutline } from '@mdi/js';
import { mdiAccountMultiplePlusOutline } from '@mdi/js';
import {isError} from '../common/func'

export default {
  name: 'Admin',
  components: {
    UserComponent,
    RoleComponent,
    ConfirmDialog,
    RolesSettings,
    UsersSettings,
    
  },
  data(){
      return{
          icons:{
              mdiAccountPlusOutline,
              mdiAccountMultiplePlusOutline
          },
        cards : [
            {name :'Users',icon : "mdi-account-outline"},
            {name :'Roles',icon :"mdi-account-group-outline"},
            {name : 'Settings', icon :"mdi-tune"}],
        dialog : false,
        dialogTitle  : "",
        component : "",
        currentTab : 0,
        currentIndex : -1,
        msg : "",
        item : "",
        entity : "",
        roles : [],
        timeout : 3000,
        resultmsg : "",
        showmsg : false,
        msgcolor : "",
      }
  },
  methods :{
      onTabChange(){
          if (this.cards[this.currentTab] == "Roles"){
              roleListProvider.Send()

          }
          if (this.cards[this.currentTab]== "Users"){
              userListProvider.Send()
          }
          
      },
      openCreateUserDialog(){
          this.dialogTitle = "Create User"
          this.component = "users"
          this.dialog = true
      },
      openCreateRoleDialog(){
          this.dialogTitle = "Create Role"
          this.component = "roles"
          this.dialog = true
      },
      onUserAdd(t,data){
          this.dialog = false;
          console.log("create")
          userCreateProvider.Send(data)
      },
      onRoleAdd(t,data){

          this.dialog = false;
          roleCreateProvider.Send(data)
      },
      onCancel(){
          this.dialog = false;
      },
      openConfirmDeleteDialog(entity){

          this.component = "confirm"
          let name = ""

          if (this.currentTab == 0){
              this.entity = entity.username
              name = entity.username
          }
          if (this.currentTab == 1){
              this.entity = entity.rolename
              name = entity.rolename
          }
          
          this.msg =  "Delete " + name+ " from " +  this.cards[this.currentTab].name.toLowerCase()
          this.dialog = true
      },
      onDeleteEntity(type,entity){
          console.log("delete from:",type," ",entity)
          if (type == this.cards[0].name){
              userDeleteProvider.Send({username : entity})
          }
          if (type == this.cards[1].name){
              roleDeleteProvider.Send({rolename : entity})
          }
          this.dialog = false;
      },
      onRoleListResult(e,data){
          
          if (isError(data)){
              console.log(data)
              return
          }
          if (!Array.isArray(data.entity)){
              console.error("expected string array")
          }

          this.roles = []
        
          data.entity.forEach((v,i) =>{
              this.roles.push({name : v.name,description : v.description,index : i, selected : false})
          })
      },
      onRoleDeleteResult(e,data){
          roleListProvider.Send()
          this.showMessage(data)

      },
      onUserDeleteResult(e,data){
          userListProvider.Send()
          this.showMessage(data)
      },
      onRoleCreateResult(e,data){
          roleListProvider.Send()
          this.showMessage(data)
      },
      onUserCreateResult(e,data){
          userListProvider.Send()
          this.showMessage(data)
      },
      showMessage(data){
          
          this.msgcolor = data.success == true? "success" : "error"
          this.resultmsg = data.message
          this.showmsg = true

      },
      onResize(e,data){   
          console.log(e,data)
      },
      
  },
  computed:{
      height: function(){
          return "min-height:"+ window.innerHeight - 10 + "px";
      },
  },
  mounted : function(){

    let $name = this.$options.name
    roleListProvider.Listen($name,this.onRoleListResult)
    userCreateProvider.Listen($name,this.onUserCreateResult)
    roleCreateProvider.Listen($name,this.onRoleCreateResult)
    roleDeleteProvider.Listen($name,this.onRoleDeleteResult)
    userDeleteProvider.Listen($name,this.onUserDeleteResult)


      //window.addEventListener('resize', this.onResize, { passive: true })
    },  
}
</script>