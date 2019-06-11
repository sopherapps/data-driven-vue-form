export default {
  props: {
    options: Object,
    value: [Array, Boolean, Number, Object, String]
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
