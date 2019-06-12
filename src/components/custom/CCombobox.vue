<template>
  <v-combobox
    :value="value"
    v-bind="options"
    @change="onChange"
    @input="onInput"
    data-test="c-combobox"
  >
    <slot />
  </v-combobox>
</template>

<script>
import CustomComponentMixin from "../mixins/CustomComponentMixin";
export default {
  name: "c-combobox",
  mixins: [CustomComponentMixin],
  props: {
    value: {
      type: [Number, String, Object],
      default: ""
    }
  }
};
</script>
