import postable from '../mixins/postable'

export default {
  mixins: [postable],
  props : {
    value   : {
      type   : Number,
      default: undefined
    },
    label   : {
      type: String
    },
    required: Boolean,
    max     : {
      type   : Number,
      default: Infinity
    },
    min     : {
      type   : Number,
      default: -Infinity
    },
    rules: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {

    }
  },
  render(h) {
    let input = v => this.post = parseInt(v);
    let props = {
      type    : 'number',
      label   : this.label,
      required: this.required,
      rules   : this.rules
    };
    props.value = this.post;
    return h('v-text-field', {
      props,
      on: {
        input
      }
    })
  }
}
