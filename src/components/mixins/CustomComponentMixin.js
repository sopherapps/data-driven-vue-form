export default {
  props: {
    options: Object
  },
  methods: {
    onChange(value) {
      this.$emit("change", value);
    },
    onInput(value) {
      this.$emit("input", value);
    }
  }
};
