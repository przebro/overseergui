<template>
<v-card flat>
  <AuthComponent/>
</v-card>
</template>

<script>
// @ is an alias to /src

import AuthComponent from '@/components/AuthComponent.vue'

export default {
  name: 'Home',
  components: {
    AuthComponent
  }
}
</script>
