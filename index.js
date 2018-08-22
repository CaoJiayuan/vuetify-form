import VuetifyForm from './lib/form';
import {register} from './lib/validator'

VuetifyForm.install = function (Vue) {
  Vue.component('vuetify-form', VuetifyForm)
}
VuetifyForm.validator = {
  register
}

export default VuetifyForm
