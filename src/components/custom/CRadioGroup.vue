<template>
  <v-radio-group
    v-model="model"
    v-bind="options"
    @change="onChange"
    @input="onInput"
  >
    <slot />
  </v-radio-group>
</template>

<script>
import CustomComponentMixin from "../mixins/CustomComponentMixin";
export default {
  name: "c-radio-group",
  mixins: [CustomComponentMixin]
};
</script>
