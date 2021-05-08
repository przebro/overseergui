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
            <tr v-for="item in flags" :key="item.idx">
                <td class="text-left">{{ item.name}}</td>
                <td class="text-left">{{ item.odate}}</td>
            </tr>
        </tbody>
  </v-simple-table>
</template>

<script>
export default {
    name : "FlagsComponent",
    data : function(){
        return {
            flags : null,
            ckey : 0
        }
    },

}
</script>

<style>

</style>