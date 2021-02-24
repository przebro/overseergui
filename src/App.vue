<template>
  <v-app>
    <v-navigation-drawer color="primary" dark permanent app expand-on-hover><navigator/></v-navigation-drawer>
    <v-main >
          <router-view/>
    </v-main>
    <v-footer color="secondary" height="24px" app />
  </v-app>

</template>

<style>
/* html {
  overflow-y: hidden
}
html::-webkit-scrollbar {
  width: 0px; 
  
} */

/* body {
    overflow-x: hidden;
  }

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
