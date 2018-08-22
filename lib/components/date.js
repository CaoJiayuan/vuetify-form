import postable from '../mixins/postable'

export default {
  mixins: [postable],
  props: {
    value: {
      type: String,
      default: null
    },
    dialog: Boolean,
    allow: {
      type: Function,
      default: null
    }
  },
  data(){
    return {
      menu : false
    }
  },
  render(h){
    const field = h('v-text-field', {
      slot: 'activator',
      props: {
        value: this.post,
        readonly : true
      },
    });

    const ok = h('v-btn', {
      props: {
        flat: true,
      },
      on: {
        click: e => this.menu = false
      }
    }, '确定')

    const date = h('v-date-picker', {
      slot: 'default',
      props:{
        value: this.post,
        locale: 'zh-cn',
        allowDates: this.allow
      },
      on: {
        input: v => {
          this.post = v
        }
      }
    }, [h('v-spacer'), ok]);

    if (this.dialog) {
      return h('v-dialog', {
        props:{
          value: this.menu,
          fullWidth: true,
          width : '290px',
          persistent: true,
          lazy: true,
          transition: 'slide-y-transition'
        },
        ref: 'dialog',
        on:{
          input: v => this.menu = v
        }
      }, [field, date])
    }

    return h('v-menu', {
      props:{
        value: this.menu,
        closeOnContentClick: false,
        fullWidth: true,
        minWidth : '290px',
        offsetY: true
      },
      ref: 'menu',
      on:{
        input: v => this.menu = v
      }
    }, [field, date])
  }
}
