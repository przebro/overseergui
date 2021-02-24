<template>
  <v-system-bar app window style="-webkit-app-region: drag">
      <v-spacer ></v-spacer>
       <div class="px-2">{{ title }}</div></v-system-bar>
</template>

<script>
export default {
    name : "SystemBar",
    props :{
        title : String
    }

}
</script>

<style>

</style>