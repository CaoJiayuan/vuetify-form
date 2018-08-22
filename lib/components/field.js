import postable from '../mixins/postable'
import number from './number'
import date from './date'
const alias = {
  string: 'v-text-field',
  number,
  date,
  slider: 'v-slider'
};

export default {
  name: 'vuetify-form-field',
  mixins:[postable],
  props: {
    field: {
      type   : Object,
      required: true
    },
    value: {
      type   : Object|String|Array|Number,
      default: undefined
    },
    rules: {
      type: Array,
      default: () => []
    }
  },
  data(){
    return {
      alias
    }
  },

  render(h) {
    let input = v => this.post = v;
    let props = this.field.props || {};
    props.value = this.post;
    props.rules = this.rules;
    props.label = this.field.label;
    let component = this.getCom(this.field.type);
    if (typeof component === 'function') {
      return component(h, this.post, input, this.field)
    }

    return h(component, {
      attrs: this.field.attrs || {},
      props,
      on: {
        input
      }
    })
  },
  methods: {
    getCom(type) {
      if (typeof type === 'string' && this.alias[type]) {
        return this.alias[type]
      }
      return type;
    }
  }
}
