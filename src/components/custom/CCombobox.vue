<template>
  <v-combobox
    v-model="model"
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
  mixins: [CustomComponentMixin]
};
</script>
