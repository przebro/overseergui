<template>
  <v-card height="640px" style="overflow-y:auto" flat>
      <v-list>
          <v-list-item>
                <v-list-item-avatar>
                    <div class="avatar">R</div>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="title"  >{{roledata.role.rolename}}</v-list-item-title>
              </v-list-item-content>
          </v-list-item>
      </v-list>
      <v-divider/>
      <v-list>
          <v-list-item  dense>
              <v-list-item-content>
              <v-list-item-subtitle class="text-left">Description</v-list-item-subtitle>
              <editable-field @change="descriptionChange" :text="roledata.description" max="64" />
              </v-list-item-content>
          </v-list-item>
      </v-list>

      <v-divider/>
      <v-list nav dense>
          <v-list-item dense>
              <v-list-item-content>
              <v-list-item-subtitle class="text-left">Privileges</v-list-item-subtitle>
                <v-card outlined height="300" style="overflow-y:auto" class="px-2">
                <div>
                    <div>Administration</div>
                    <v-chip-group  v-model="defs" multiple column active-class="secondary"  >
                        <v-chip value="administration" small filter>Administration</v-chip>
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
                </v-card>
              </v-list-item-content>
          </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-card-actions>
          
        <v-btn small  :disabled="!changed"  @click="save" text color="success">Save</v-btn>
      </v-card-actions>
  </v-card>
</template>

<script>
import EditableField from './EditableField.vue'

export default {
    components : {
        EditableField,
    },
    name :"RoleDetails",
    props : ['roledata','selected'],
    data(){
        return{
            changed : false,
            defs : [],
            model :[],
        }
    },
    watch :{
        roledata :{
            handler(nval){
                
                this.model = nval
                let names = Object.getOwnPropertyNames(this.model)
                this.defs = []

                names.forEach((n) =>{
                    if(this.model[n] == true){
                        this.defs.push(n)
                    }
                })
                
            }
        },
        defs :{
            handler(){
                this.changed = true
            }
        }
    },
    methods :{
        descriptionChange(data){
            this.model.description = data
            this.changed = true
        },
        save(){
            let result = {

                role : {
                    rolename : this.model.role.rolename
                },
                description : this.model.description,
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
            this.$emit("change",result)
            this.changed = false
        }
    }

}
</script>

<style>

</style>