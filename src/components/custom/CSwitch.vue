<template>
  <v-switch
    v-model="model"
    v-bind="options"
    @change="onChange"
    @input="onInput"
    data-test="c-switch"
  >
    <slot />
  </v-switch>
</template>

<script>
import CustomComponentMixin from "../mixins/CustomComponentMixin";
export default {
  name: "c-switch",
  mixins: [CustomComponentMixin],
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    model: null
  }),
  mounted() {
    this.model = this.value;
  },
  watch: {
    value(val) {
      this.model = val;
    }
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
</script>
