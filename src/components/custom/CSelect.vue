<template>
  <v-select
    v-model="model"
    v-bind="options"
    @change="onChange"
    @input="onInput"
  >
    <slot />
  </v-select>
</template>

<script>
import CustomComponentMixin from "../mixins/CustomComponentMixin";
export default {
  name: "c-select",
  mixins: [CustomComponentMixin]
};
</script>
