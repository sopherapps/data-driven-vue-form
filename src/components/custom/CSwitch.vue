<template>
  <v-switch
    v-model="model"
    v-bind="options"
    @change="onChange"
    @input="onInput"
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
