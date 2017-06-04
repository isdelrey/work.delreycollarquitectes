import Vue from 'vue'
import photos from './photos.vue'
import vueCustomElement from 'vue-custom-element'

Vue.use(vueCustomElement);

Vue.customElement('component-photos',photos);
