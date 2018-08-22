import postable from './mixins/postable'
import Field from './components/field'
import validator from './validator'

export default {
  name   : 'vuetify-form',
  mixins : [postable],
  props  : {
    fields : {
      type   : Array,
      default: () => []
    }
  },
  render(h) {
    const fields = this.fields.map(f => {
      let field = h(Field, {
        props: {
          field: f,
          value: this.post[f.id],
          rules: [
            v => this.validator(v, f.rules, f.label)
          ]
        },
        on   : {
          input: v => this.post[f.id] = v
        }
      })

      return h('v-flex', {
        attrs: this.parseLayout(f.layout)
      }, [field])
    });
    const body = h('v-layout', {
      attrs: {
        wrap: true
      }
    }, fields);

    return h('v-form', {
      ref: 'form'
    }, [body])
  },
  methods: {
    parseLayout(layoutString) {
      if (typeof layoutString !== 'string') {
        return {
          xs12: true
        };
      }
      let l = {};
      layoutString.split(' ').forEach(la => {
        l[la] = true
      });
      if (l === {}) {
        return {
          xs12: true
        }
      }

      return l;
    },
    validator(v, rules, attr){
      let result = validator(v, rules, attr);
      if (result !== true) {
        return result
      }
      return result;
    },
    validate(promise = true){
      if (promise) {
        return new Promise((resolve, reject) => {
          let val = this.$refs.form.validate()
          if (val) {
            resolve()
          } else {
            reject(this.$refs.form.reset)
          }
        })
      }

      return this.$refs.form.validate()
    }
  }
}
