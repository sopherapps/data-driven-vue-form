export default {
  props: {
    options: Object
  },
  methods: {
    _processValue(value) {
      let processedValue = value;
      if (
        this.options &&
        this.options.type === "number" &&
        typeof value === "string"
      ) {
        processedValue = parseInt(value, 10);
      }
      return processedValue;
    },
    onChange(value) {
      console.log(typeof value);
      this.$emit("change", this._processValue(value));
    },
    onInput(value) {
      console.log(typeof value);
      this.$emit("input", this._processValue(value));
    }
  }
};
