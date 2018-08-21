import postable from './mixins/postable'
import Field from './components/field'


export default {
  name   : 'vuetify-form',
  mixins : [postable],
  props  : {
    fields : {
      type   : Array,
      default: () => []
    },
    columns: {
      type   : Number,
      default: () => 1
    }
  },

  render(h) {
    const fields = this.fields.map(f => {

      let field = h(Field, {
        props: {
          field: f
        },
        value: this.post[f.id],
        on   : {
          input: v => this.post[f.id] = v
        }
      })

      return h('v-flex', {
        attrs: this.parseLayout(f.layout)
      }, [field])
    });

    return h('v-layout', {
      props: {
        wrap: true
      }
    }, fields)
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
    }
  }
}
