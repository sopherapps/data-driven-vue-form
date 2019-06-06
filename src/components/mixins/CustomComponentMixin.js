export default {
  props: {
    options: Object,
    value: [Object, String, Number]
  },
  data: () => ({
    model: undefined
  }),
  mounted() {
    this.model = this.value;
  },
  methods: {
    onChange() {
      this.$emit("change", this.model);
    },
    onInput() {
      this.$emit("input", this.model);
    }
  }
};
