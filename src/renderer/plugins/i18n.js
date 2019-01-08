import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from '../assets/locales/en.json'
import fr from '../assets/locales/fr.json'
import ru from '../assets/locales/ru.json'
import es from '../assets/locales/es.json'
import ar from '../assets/locales/ar.json'
import tr from '../assets/locales/tr.json'
import sr from '../assets/locales/sr.json'
import pl from '../assets/locales/pl.json'
import el from '../assets/locales/el.json'
import zh from '../assets/locales/zh.json'
import nl from '../assets/locales/nl.json'
import az from '../assets/locales/az.json'
import pt from '../assets/locales/pt.json'
import fil from '../assets/locales/fil.json'

Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: 'en', // set locale
  fallbackLocale: 'en',
  messages: { en, fr, ru, es, ar, tr, sr, pl, el, zh, nl, az, pt, fil } // set locale messages
})
