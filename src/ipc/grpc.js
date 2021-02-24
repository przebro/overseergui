'use strict'
var proto_path = '/Users/casual/dev/goprojects/goscheduler/proto/services.proto'

const fs = require('fs')
var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    proto_path,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });

var service = grpc.loadPackageDefinition(packageDefinition).proto;
// var rServiceClient
var authService
var resourceService
var taskService
var adminService
var definitionService

var root_cert

var md

export function ConnectServices(connection,certpath,credentials){

    var opts;
    if (certpath !==""){
        
        try{
            root_cert = fs.readFileSync(certpath);
            opts = grpc.credentials.createSsl(root_cert);
        }catch(e){
            return  Promise.reject(new Error("unable to load certificate"))
        }
    }else{
        opts = grpc.credentials.createInsecure();
    }
     authService = new service.AuthenticateService(connection,opts)

     return  new Promise( (resolve,reject) => 
     authService.Authenticate(credentials, function(err,msg){ 
         if (err){ return reject(err)}
         resolve(msg)
        })
    ) 
}

export function InitializeServices(conn,certpath,token){

    console.log("initializing with :",conn)
    var opts;
    if (certpath !==""){
        opts = grpc.credentials.createSsl(root_cert);
    }
    else{
        opts = grpc.credentials.createInsecure();
    }
    adminService = new service.AdministrationService(conn,opts)
    resourceService = new service.ResourceService(conn,opts)
    taskService = new service.TaskService(conn,opts)
    definitionService = new service.DefinitionService(conn,opts)

    md = new grpc.Metadata();
    if (token != ""){
        md.set("Authorization","Bearer "+ token)
    }
}

export function Authenticate(username,password){

    return new Promise((resolve,reject) => 
        authService.Authenticate({username : username,password : password},
            function(err,msg){
                if (err){
                    return reject(err)
                }
                resolve(msg)
            })
    )
}
export function ListTasks(filter){

    return new Promise( (resolve,reject) => {
            var data = []
            var stream = taskService.ListTasks(filter,md);
            stream.on('data',(result) => { data.push(result) })
            stream.on('error',(err) =>{ reject(err)})
            stream.on('end',() =>{ resolve(data)})
        }

    )
}

export function ListTickets(filter){

    return new Promise( (resolve,reject) => {
            var data = []
            var stream = resourceService.ListTickets(filter,md);
            stream.on('data',(result) => { data.push(result) })
            stream.on('error',(err) =>{ reject(err)})
            stream.on('end',() =>{ resolve(data)})
        });
}

export function TaskDetail(data){
    
    return new Promise((resolve,reject) =>
        taskService.TaskDetail(data,md, function(err,msg) {
            if (err){ return reject(err)}
            resolve(msg)
        }
    ))
}

export function AddTicket(data){
    return new Promise((resolve,reject) =>
        resourceService.AddTicket(data,md, function(err,msg) {
            if (err){ return reject(err)}
            resolve(msg)
        }
    ))
}
export function RemoveTicket(data){
    

    return new Promise( (resolve,reject) =>
        resourceService.DeleteTicket(data,md,function(err,msg) {
            if (err){ return reject(err)}
            resolve(msg)
        }
    ))
}

export function ListUsers(data){

    return new Promise( (resolve,reject) =>
        adminService.ListUsers(data,md,function(err,msg) {
            if (err){ return reject(err)}
            resolve(msg)
        }
    ))
}

export function ListRoles(data){

    return new Promise( (resolve,reject) =>
        adminService.ListRoles(data,md,function(err,msg) {
            if (err){ return reject(err)}
            console.log(msg)
            resolve(msg)
    }
))
}

export function CreateUser(data){

    return new Promise( (resolve,reject) =>
        adminService.CreateUser(data,md,function(err,msg) {
            if (err){ return reject(err)}
            resolve(msg)
    }
))
}

export function CreateRole(data){
    return new Promise( (resolve,reject) =>
        adminService.CreateRole(data,md,function(err,msg) {
            if (err){ return reject(err)}
            resolve(msg)
    }
))
}

export function DeleteUser(data){

    return new Promise( (resolve,reject) =>
        adminService.DeleteUser(data,md,function(err,msg) {
            if (err){ return reject(err)}
            resolve(msg)
    }
))
}

export function DeleteRole(data){
    
    return new Promise( (resolve,reject) =>
        adminService.DeleteRole(data,md,function(err,msg) {
            if (err){ return reject(err)}
            resolve(msg)
    }
))
}

export function GetUser(data){
    
    return new Promise( (resolve,reject) =>
        adminService.GetUser(data,md,function(err,msg) {
            if (err){ return reject(err)}
            resolve(msg)
    }
))
}

export function ModifyUser(data){

    return new Promise( (resolve,reject) =>
        adminService.ModifyUser(data,md,function(err,msg) {
            if (err){ return reject(err)}
            resolve(msg)
        }
    ))
}

export function ModifyRole(data){

    return new Promise( (resolve,reject) =>
        adminService.ModifyRole(data,md,function(err,msg) {
            if (err){ return reject(err)}
            resolve(msg)
        }
    ))
}

export function GetRole(data){
    
    return new Promise( (resolve,reject) =>
        adminService.GetRole(data,md,function(err,msg) {
            if (err){ return reject(err)}
            resolve(msg)
    }
))
}

export function FreeTask(data){
    
    return new Promise( (resolve,reject) =>
        taskService.FreeTask(data,md,function(err,msg) {
            if (err){ return reject(err)}
            resolve(msg)
    }
))
}

export function HoldTask(data){
    
    return new Promise( (resolve,reject) =>
        taskService.HoldTask(data,md,function(err,msg) {
            if (err){ return reject(err)}
            resolve(msg)
    }
))
}

export function RerunTask(data){
    
    return new Promise( (resolve,reject) =>
        taskService.RerunTask(data,md,function(err,msg) {
            if (err){ return reject(err)}
            resolve(msg)
    }
))
}

export function SetToOk(data){
    
    return new Promise( (resolve,reject) =>
        taskService.SetToOk(data,md,function(err,msg) {
            if (err){ return reject(err)}
            resolve(msg)
    }
))
}

export function ConfirmTask(data){
    
    return new Promise( (resolve,reject) =>
        taskService.ConfirmTask(data,md,function(err,msg) {
            if (err){ return reject(err)}
            resolve(msg)
    }
))
}

export function EnforceTask(data){
    
    return new Promise( (resolve,reject) =>
        taskService.EnforceTask(data,md,function(err,msg) {
            if (err){ return reject(err)}
            resolve(msg)
    }
))
}

export function DefinitionGroupList(data){
    
    return new Promise( (resolve,reject) =>
        definitionService.ListGroups(data,md,function(err,msg) {
            if (err){ return reject(err)}
            resolve(msg)
    }
))
}

export function DefinitionTaskList(data){
    
    return new Promise( (resolve,reject) =>
        definitionService.ListDefinitionsFromGroup(data,md,function(err,msg) {
            if (err){ return reject(err)}
            resolve(msg)
    }
))
}

export function DefinitionTaskDetail(data){
    
    return new Promise( (resolve,reject) =>
        definitionService.GetDefinition(data,md,function(err,msg) {
            if (err){ return reject(err)}
            resolve(msg)
    }
))
}

export function DefinitionOrder(data){
    
    return new Promise( (resolve,reject) =>
        taskService.OrderTask(data,md,function(err,msg) {
            if (err){ return reject(err)}
            resolve(msg)
    }
))
}

export function DefinitionForce(data){
    
    return new Promise( (resolve,reject) =>
        taskService.ForceTask(data,md,function(err,msg) {
            if (err){ return reject(err)}
            resolve(msg)
    }
))
}

export function GroupOrder(data){
    
    return new Promise( (resolve,reject) =>
        taskService.OrderGroup(data,md,function(err,msg) {
            if (err){ return reject(err)}
            resolve(msg)
    }
))
}

export function GroupForce(data){
    
    return new Promise( (resolve,reject) =>
        taskService.ForceGroup(data,md,function(err,msg) {
            if (err){ return reject(err)}
            resolve(msg)
    }
))
}

export function TaskLog(data){
    
    return new Promise( (resolve,reject) =>
        taskService.TaskLog(data,md,function(err,msg) {
            if (err){ return reject(err)}
            resolve(msg)
    }
))
}