<template>
 <v-card>
    <v-card-title dense height="24" color="button" class="caption" dark>{{title}}</v-card-title>
    <v-card-text>
        <v-form class="px-5">
            <v-checkbox dense label="Account is disabled" v-model="disabled" />
            <v-text-field dense label="Username" v-model="username"  maxlength="32"  ></v-text-field>
            <v-text-field dense label="Full name" v-model="fullname" maxlength="64" ></v-text-field>
            <v-text-field dense label="Email" v-model="email" maxlength="64"  ></v-text-field>
            <v-text-field dense type="password" label="Password" v-model="passwd1"  maxlength="32" ></v-text-field>
            <v-text-field dense type="password" label="Password"  v-model="passwd2" maxlength="32" ></v-text-field>
            <role-selector :roles.sync="userRoles" @change="rolesChange" :userroles="[]" />
        </v-form>
    </v-card-text>
    <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn small @click="cancel()" text>Cancel</v-btn>
        <v-btn small @click="submit()" text>Create</v-btn>
    </v-card-actions>
 </v-card>
</template>

<script>
import RoleSelector from './admin/RoleSelector'
export default {
    components :{RoleSelector},
    name : "UserComponent",
    props:{
        title : String,
        userRoles : Array
    },
    data (){
        return{
            username :"",
            fullname :"",
            email :"",
            passwd1 :"",
            passwd2 :"",
            disabled : false,
            roles : []
        }
    },
    methods :{
        submit(){

            let rolesList = []
            this.roles.forEach((v)=>{ if (v.selected){
                    rolesList.push(v.name)
                } 
            })

            var model = {
                user :{
                    username : this.username,
                    fullname : this.fullname,
                    email : this.email,
                    enabled : !this.disabled,
                    roles : this.roles,
                },
                password : this.passwd1
                
            }
            this.$emit('formSubmitted',this.title,model)
            this.clearForm()

        },
        cancel(){

            this.$emit('onCancel',"")
            this.clearForm()

        },
        rolesChange(items){

            this.roles = items
        },
        clearForm(){
            this.username =""
            this.fullname =""
            this.email =""
            this.passwd1 =""
            this.passwd2 =""
            this.disabled = false
            this.roles = []
        }
    }
}
</script>
