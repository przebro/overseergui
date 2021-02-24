<template>
<v-container fluid >
            <v-card width="50%"  justify='center' class="mx-auto mt-10 pt-2" >
                <v-card-title class="caption">Connection</v-card-title>
                <v-row class="p-0 m-0" no-gutters>
                    <v-col cols="3">
                        <v-subheader>address:</v-subheader>
                    </v-col>
                    <v-col cols="7" >
                        <v-text-field outlined dense placeholder="e.g. localhost:7053" v-model="connection"/>
                    </v-col>
                </v-row >
                <v-expansion-panels accordion flat v-model="expand">
                    <v-expansion-panel>
                        <v-expansion-panel-header>
                            More options...
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-row  no-gutters>
                                <v-col cols="3" >
                                    <v-subheader>Username:</v-subheader>
                                </v-col>
                                <v-col cols="7">
                                    <v-text-field placeholder="Username" outlined dense v-model="username"/>
                                </v-col>
                            </v-row>
                            <v-row  no-gutters>
                                <v-col cols="3">
                                    <v-subheader>Password:</v-subheader>
                                </v-col>
                                <v-col cols="7">
                                    <v-text-field type="password" placeholder="Password" outlined dense v-model="password"/>
                                </v-col>
                            </v-row>
                            <v-row  no-gutters>
                                <v-col cols="3">
                                    <v-subheader>Root CA:</v-subheader>
                                </v-col>
                                <v-col cols="7">
                                    <v-text-field  outlined dense v-model="rootcapath" @click="openDialog"/>
                                </v-col>
                            </v-row>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
                <v-row>
                    <v-col cols="3">
                        
                    </v-col>
                    <v-col cols="8" align="right">
                        <v-btn color='info' dark small depressed @click.prevent='connect()'>Connect</v-btn>
                    </v-col>
                </v-row>
            </v-card>
</v-container>
</template>
<script>
const {dialog} = require('electron').remote;
import {ipcRenderer} from 'electron'
import {signOnState} from '../data/state.js'
import {connectionData} from '../data/state.js'

export default {
    name : 'AuthComponent',
    data (){
        return{
            connection : connectionData.connection,
            username : '',
            password :'',
            rootcapath :'',
            expand : undefined,
        }
        
    },
    methods:{
        connect(){
            var auth = this.expand == undefined?false:true
            ipcRenderer.send("msg-connect",{conn : this.connection,username : this.username,password : this.password,rootca :this.rootcapath,auth : auth})
            
        },
        loginResult(e,data){
            console.log(data.stack)
            console.log(data.message)
            if (data && data.stack && data.message){
                console.log("this is error")
                return
            }
            if (data.success === true){
                signOnState.connected = true
                ipcRenderer.send('msg-mem-save-connection',{conn : this.connection})
                ipcRenderer.send('msg-mem-connected',true)
                this.$router.push("/pool").catch(()=>{});
            }
        },
        fillForm(data){
            this.connection = data
        },
        openDialog(){
            dialog.showOpenDialog({ properties: ['openFile'],title :"Select root CA certificate"}).then( (result) =>{
                if (result.canceled || result.filePaths == [] || result.filePaths === undefined){
                    return
                }
                this.rootcapath = result.filePaths[0]
               
            })
        }
    },
    mounted : function() {
        
        ipcRenderer.on('msg-connect-result',this.loginResult)
        this.$root.$on("connection-selected",(data) => {
            this.fillForm(data)
            })

    }
}
</script>