<template>
  <v-checkbox
    v-model="model"
    v-bind="options"
    @change="onChange"
    @input="onInput"
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
