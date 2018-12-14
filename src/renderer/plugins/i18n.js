import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from '../assets/locales/en.json'
import fr from '../assets/locales/fr.json'
import es from '../assets/locales/es.json'
import sr from '../assets/locales/sr.json'
import pl from '../assets/locales/pl.json'
import el from '../assets/locales/el.json'

Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: 'en', // set locale
  fallbackLocale: 'en',
  messages: { en, fr, es, sr, pl, el } // set locale messages
})
