<template>
  <v-radio
    :value="value"
    v-bind="options"
    @change="onChange"
    @input="onInput"
    data-test="c-radio"
  >
    <slot />
  </v-radio>
</template>

<script>
import CustomComponentMixin from "../mixins/CustomComponentMixin";
export default {
  name: "c-radio",
  mixins: [CustomComponentMixin],
  props: {
    value: {
      type: [Number, String, Boolean],
      default: ""
    }
  }
};
</script>
