<template>
  <v-input
    v-model="model"
    v-bind="options"
    @change="onChange"
    @input="onInput"
    data-test="c-input"
  >
    <slot />
  </v-input>
</template>

<script>
import CustomComponentMixin from "../mixins/CustomComponentMixin";
export default {
  name: "c-input",
  mixins: [CustomComponentMixin]
};
</script>
