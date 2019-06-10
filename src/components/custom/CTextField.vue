<template>
  <v-text-field
    v-model="model"
    v-bind="options"
    @change="onChange"
    @input="onInput"
    data-test="c-text-field"
  >
    <slot />
  </v-text-field>
</template>

<script>
import CustomComponentMixin from "../mixins/CustomComponentMixin";
export default {
  name: "c-text-field",
  mixins: [CustomComponentMixin]
};
</script>
