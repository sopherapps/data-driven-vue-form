export default {
  props: {
    options: Object,
    value: [Array, Boolean, Number, Object, String]
  },
  data: () => ({
    model: undefined
  }),
  mounted() {
    this.model = this.value;
  },
  watch: {
    value: function(val) {
      this.model = val;
    }
  },
  methods: {
    onChange(value) {
      this.model = value;
      this.$emit("change", value);
    },
    onInput(value) {
      this.model = value;
      this.$emit("input", this.model);
    }
  }
};
