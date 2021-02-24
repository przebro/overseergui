<template>
 <v-card>
    <v-card-title dense height="24" color="button" class="caption" dark>{{title}}</v-card-title>
    <v-card-text>
    <form class="px-5">
        <v-container >
            <v-row><v-col class="p-0 mt-5"> 
                <v-text-field flat dense label="Rolename" :rules="namerule" v-model="rolename" maxlength="32" ></v-text-field>
            </v-col></v-row>
            <v-row><v-col class="p-0">
                <v-text-field flat dense label="Description" v-model="description" maxlength="64"></v-text-field>
            </v-col></v-row>
            <v-card outlined>
                <v-card-text>
                <div>
                    <div>Administration</div>
                    <v-chip-group  v-model="defs" multiple column active-class="secondary"  >
                        <v-chip value="administration" small filter>Users</v-chip>
                    </v-chip-group>
                </div>
                <div>
                    <div>Taskpool Management</div>
                    <v-chip-group  v-model="defs" multiple column active-class="secondary" >
                        <v-chip value="restart" small filter>Restart</v-chip>
                        <v-chip value="setToOk" small filter>Set OK</v-chip>
                        <v-chip value="hold" small filter>Hold</v-chip>
                        <v-chip value="free" small filter>Free</v-chip>
                        <v-chip value="bypass" small filter>Bypass</v-chip>
                    </v-chip-group>
                </div>
                <div>
                    <div>Resources Management</div>
                    <v-chip-group  v-model="defs" multiple column active-class="secondary"  >
                        <v-chip value="addTicket" small filter>Add Ticket</v-chip>
                        <v-chip value="removeTicket" small filter>Remove Ticket</v-chip>
                        <v-chip value="setFlag" small filter>Set Flag</v-chip>
                        <v-chip value="confirm" small filter>Confirm</v-chip>
                    </v-chip-group>
                </div>
                <div>
                    <div>Task Management</div>
                    <v-chip-group  v-model="defs" multiple column active-class="secondary"  >
                        <v-chip  value="order" small filter>Order</v-chip>
                        <v-chip value="force" small filter>Force</v-chip>
                    </v-chip-group>
                </div>
                <div>
                    <div>Definitions</div>
                    <v-chip-group  v-model="defs" multiple column active-class="secondary" >
                        <v-chip value="definition" small filter>Manage</v-chip>
                    </v-chip-group>
                </div>
                </v-card-text>
            </v-card>
        </v-container>
    </form>
    </v-card-text>
    <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn small @click="cancel()" text>Cancel</v-btn>
        <v-btn small @click="submit()" text>Create</v-btn>
    </v-card-actions>
 </v-card>
</template>

<script>
export default {
    name: "RoleComponent",
    props:{
        title : String,
    },
    data(){
        return{
            rolename :"",
            description : "",
            defs:[],
            namerule: [v => v.length <= 32 || 'Max 32 characters'],
        }
    },
    methods :{
        submit(){

            var model = {
                role : {
                    rolename : this.rolename,
                    },
                description : this.description,
                administration : this.defs.includes('administration'),
                restart : this.defs.includes('restart'),
                setToOk : this.defs.includes('setToOk'),
                addTicket : this.defs.includes('addTicket'),
                removeTicket : this.defs.includes('removeTicket'),
                setFlag : this.defs.includes('setFlag'),
                confirm : this.defs.includes('confirm'),
                order : this.defs.includes('order'),
                force : this.defs.includes('force'),
                definition : this.defs.includes('definition'),
                hold : this.defs.includes('hold'),
                free : this.defs.includes('free'),
                bypass : this.defs.includes('bypass'),
            }
            this.$emit('formSubmitted',this.title,model)
            this.clearForm()
        },
        
        cancel(){

            this.$emit('onCancel',"")
            this.clearForm()
        },
        clearForm(){
            this.rolename ="",
            this.description = "",
            this.defs=[]

        },
    },
}
</script>

<style>

</style>
