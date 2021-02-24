import { $store } from '../data/store'
import * as srvc from './grpc'
import * as msg from '../msg/messages'
const ipc = require('electron').ipcMain


export function registerIpcServices(){
    console.log("registering services")
    
    ipc.on(msg.memConnected,(receiver,args)=> {onSaveConnectionStatus(receiver,args) })
    ipc.on(msg.memIsConnected,(receiver,args)=> {onGetConnectionStatus(receiver,args) })
    ipc.on(msg.memGet,(receiver,args)=> {onMemoryGet(receiver,args) })
    ipc.on(msg.memSaveConnection,(receiver,args)=> {onSaveConnection(receiver,args) })
    ipc.on(msg.connect,(receiver,args)=> {onConnect(receiver,args) })
    ipc.on(msg.poolList,(receiver,args)=> {onGetActivePoolList(receiver,args) })
    ipc.on(msg.poolTaskDetail,(receiver,args)=> {onGetTaskDetail(receiver,args) })
    ipc.on(msg.ticketList,(receiver,args)=> {onGetTicketList(receiver,args) })
    ipc.on(msg.ticketAdd,(receiver,args) => {onAddTicket(receiver,args)})
    ipc.on(msg.ticketRemove,(receiver,args) => {onRemoveTicket(receiver,args)})

    ipc.on(msg.taskFree,(rcv,args) => onTaskFree(rcv,args))
    ipc.on(msg.taskHold,(rcv,args) => onTaskHold(rcv,args))
    ipc.on(msg.taskRerun,(rcv,args) => onTaskRerun(rcv,args))
    ipc.on(msg.taskSetOk,(rcv,args) => onTaskSetOk(rcv,args))
    ipc.on(msg.taskConfirm,(rcv,args) => onTaskConfirm(rcv,args))
    ipc.on(msg.taskEnforce,(rcv,args) => onTaskEnforce(rcv,args))

    ipc.on(msg.usersList,(receiver,args) => {onGetUserList(receiver,args)})
    ipc.on(msg.rolesList,(receiver,args) => {onGetRolesList(receiver,args)})
    ipc.on(msg.userCreate,(receiver,args) => {onCreateUser(receiver,args)})
    ipc.on(msg.roleCreate,(receiver,args) => {onCreateRole(receiver,args)})
    ipc.on(msg.userGet,(rcv,args) => {onGetUser(rcv,args)})
    ipc.on(msg.roleGet,(rcv,args) => {onGetRole(rcv,args)})
    ipc.on(msg.userDelete,(rcv,args) => {onDeleteUser(rcv,args)})
    ipc.on(msg.roleDelete,(rcv,args) => {onDeleteRole(rcv,args)})
    ipc.on(msg.userModify,(rcv,args) => {onModifyUser(rcv,args)})
    ipc.on(msg.roleModify,(rcv,args) => {onModifyRole(rcv,args)})

    ipc.on(msg.definitionGroupList,(rcv,args) => {onDefinitionGroupList(rcv,args)})
    ipc.on(msg.definitionTaskList,(rcv,args) => {onDefinitionTaskList(rcv,args)})
    ipc.on(msg.definitionTaskDetail,(rcv,args) => {onDefinitionTaskDetail(rcv,args)})
    ipc.on(msg.definitionOrder,(rcv,args) => {onDefinitionOrder(rcv,args)})
    ipc.on(msg.definitionForce,(rcv,args) => {onDefinitionForce(rcv,args)})

    ipc.on(msg.groupOrder,(rcv,args) => {onGroupOrder(rcv,args)})
    ipc.on(msg.groupForce,(rcv,args) => {onGroupForce(rcv,args)})

    ipc.on(msg.taskLog,(rcv,args) => {onTaskLog(rcv,args)})
    


}

function onSaveConnectionStatus(rcv,data){
    console.debug({rcv,data})
    $store().Set('status',data)
}
function onGetConnectionStatus(rcv,data){
    console.log("getting connection status")
    console.log(data)
    let result = $store().Get('status')
    rcv.reply(msg.result(msg.memIsConnected),result)
}

function onMemoryGet(rcv,data){
    console.log("get value from store",data)
    var result = $store().Get('connection')
    console.log(result)
    rcv.reply(msg.result(msg.memGet),result)

}

function onSaveConnection(rcv,data){

    $store().Save('connection',data)

}

function onConnect(receiver,data){
    
    var result = srvc.ConnectServices(data.conn,data.rootca,{username : data.username,password : data.password})
    result.then( (response)  =>  { onSuccesfulConnect(receiver,data,response); }).catch((e) => { onConnectionError(receiver,e) })
}
function onSuccesfulConnect(rcv,data,response){
    console.log("success")
    if (response.success == true){
        console.log(response.message)
        
        let token = response.message == "anonymous access"?"":response.message
        srvc.InitializeServices(data.conn,data.rootca,token)
    }
   
    rcv.reply(msg.result(msg.connect),response)  
}

function onConnectionError(rcv,response){
    console.log(response)
    rcv.reply(msg.result(msg.connect),response)  
}

function onGetActivePoolList(rcv,data){
    var result = srvc.ListTasks(data)
    result.then((data) => {rcv.reply(msg.result(msg.poolList),data)} ).catch( (e) => {rcv.reply(msg.result(msg.poolList),e)})

}

function onGetTicketList(rcv,args){

    var result = srvc.ListTickets(args)
    result.then(
        (data) => {
            rcv.reply(msg.result(msg.ticketList),data)
        }
    ).catch( 
        (e) => console.log(e)
    )
}

function onGetTaskDetail(rcv,data){

    var result = srvc.TaskDetail(data)
    
    result.then((data) => {rcv.reply(msg.result(msg.poolTaskDetail),data) }).catch( (e) => { rcv.reply(msg.result(msg.poolTaskDetail),e) })
}

function onAddTicket (rcv,data){

    var result = srvc.AddTicket(data)
    result.then((data) => { rcv.reply(msg.result(msg.ticketAdd),data) }).catch( (e) => {rcv.reply(msg.result(msg.ticketAdd),e) })
}

function onRemoveTicket (rcv,data){

    var result = srvc.RemoveTicket(data)
    result.then((data) => { rcv.reply(msg.result(msg.ticketRemove),data) }).catch( (e) => { rcv.reply(msg.result(msg.ticketRemove),e) })
}

function onGetUserList(rcv,data){

    var result = srvc.ListUsers(data)
    result.then((data) => { rcv.reply('msg-users-list-result',data) }).catch( (e) => { rcv.reply('msg-users-list-result',e) })

}
function onGetRolesList(rcv,data){

    var result = srvc.ListRoles(data)
    result.then((data) => { rcv.reply('msg-roles-list-result',data) }).catch( (e) => { rcv.reply('msg-roles-list-result',e) })
    
}

function onCreateUser(rcv,data){

    var result = srvc.CreateUser(data)
    result.then((data) => { rcv.reply('msg-user-create-result',data) }).catch( (e) => { rcv.reply('msg-user-create-result',e) })
}

function onDeleteUser(rcv,data){

    var result = srvc.DeleteUser(data)
    result.then((data) => { rcv.reply('msg-user-delete-result',data) }).catch( (e) => { rcv.reply('msg-user-delete-result',e) })
    
}

function onGetUser(rcv,data){

    var result = srvc.GetUser(data)
    result.then((data) => { rcv.reply('msg-user-get-result',data) }).catch( (e) => {  rcv.reply('msg-user-get-result',e) })

}

function onModifyUser(rcv,data){

    var result = srvc.ModifyUser(data)
    result.then((data) => { rcv.reply('msg-user-modify-result',data) }).catch( (e) => { rcv.reply('msg-user-modify-result',e) })

}

function onGetRole(rcv,data){

    var result = srvc.GetRole(data)
    result.then((data) => { rcv.reply('msg-role-get-result',data) }).catch( (e) => { rcv.reply('msg-role-get-result',e) })

}

function onCreateRole(rcv,data){

    var result = srvc.CreateRole(data)
    result.then((data) => { rcv.reply('msg-role-create-result',data) }).catch( (e) => { rcv.reply('msg-role-create-result',e) })
    
}

function onDeleteRole(rcv,data){

    var result = srvc.DeleteRole(data)
    result.then((data) => { rcv.reply('msg-role-delete-result',data) }).catch( (e) => { rcv.reply('msg-role-delete-result',e) })
    
}

function onModifyRole(rcv,data){

    var result = srvc.ModifyRole(data)
    result.then((data) => {  rcv.reply('msg-role-modify-result',data) }).catch( (e) => { rcv.reply('msg-role-modify-result',e) })
}

function onTaskFree(rcv,data){
    var result = srvc.FreeTask(data)
    result.then((data) => {  rcv.reply(msg.result(msg.taskFree),data) }).catch( (e) => { rcv.reply(msg.result(msg.taskFree),e) })

}

function onTaskHold(rcv,data){

    var result = srvc.HoldTask(data)
    result.then((data) => {  rcv.reply(msg.result(msg.taskHold),data) }).catch( (e) => { rcv.reply(msg.result(msg.taskHold),e) })

}

function onTaskRerun(rcv,data){

    var result = srvc.RerunTask(data)
    result.then((data) => {  rcv.reply(msg.result(msg.taskRerun),data) }).catch( (e) => { rcv.reply(msg.result(msg.taskRerun),e) })
}

function onTaskSetOk(rcv,data){

    var result = srvc.SetToOk(data)
    result.then((data) => {  rcv.reply(msg.result(msg.taskSetOk),data) }).catch( (e) => { rcv.reply(msg.result(msg.taskSetOk),e) })
}

function onTaskConfirm(rcv,data){

    var result = srvc.ConfirmTask(data)
    result.then((data) => {  rcv.reply(msg.result(msg.taskConfirm),data) }).catch( (e) => { rcv.reply(msg.result(msg.taskConfirm),e) })
}

function onTaskEnforce(rcv,data){

    var result = srvc.EnforceTask(data)
    result.then((data) => {  rcv.reply(msg.result(msg.taskEnforce),data) }).catch( (e) => { rcv.reply(msg.result(msg.taskEnforce),e) })
}

function onDefinitionGroupList(rcv,data){

    var result = srvc.DefinitionGroupList(data)
    result.then((data) => {  rcv.reply(msg.result(msg.definitionGroupList),data) }).catch( (e) => { rcv.reply(msg.result(msg.definitionGroupList),e) })

}
function onDefinitionTaskList(rcv,data){

    var result = srvc.DefinitionTaskList(data)
    result.then((data) => {  rcv.reply(msg.result(msg.definitionTaskList),data) }).catch( (e) => { rcv.reply(msg.result(msg.definitionTaskList),e) })
    
}
function onDefinitionTaskDetail(rcv,data){

    var result = srvc.DefinitionTaskDetail(data)
    result.then((data) => {  rcv.reply(msg.result(msg.definitionTaskDetail),data) }).catch( (e) => { rcv.reply(msg.result(msg.definitionTaskDetail),e) })
    
}
function onDefinitionOrder(rcv,data){
    var result = srvc.DefinitionOrder(data)
    result.then((data) => {  rcv.reply(msg.result(msg.definitionOrder),data) }).catch( (e) => { rcv.reply(msg.result(msg.definitionOrder),e) })
}
function onDefinitionForce(rcv,data){

    var result = srvc.DefinitionForce(data)
    result.then((data) => {  rcv.reply(msg.result(msg.definitionForce),data) }).catch( (e) => { rcv.reply(msg.result(msg.definitionForce),e) })
}

function onGroupOrder(rcv,data){
    var result = srvc.GroupOrder(data)
    result.then((data) => {  rcv.reply(msg.result(msg.groupOrder),data) }).catch( (e) => { rcv.reply(msg.result(msg.groupOrder),e) })
}
function onGroupForce(rcv,data){

    var result = srvc.GroupForce(data)
    result.then((data) => {  rcv.reply(msg.result(msg.groupForce),data) }).catch( (e) => { rcv.reply(msg.result(msg.groupForce),e) })
}

function onTaskLog(rcv,data){
    
    var result = srvc.TaskLog(data)
    result.then((data) => {  rcv.reply(msg.result(msg.taskLog),data) }).catch( (e) => { rcv.reply(msg.result(msg.taskLog),e) })
}
