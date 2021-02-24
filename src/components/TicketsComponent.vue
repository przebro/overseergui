<template>
    <v-simple-table fixed-header height="84vh" style="overflow-y:hidden" dense>            
        <thead>
            <tr>
                <th class="text-left">Ticket</th>
                <th class="text-left">Odate</th>
                <th class="text-left"></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in tickets" :key="item.idx">
                <td class="text-left">{{ item.name}}</td>
                <td class="text-left">{{ item.odate}}</td>
                <td class="text-right"><v-btn icon @click="removeTicket(item.name,item.odate)"><v-icon>mdi-delete-outline </v-icon></v-btn> </td>
            </tr>
        </tbody>
    </v-simple-table>
            
</template>
<script>
import { ticketListProvider,ticketRemoveProvider } from '../msg/provider'

export default {
    name : "TicketsComponent",
    props:{
        filterName: String
    },
    data : function(){
        return {
            tickets : null,
            ckey : 0,
            ticketName:this.filterName,
            filterOdate:"",
        }
    },
    computed:{

    },
    methods:{
        onListTicket(e,data){
        this.tickets = data.map((elem,idx) => { return { "name":elem.name,"odate": elem.odate,idx:idx} })
        this.ckey +=1;
        },
        removeTicket(name,odate) {
             this.menu = false
             ticketRemoveProvider.Send({name : name,odate : odate})
        },
        onRefresh(){
            ticketListProvider.Send()
        }
    },
    mounted : function(){
        ticketListProvider.Listen(this.$options.name,this.onListTicket)
        
        ticketListProvider.Send()
        
    },
    beforeDestroy : function(){
        ticketListProvider.StopListen(this.$options.name)
    }

}
</script>
