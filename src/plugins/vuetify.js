import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
      options: {
        customProperties: true,
      },
    themes: {
      light: {
        primary: '#607d8b',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#6E9E0E',
        success: '#4CAF50',
        warning: '#FFC107',
        mycol : "#2c3e50",
        button :"#4C8DAD"
      },
    },
  },
});

/*
#212D33 
#7D2760
*/