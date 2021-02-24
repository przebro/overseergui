<template>
  <v-dialog v-model="isVisible" width="600">
      <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on"  color="info"  small depressed><v-icon>mdi-magnify</v-icon>Search</v-btn>
      </template>
      <v-card tile>
          <v-divider></v-divider>
          <v-container fluid>
              <v-row no-gutters dense class="caption">
                  <v-col>Filter Tasks(NOT IMPLEMENTED!)</v-col>
              </v-row>
              <v-row no-gutters dense>
                  <v-col cols="3" class="tex-left"><v-checkbox class="small" label="Name" /></v-col>
                  <v-col cols="5" class="tex-left"><v-text-field class="small" dense outlined single-line label="Group"  /></v-col>
                  <v-col class="tex-left"><v-text-field class="small" dense outlined single-line label="Name" /></v-col>
              </v-row>
              <v-row no-gutters dense>
                  <v-col cols="3" class="tex-left"><v-checkbox class="small"  label="ID" /></v-col>
                  <v-col cols="5" class="tex-left"><v-text-field class="small" single-line  dense outlined /></v-col>
                  <v-col class="tex-left"></v-col>
              </v-row>
              <v-row no-gutters dense>
                  <v-col cols="3" class="tex-left"><v-checkbox class="small"  label="Order Date" /></v-col>
                  <v-col cols="5" class="tex-left"><v-text-field class="small" dense outlined single-line label="From YYYYMMDD"  /></v-col>
                  <v-col class="tex-left"><v-text-field class="small" dense outlined single-line label="To YYYYMMDD" /></v-col>
              </v-row>
              <v-row no-gutters dense>
                  <v-col cols="3" class="tex-left"><v-checkbox class="small"  label="Status" /></v-col>
                  <v-col cols="8" class="tex-left">
                      <v-select v-model="state" :items="items" multiple dense />
                  </v-col>
                  <v-col class="tex-left"></v-col>
              </v-row>
          </v-container>
          <v-card-actions class="text-right">
               <v-spacer></v-spacer>
              <v-btn small plain>Search</v-btn>
          </v-card-actions>
      </v-card>
  </v-dialog>
</template>

<script>
export default {
    name :"SearchMenu",
    data(){
        return {
            isVisible : false,
            state :[],
            items :["Waiting","Executing","Ended OK","Ended Not OK"]

        }
    }
}
</script>

<style>
.small {
    transform: scale(0.875);
    transform-origin: left;
}
</style>