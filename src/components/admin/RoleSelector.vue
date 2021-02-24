<template>
<v-card outlined height="120" style="overflow-y:auto">
<v-chip-group v-model="selectedRoles" column multiple active-class="secondary" @change="selectionChange">
    <v-chip v-for="(item,i) in roles" :value="item.name" :key="i" small filter >
        {{item.name}}
    </v-chip>
</v-chip-group>
</v-card>

</template>

<script>
export default {
    name : 'RoleSelector',
    props :['roles','userroles'],
    data (){
        return{
            selectedRoles :[]
        }
    },
    watch:{
        userroles:{
            handler(nval){
                
                this.selectedRoles = []
                this.roles.forEach(
                    (e) =>{

                        if (nval.indexOf(e.name) >= 0){
                            this.selectedRoles.push(e.name)
                        }
                    }
                )
                this.model = nval
            }
        }
    },
    methods:{
        selectionChange(){
            this.$emit('change',this.selectedRoles)
        }
    }
}
</script>

<style>
.primary{
    color: red;
}
</style>