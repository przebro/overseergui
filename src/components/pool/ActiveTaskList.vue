<template>
<v-simple-table fixed-header height="50vh" dense>
                <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">Task ID</th>
                        <th class="text-left">Group</th>
                        <th class="text-left">Name</th>
                        <th class="text-left">Odate</th>
                        <th class="text-left">Status</th>
                        <th class="text-left">#Runs</th>
                        <th class="text-left"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in tasks" :key="item.taskId" @click="selectItem(item.taskId)">
                        <td class="text-left"> {{ item.taskId }}</td>
                        <td class="text-left"> {{ item.groupName }}</td>
                        <td class="text-left"> {{ item.taskName }}</td>
                        <td class="text-left"> {{ item.orderDate }}</td>
                        
                        <td class="text-left"> <v-chip x-small dark :color="getColor(item.taskStatus,item.confirmed,item.held)" >
                             <v-icon v-if="item.held == true" left x-small>mdi-alert-octagon-outline</v-icon>
                             <v-icon v-if="!item.confirmed == true" left x-small>mdi-account-alert-outline</v-icon>
                             {{ status[item.taskStatus - 1] }} 

                             </v-chip>
                        </td>
                        <td class="text-left"> {{ item.runNumber }}</td>
                        <td > 
                            <v-menu offset-y> 
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn plain v-bind="attrs" v-on="on">
                                    <v-icon>mdi-dots-vertical</v-icon>
                                </v-btn>
                            </template>
                            <v-list style="cursor:pointer">
                                <v-list-item @click="setToOk(item.taskId)" dense><v-list-item-title>Set to OK</v-list-item-title></v-list-item>
                                <v-list-item @click="rerunTask(item.taskId)" dense><v-list-item-title>Rerun</v-list-item-title></v-list-item>
                                <v-list-item @click="enforceTask(item.taskId)" dense><v-list-item-title>Enforce</v-list-item-title></v-list-item>
                                <v-list-item @click="holdTask(item.taskId)" dense :disabled="item.held" ><v-list-item-title >Hold</v-list-item-title></v-list-item>
                                <v-list-item @click="freeTask(item.taskId)" dense :disabled="!item.held" ><v-list-item-title >Free</v-list-item-title></v-list-item>
                                <v-list-item @click="confirmTask(item.taskId)" dense :disabled="item.confirmed"><v-list-item-title >Confirm</v-list-item-title></v-list-item>
                                <v-list-item><v-divider/></v-list-item>
                                <v-list-item @click="getTaskLog(item.taskId)" dense :disabled="false"><v-list-item-title >Log</v-list-item-title></v-list-item>
                                <v-list-item @click="getTaskOutput(item.taskId)" dense :disabled="true"><v-list-item-title >Output(Not Impl.)</v-list-item-title></v-list-item>
                            </v-list>
                            </v-menu>
                        </td>
                    </tr>
                </tbody>
                </template>
        </v-simple-table> 
  
</template>

<script>
import { taskActionProvider} from '../../msg/provider'
export default {
    name: "ActiveTaskList",
    props :['tasks'],
    data(){
        return{
            status : ["Waiting","Starting","Executing","Ended OK","Ended Not OK","Hold"]
        }
    },
    methods:{
        getColor(status,confirm,held){
            let colors = ["darkgray","orange","yellow","green","red"]
            if (confirm == false || held == true){
                return "blue"
            }
            return colors[status - 1]
        },
        selectItem(itemID){

            this.$emit('selected',itemID)
        },
        setToOk(taskID){
            taskActionProvider.TaskSetOK({taskID : taskID })
        },
        rerunTask(taskID){
            taskActionProvider.TaskRerun({taskID : taskID })
        },
        holdTask(taskID){
            taskActionProvider.TaskHold({taskID : taskID })
        },
        freeTask(taskID){
            taskActionProvider.TaskFree({taskID : taskID })
        },
        confirmTask(taskID){
            taskActionProvider.TaskConfirm({taskID : taskID })
        },
        getTaskLog(taskID){
             this.$emit('taskLog',taskID)
        },
        enforceTask(taskID){
            taskActionProvider.TaskEnforce({taskID : taskID })
        },
        getTaskOutput(taskID){
            console.log(taskID)
        },
        onTaskActionResult(e,data){
            this.$emit('taskAction',data)
        }
    },
    
    mounted (){
        taskActionProvider.Listen(this.$options.name,this.onTaskActionResult)
    },
    beforeDestroy(){
        taskActionProvider.StopListen(this.$options.name)

    }
}
</script>

<style>
table.v-table tbody tr td {
  font-size: 16px;
  height: 15px;
  padding: 0px;
}
</style>