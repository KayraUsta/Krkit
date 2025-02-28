import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// Quasar
import { Quasar, Notify, Loading } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/dist/quasar.css'

const app = createApp(App)

app.use(Quasar, {
  plugins: {
    Notify,
    Loading
  },
  config: {
    notify: {}
  }
})

app.mount('#app')
