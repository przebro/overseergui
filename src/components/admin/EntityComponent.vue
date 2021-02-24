<template>
<v-card style="overflow-y:auto;float:left" width="50%" height="95vh"> 

  <v-list dense two-line>
    <v-list-item-group>
    <v-list-item v-for="(item, i) in items" :key="i" @click="selectedItem(item.name,i)">
        <v-list-item-icon><v-icon>mdi-account-outline</v-icon></v-list-item-icon>
        <v-list-item-content>
            <v-list-item-title class="text-left" v-text="item.name"></v-list-item-title>
            <v-list-item-subtitle class="text-left"> {{ item.description}}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
            <v-btn icon small @click.stop="deleteItem(item.name,i)"><v-icon>mdi-delete-outline </v-icon></v-btn>
        </v-list-item-action>
    </v-list-item>
    </v-list-item-group>

</v-list>
    </v-card>
</template>
<style scoped>
.v-list{
  overflow-y:auto
}
</style>
<script>
export default {
    name : "EntityComponent",
    props : {
        items : Array,
        type : String
    },
    data(){
        return{
        }
    },
    methods:{
        selectedItem(name,idx){
            this.$emit("selectItem",name,idx)
        },
        deleteItem(item,idx){

            this.$emit("deleteItem",item,idx)
        }
        
    }

}
</script>

<style>

</style>