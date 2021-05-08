import {ipcRenderer} from 'electron'
import * as msg from './messages'

/**
 * Creates New data provider that wraps event emmiter/publisher
 * @param {string} channel 
 */
function DataProvider(channel){

    this.subscribers = new Map()
    this.chan = channel
    const $this = this


    this.Send = function(data = {}){
        ipcRenderer.send($this.chan,data);
    }
    this.OnResult = function(e,data){

        $this.subscribers.forEach((val)=>{ val(e,data); })
    }

    this.StopListen = function(name){ this.subscribers.delete(name)}
    this.Listen = function(name,func){this.subscribers.set(name,func)}


    ipcRenderer.on(msg.result(channel),this.OnResult)
}


function TaskActionProvider(){
    const $this = this
    this.subscribers = new Map()

    this.OnResult = function(e,data){
        $this.subscribers.forEach((val)=>{ val(e,data); })
    }
    this.TaskEnforce = function(data = {}){
        ipcRenderer.send(msg.taskEnforce,data)
    }
    this.TaskRerun = function(data = {}){
        ipcRenderer.send(msg.taskRerun,data)
    }
    this.TaskSetOK = function(data = {}){
        ipcRenderer.send(msg.taskSetOk,data)
    }
    this.TaskHold = function(data = {}){
        ipcRenderer.send(msg.taskHold,data)
    }
    this.TaskFree = function(data = {}){
        ipcRenderer.send(msg.taskFree,data)
    }
    this.TaskConfirm = function(data = {}){
        ipcRenderer.send(msg.taskConfirm,data)
    }

    this.StopListen = function(name){ this.subscribers.delete(name)}
    this.Listen = function(name,func){this.subscribers.set(name,func)}


    ipcRenderer.on(msg.result(msg.taskFree),this.OnResult)
    ipcRenderer.on(msg.result(msg.taskHold),this.OnResult)
    ipcRenderer.on(msg.result(msg.taskRerun),this.OnResult)
    ipcRenderer.on(msg.result(msg.taskSetOk),this.OnResult)
    ipcRenderer.on(msg.result(msg.taskConfirm),this.OnResult)
    ipcRenderer.on(msg.result(msg.taskEnforce),this.OnResult)
}

function DefinitionOrderProvider(){
    const $this = this
    this.subscribers = new Map()

    this.OnResult = function(e,data){
        $this.subscribers.forEach((val)=>{ val(e,data); })
    }
    this.OrderDefinition = function(data = {}){
        ipcRenderer.send(msg.definitionOrder,data)
    }

    this.ForceDefinition = function(data = {}){
        ipcRenderer.send(msg.definitionForce,data)
    }
    this.OrderGroup = function(data = {}){
        ipcRenderer.send(msg.groupOrder,data)
    }

    this.ForceGroup = function(data = {}){
        ipcRenderer.send(msg.groupForce,data)
    }

    this.StopListen = function(name){ this.subscribers.delete(name)}
    this.Listen = function(name,func){this.subscribers.set(name,func)}

    ipcRenderer.on(msg.result(msg.definitionOrder),this.OnResult)
    ipcRenderer.on(msg.result(msg.definitionForce),this.OnResult)
    ipcRenderer.on(msg.result(msg.groupOrder),this.OnResult)
    ipcRenderer.on(msg.result(msg.groupForce),this.OnResult)
}





const rlp = new DataProvider(msg.rolesList);
const ulp = new DataProvider(msg.usersList);
const plp = new DataProvider(msg.poolList);
const rgp = new DataProvider(msg.roleGet)
const ugp = new DataProvider(msg.userGet)
const rcp = new DataProvider(msg.roleCreate)
const ucp = new DataProvider(msg.userCreate)
const rdp = new DataProvider(msg.roleDelete)
const udp = new DataProvider(msg.userDelete)
const tlp = new DataProvider(msg.ticketList)
const trp = new DataProvider(msg.ticketRemove)
const tdp = new DataProvider(msg.ticketAdd)
const fap = new DataProvider(msg.flagAdd)
const fdp = new DataProvider(msg.flagDestroy)
const flp = new DataProvider(msg.flagList)
const ptd = new DataProvider(msg.poolTaskDetail)

const dlgp = new DataProvider(msg.definitionGroupList)
const dtlp = new DataProvider(msg.definitionTaskList)
const dtdp = new DataProvider(msg.definitionTaskDetail)


const tgp = new DataProvider(msg.taskLog)
const tap = new TaskActionProvider()
const top = new DefinitionOrderProvider()




export function getRoleListProvider(){ return rlp; }


export let roleListProvider = rlp
export {ulp as userListProvider } 
export {rgp as roleGetProvider}
export {ugp as userGetProvider}
export {rcp as roleCreateProvider}
export {ucp as userCreateProvider}
export {rdp as roleDeleteProvider}
export {udp as userDeleteProvider}
export {tlp as ticketListProvider}
export {trp as ticketRemoveProvider}
export {tdp as ticketAddProvider}
export {tap as taskActionProvider}
export {plp as poolListProvider}
export {ptd as poolTaskDetailProvider}
export {dlgp as definitionListGroupProvider}
export {dtlp as definitionListTaskProvider}
export {dtdp as definitionTaskDetailProvider}
export {top as definitionOrderProvider}

export {tgp as taskLogProvider}

export {fap as flagAddProvider}
export {fdp as flagDestroyProvider}
export {flp as flagListProvider}
