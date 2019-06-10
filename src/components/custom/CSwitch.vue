<template>
  <v-switch
    v-model="model"
    v-bind="options"
    @change="onChange"
    @input="onInput"
    data-test="c-switch"
  >
    <slot />
  </v-switch>
</template>

<script>
import CustomComponentMixin from "../mixins/CustomComponentMixin";
export default {
  name: "c-switch",
  mixins: [CustomComponentMixin]
};
</script>
