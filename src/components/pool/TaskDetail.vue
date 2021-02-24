<template>
<v-card style="overflow:hidden;height:40vh" tile flat class="d-flex">
    <v-sheet width="50%" class="flex-grow-0 pa-2" style="font-size:12px">
        <v-sheet class="pa-1">Task</v-sheet>
        <v-sheet >
        <v-container fluid >
            <v-row no-gutters><v-col cols="4">Task ID:</v-col><v-col style="text-left">{{ task.baseData.taskId }}</v-col></v-row>
            <v-row no-gutters><v-col cols="4">Group:</v-col><v-col style="text-left">{{ task.baseData.groupName }}</v-col></v-row>
            <v-row no-gutters><v-col cols="4">Name:</v-col><v-col style="text-left">{{ task.baseData.taskName }}</v-col></v-row>
            <v-row no-gutters><v-col cols="4">Description:</v-col><v-col style="text-left">{{ task.description }}</v-col></v-row>
            <v-row no-gutters><v-col cols="4">Order Date:</v-col><v-col style="text-left">{{ task.baseData.orderDate }}</v-col></v-row>
            <v-row no-gutters><v-col cols="4">#runs:</v-col><v-col style="text-left">{{ task.baseData.runNumber }}</v-col></v-row>
            <v-row no-gutters><v-col cols="4">Started:</v-col><v-col style="text-left">{{ timeFormat(task.startTime) }}</v-col></v-row>
            <v-row no-gutters><v-col cols="4">Ended:</v-col><v-col style="text-left">{{ timeFormat(task.endTime) }}</v-col></v-row>
        </v-container>
        </v-sheet>
    </v-sheet>
    <v-sheet width="40%" class="flex-grow-0 pa-2" style="font-size:12px;border-left: solid 1px #DDD;">
        <v-sheet class="pa-1">Prerequisites</v-sheet>
         <v-sheet  style="overflow-y:auto; height:100%">
        <v-container fluid>
            <v-row no-gutters v-if="!task.baseData.confirmed">
                <v-col cols="4">Require confirm</v-col>
                <v-col style="text-left"><v-icon left x-small >mdi-account-alert-outline</v-icon></v-col>
            </v-row>
            <v-row no-gutters v-if="task.baseData.held">
                <v-col cols="4">Task is Held</v-col>
                <v-col style="text-left"><v-icon left x-small >mdi-alert-octagon-outline</v-icon></v-col>
            </v-row>
            <v-row no-gutters><v-col cols="4">From Time:</v-col><v-col style="text-left">{{ timeFormat(task.from)}}</v-col></v-row>
            <v-row no-gutters><v-col cols="4">To Time:</v-col><v-col style="text-left">{{ timeFormat(task.to)}}</v-col></v-row>
            <v-row no-gutters v-for="(r,i) in tickets(task.resources)" :key="i"  >
                <v-col cols="4">Ticket:</v-col><v-col style="text-left">{{ r.name }} {{r.odate}} </v-col>
            </v-row>
        
 
        </v-container>
         </v-sheet>
    </v-sheet>
</v-card>

</template>

<script>
export default {
    name :"TaskDetail",
    props :["task","height"],
    computed:{
        hg(){
            return 290 +"px";
        }
    },
    methods:{
        timeFormat(tm){
            if (tm === "0001-01-01 00:00:00"){
                return "-"
            }
            return tm
        },
        tickets(items){
            let result = items.filter((v) => { return v.satisfied != true })
            return result
        },
        isConfirmed(confirm){
            return confirm
        }
    },
    mounted(){
        
    }

}
</script>
<style scoped>

</style>
