export default {
  props:{
    value: {
      type   : Object|String|Array|Number,
      default: () => {
        return {};
      }
    },
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
}
