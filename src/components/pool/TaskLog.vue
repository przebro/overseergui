<template>
    <v-card tile>
        <v-divider></v-divider>
        <v-card-text style="height: 200px;">
            <v-container fluid>
            <v-row no-gutters dense class="caption">
                <v-col>Task {{taskID}} Log</v-col>
            </v-row>
            <v-row v-for="(item,i) in data"  :key="i">
                <v-col>{{item}}</v-col>
            </v-row>
        </v-container>
        </v-card-text>
        
    </v-card>
</template>

<script>
export default {
    name :"TaskLog",
    props:["data","taskID"],
    data(){
        return{
            isVisible : false       
        }
    }

}
</script>

<style>

</style>