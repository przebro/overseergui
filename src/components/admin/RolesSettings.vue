<template>
<v-card height="80vh" style="overflow-y:hidden">
<entity-component :items="roles" type="Roles" @selectItem="selectEntity" @deleteItem="deleteEntity" />
 <role-details v-show="enabled" :roledata="rdetails" @change="onRoleModify"  />
</v-card>
</template>

<script>
import {ipcRenderer} from 'electron'
import RoleDetails from './RoleDetails.vue'
import EntityComponent from './EntityComponent.vue'
import {roleListProvider,roleGetProvider} from '../../msg/provider'

export default {
    components :{EntityComponent,RoleDetails},
    name : "RolesSettings",
    data(){
        return{
          currentIndex : -1,
          roles : [],
          selected : -1,
          rdetails : { role :{rolename : ""},description : ""}

        }
    },
    computed:{
      enabled(){        
        return this.currentIndex >=0
      }
    },
    methods:{
      selectEntity(item,idx){

         roleGetProvider.Send({rolename : item})
         this.selected = idx

      },
      deleteEntity(item){
        
        this.selected = -1;
        this.currentIndex = -1;
        this.$emit('delete',{rolename : item})
      },
      onRoleGetResult(e,data){
        
          this.rdetails = data.role
          this.currentIndex = this.selected
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
      onRoleModify(data){
        ipcRenderer.send('msg-role-modify',data)

      }
    },
    mounted(){

      roleListProvider.Listen(this.$options.name,this.onRoleListResult)
      roleListProvider.Send()


      roleGetProvider.Listen(this.$options.name,this.onRoleGetResult)
      
    },
    beforeDestroy : function(){

        roleListProvider.StopListen(this.$options.name)
        roleGetProvider.StopListen(this.$options.name)

    }
}
</script>

<style>

</style>