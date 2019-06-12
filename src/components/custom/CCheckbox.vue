<template>
  <v-checkbox
    :value="value"
    v-bind="options"
    @change="onChange"
    @input="onInput"
    data-test="c-checkbox"
  >
    <slot />
  </v-checkbox>
</template>

<script>
import CustomComponentMixin from "../mixins/CustomComponentMixin";
export default {
  name: "c-checkbox",
  mixins: [CustomComponentMixin]
};
</script>
