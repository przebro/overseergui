
export const memConnected = 'msg-mem-connected';
export const memIsConnected = 'msg-mem-isconnected';
export const memGet = 'msg-mem-get'
export const memSaveConnection = 'msg-mem-save-connection'
export const connect = 'msg-connect'
export const poolList = 'msg-pool-list'
export const poolTaskDetail = 'msg-pool-task-detail'
export const ticketList = 'msg-ticket-list'
export const ticketAdd = 'msg-ticket-add'
export const ticketRemove = 'msg-ticket-remove'

export const flagList = 'msg-ticket-list'
export const flagAdd = 'msg-flag-add'
export const flagDestroy = 'msg-flag-destroy'

export const rolesList = 'msg-roles-list'
export const usersList = 'msg-users-list'

export const userGet = 'msg-user-get'
export const userCreate = 'msg-user-create'
export const roleCreate = 'msg-role-create'
export const roleGet = 'msg-role-get'
export const roleDelete = 'msg-role-delete'
export const userDelete = 'msg-user-delete'
export const userModify = 'msg-user-modify'
export const roleModify = 'msg-role-modify'

export const taskHold = 'msg-task-hold'
export const taskFree = 'msg-task-free'
export const taskSetOk = 'msg-task-setok'
export const taskRerun = 'msg-task-rerun'
export const taskEnforce = 'msg-task-enforce'
export const taskConfirm = 'msg-task-confirm'
export const taskLog = 'msg-task-log'

export const definitionGroupList = 'msg-definition-group-list'
export const definitionTaskList = 'msg-definition-task-list'
export const definitionTaskDetail = 'msg-definition-task-detail'
export const definitionOrder = 'msg-definition-order'
export const definitionForce = 'msg-definition-force'

export const groupOrder = 'msg-group-order'
export const groupForce = 'msg-group-force'
/**
 * 
 * @param {string} msg 
 */
export function result(msg) {return msg + '-result'}