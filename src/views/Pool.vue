<template>
<v-card ref="container" v-resize="onResize">

        <v-toolbar dense color="secondary" rounded="0" dark>
            <!-- -->
            <search-menu />
            
            <v-spacer></v-spacer>
            <order-task @opened="getGroupList" @groupChange="getTaskList"  :groups="groups" :definitions="definitions"/>
            <v-dialog v-model="dialog" width="640px" scrollable >
                <task-log :taskID="logID" :data="logData" />
            </v-dialog>
            <add-ticket />
            <!-- -->
        </v-toolbar>
        <active-task-list :tasks="items" @selected="onTaskDetail" @taskAction="onTaskAction" @taskLog="getTaskLog" />
        <task-detail v-if="selected" :task="selectedTask" />
        <v-snackbar v-model="showmsg"  :color="msgcolor" :timeout="timeout" >{{ resultmsg }}</v-snackbar>
</v-card>
</template>


<script>

import AddTicket from '@/components/AddTicket.vue'
import ActiveTaskList from '../components/pool/ActiveTaskList.vue'
import TaskDetail from '../components/pool/TaskDetail.vue'
import SearchMenu from '../components/pool/SearchMenu.vue'
import {poolListProvider, poolTaskDetailProvider,
definitionListGroupProvider,
definitionListTaskProvider,
definitionOrderProvider,
taskLogProvider,
ticketAddProvider
} from '../msg/provider'
import OrderTask from '../components/OrderTask.vue'
import TaskLog from '../components/pool/TaskLog.vue'


export default {
    name: 'Pool',
    components: {
        AddTicket,
        ActiveTaskList,
        TaskDetail,
        SearchMenu,
        OrderTask,
        TaskLog
        
    },
    data(){
        return{
            filterValue:"",
            items :[],
            selectedTask :{},
            selected : false,
            timeout : 3000,
            resultmsg : "",
            showmsg : false,
            msgcolor : "",
            interval : 0,
            groups : [],
            definitions :[],
            dialog : false,
            logID : "",
            logData : []
        }
    },
    methods:{
        onListActivePool(e,data){
            this.items = data
        },
        onTaskDetail(taskID){
            poolTaskDetailProvider.Send({'taskID' : taskID})

        },
        taskDetailResult(e,data){

            this.selectedTask = data
            console.log(this.selectedTask)
            this.selected = true
        },
        onTaskAction(data){
            if (data && data.stack && data.message){
                console.log(data)
                return
            }

           this.msgcolor = data.success == true? "success" : "error"
           this.resultmsg = data.message
           this.showmsg = true

        },
        onResize(){
            
        },
        getTaskList(data){
            definitionListTaskProvider.Send({filter : data})
        },
        getGroupList(){
            definitionListGroupProvider.Send({filter :""})
        },
        getTaskLog(taskID){
            this.logID = taskID
            taskLogProvider.Send({taskID : taskID })

        },
        onDefinitionGroupListResult(e,data){
            if (data && data.stack && data.message){
                console.log(data)
                return
            }
            this.groups = data.groupName

        },
        onDefinitionTaskListResult(e,data){
            
             if (data && data.stack && data.message){
                console.log(data)
                return
            }
            this.definitions = data.definitions
        },
        onDefinitionOrderResult(e,data){
            if (data && data.stack && data.message){
                this.msgcolor = "error"
                this.resultmsg = data
            }else{
                this.resultmsg = data.message
                this.msgcolor = "success"
            }

           this.showmsg = true

        },
        onRefreshResults(){
            poolListProvider.Send({group :"",name :"",taskID :"",odateFrom :"",odateTo :"",status :""})
        },
        onGetTaskLog(e,data){
            console.log(data)
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

            this.logData = data.output
            this.dialog = true

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
        }
    },
    mounted:function(){
        poolListProvider.Listen(this.$options.name,this.onListActivePool)
        poolTaskDetailProvider.Listen(this.$options.name,this.taskDetailResult)
        

        definitionListGroupProvider.Listen(this.$options.name,this.onDefinitionGroupListResult)
        definitionListTaskProvider.Listen(this.$options.name,this.onDefinitionTaskListResult)
        definitionOrderProvider.Listen(this.$options.name,this.onDefinitionOrderResult)
        taskLogProvider.Listen(this.$options.name,this.onGetTaskLog)
        ticketAddProvider.Listen(this.$options.name,this.onTicketAction)
      
        
        this.interval = setInterval(this.onRefreshResults,2000)

        poolListProvider.Send()
    },
    beforeDestroy(){
        console.log("clear interval")
        clearInterval(this.interval)
    }
}
</script>

<style>

</style>