import postable from '../mixins/postable'
const alias = {
  string: 'v-text-field'
};

export default {
  name: 'vuetify-form-field',
  mixins:[postable],
  props: {
    field: {
      type   : Object,
      required: true
    }
  },
  data(){
    return {
      alias
    }
  },

  render(h) {
    let input = v => this.post = v;

    if (this.field.render && typeof this.field.render === 'function') {
      return this.field.render(h, this.post, input, this.field)
    }

    return h(this.getCom(this.field.type), {
      attrs: this.field.attrs || {},
      props: this.field.props || {},
      value: this.post,
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
