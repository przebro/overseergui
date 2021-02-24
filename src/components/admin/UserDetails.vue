<template>
  <v-card height="640px" style="overflow-y:auto" width="50%" flat>
      <v-list>
          <v-list-item>
                <v-list-item-avatar>
                    <div class="avatar">{{ letter }}</div>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="title"  >{{ model.username}}</v-list-item-title>
              </v-list-item-content>
          </v-list-item>
      </v-list>
      <v-divider/>
      <v-list nav dense>
          <v-list-item>
              <v-list-item-content>
               <v-list-item-action><v-switch @change="enabledChange" v-model="model.enabled" dense label="Account is enabled"></v-switch></v-list-item-action>
              </v-list-item-content>
          </v-list-item>
          <v-list-item dense>
              <v-list-item-content>
              <v-list-item-subtitle class="text-left">Fullname</v-list-item-subtitle>
              <editable-field @change="fullnameChange" :text="model.fullname" max="64" />
              </v-list-item-content>
          </v-list-item>
           <v-list-item dense>
              <v-list-item-content>
              <v-list-item-subtitle class="text-left">Email</v-list-item-subtitle>
              <editable-field :text="model.email" @change="mailChange" max="64"  />
              </v-list-item-content>
          </v-list-item>
          <v-list-item  dense>
              <v-list-item-content>
              <v-list-item-subtitle class="text-left">Roles</v-list-item-subtitle>
              <role-selector :roles.sync="roles" @change="rolesChange" :userroles="model.roles" />
              </v-list-item-content>
          </v-list-item>

        <v-list-item dense>
              <v-list-item-content>
                <v-list-item-subtitle class="text-left">Change password</v-list-item-subtitle>
                <v-divider></v-divider>
               <editable-field  @change="passwordChange" :password="true" max="32"  />
              </v-list-item-content>
          </v-list-item>

      </v-list>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn small  :disabled="!changed" @click="save" text color="success">Save</v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>
import EditableField from './EditableField.vue'
import RoleSelector from './RoleSelector.vue'
export default {
  components: { EditableField, RoleSelector },
    name : 'UserDetails',
    props :['userdata','roles'],
   
    watch :{
        userdata : {
            handler(nval){
                this.model = nval
            }
        }
    },
    data() {
        return {
            model :this.userdata,
            selectedRoles : [],
            changed : false,
            oldPassword : "",
            newPassword : "",

        }
    },
    computed:{
        letter(){
            return this.userdata.username.charAt(0).toUpperCase()
        },
    },
    methods :{
        enabledChange(data){
            this.model.enabled = data
            this.changed = true
        },
        fullnameChange(data){
            this.model.fullname = data
            this.changed = true
        },
        mailChange(data){
            this.model.email = data
            this.changed = true
        },
        passwordChange(oldpass,newpass){
            this.oldPassword = oldpass
            this.newPassword = newpass
            this.changed = true
        },
        rolesChange(data){
            this.model.roles = data
            this.changed = true
        },
        save (){
            
            let result = {
                user : this.model,
                password : this.oldPassword
            }
            this.changed = false
            this.$emit("change",result)
        }
    }
}
</script>

<style scoped>
.avatar{
    background-color:red;width:48px;
    height:48px; padding:10px;
     font-size:20px;
    color:white;
    font-weight: bold;
    border-radius: 50%; 
}

</style>>
