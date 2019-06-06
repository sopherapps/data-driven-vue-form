<template>
  <component
    ref="component"
    :is="vType"
    v-model="value"
    v-bind="options"
    @change="updateModel('change')"
    @input="updateModel('input')"
  ></component>
</template>

<script>
export const ALLOWED_COMPONENTS = new Map([
  ["input", "v-input"],
  ["select", "v-select"],
  ["autocomplete", "v-autocomplete"],
  ["button", "v-btn"]
]);
export default {
  props: {
    type: {
      type: String,
      default: "input",
      validator: value => ALLOWED_COMPONENTS.has(value)
    },
    value: {
      type: String,
      default: ""
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    updateModel(event) {
      this.$emit(event, this.value);
    }
  },
  computed: {
    vType() {
      return ALLOWED_COMPONENTS.get(this.type);
    }
  }
};
</script>
