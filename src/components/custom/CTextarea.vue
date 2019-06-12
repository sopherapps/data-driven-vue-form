<template>
  <v-textarea
    :value="value"
    v-bind="options"
    @change="onChange"
    @input="onInput"
    data-test="c-textarea"
  >
    <slot />
  </v-textarea>
</template>

<script>
import CustomComponentMixin from "../mixins/CustomComponentMixin";
export default {
  name: "c-textarea",
  mixins: [CustomComponentMixin],
  props: {
    value: {
      type: [Number, String],
      default: ""
    }
  }
};
</script>
