import {functions} from 'nerio-js-utils'

const {arrayChunk} = functions

export default {
  name : 'vuetify-form',
  props: {
    value     : {
      type   : Object,
      default: () => {
        return {};
      }
    },
    fields: {
      type   : Array,
      default: () => []
    },
    columns   : {
      type   : Number,
      default: () => 1
    }
  },
  computed:{
    post: {
      get() {
        return this.value;
      },
      set(v) {
        this.$emit('input', v);
      }
    },
  },
  render(h) {
    const fields = this.fields.map(f => {

      return h(f.type, {
        attrs: f.attrs || {},
        props: f.props || {},
        value: this.post[f.id],
        on: {
          input: v => this.post[f.id] = v
        }
      })
    });

    return h('v-layout', {
      props: {
        wrap : true
      }
    }, fields)
  },
  methods:{
    parseLayout(layoutString) {

    }
  }
}
