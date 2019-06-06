<template>
  <v-combobox
    v-model="model"
    v-bind="options"
    @change="onChange"
    @input="onInput"
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
